const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendNotifications = functions.database
  .ref('/messages/{messageId}')
  .onWrite(change => {
    const beforeData = change.before.val(); // data before the write
    const afterData = change.after.val(); // data after the write
    if (beforeData) {
      return;
    }
    const payload = {
      notification: {
        title: `${afterData.author}`,
        body: `${afterData.msg}`,
        icon: 'assets/icon.png'
      }
    };
    return admin
      .database()
      .ref('fcmTokens')
      .once('value')
      .then(allTokens => {
        if (allTokens.val()) {
          const tokens = [];
          for (let fcmTokenKey in allTokens.val()) {
            const fcmToken = allTokens.val()[fcmTokenKey];
            if (fcmToken.user_id !== afterData.user_id) {
              tokens.push(fcmToken.token);
            }
          }
          if (tokens.length > 0) {
            return admin
              .messaging()
              .sendToDevice(tokens, payload)
              .then(response => {
                const tokensToRemove = [];
                response.results.forEach((result, index) => {
                  const error = result.error;
                  if (error) {
                    console.error(
                      'Failure sending notification to',
                      tokens[index],
                      error
                    );
                    if (
                      error.code === 'messaging/invalid-registration-token' ||
                      error.code ===
                        'messaging/registration-token-not-registered'
                    ) {
                      tokensToRemove.push(
                        allTokens.ref.child(tokens[index]).remove()
                      );
                    }
                  }
                });
                return Promise.all(tokensToRemove);
              });
          }
        }
      });
  });
