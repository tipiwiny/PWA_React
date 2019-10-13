const secrets = process.env.NODE_ENV === 'production' ? {} : require('./secrets');
module.exports = {
  firebaseConfig : {
    apiKey: secrets.apiKey,
    authDomain: 'chatastrophe-3493f.firebaseapp.com',
    databaseURL: 'https://chatastrophe-3493f.firebaseio.com',
    projectId: 'chatastrophe-3493f',
    storageBucket: 'chatastrophe-3493f.appspot.com',
    messagingSenderId: secrets.messagingSenderId,
    appId: '1:299375327995:web:4710f70f5e1be280e38e5e',
    measurementId: 'G-ZXNRK7NRBG'
  }
};
