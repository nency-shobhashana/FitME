
import  firebase from 'firebase';

  var firebaseConfig = {
    apiKey: "AIzaSyDub55xD3KuTqq4X1yJf6p998EfGniQO6A",
    authDomain: "fitme-3092a.firebaseapp.com",
    projectId: "fitme-3092a",
    storageBucket: "fitme-3092a.appspot.com",
    messagingSenderId: "559430407751",
    appId: "1:559430407751:web:0c645ffaf7e44530418362"
  };

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebase.analytics();
