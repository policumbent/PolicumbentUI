importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyDe2cTCJYOygSp2SgyhNtd0riAlC64_8pU",
  authDomain: "policumbent-2021.firebaseapp.com",
  projectId: "policumbent-2021",
  storageBucket: "policumbent-2021.appspot.com",
  messagingSenderId: "1035121678665",
  appId: "1:1035121678665:web:da3934db3b713fdfbc6298",
  measurementId: "G-LMVT45YP7K"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
