importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');
importScripts()
firebase.initializeApp({
  'messagingSenderId': '299375327995'
});

console.log(firebase.messaging());
