
import  firebase from 'firebase';
import { Platform } from 'react-native'

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

export async function uploadImageAsync(uri, name) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  console.log("uploadImageAsync");
  const ref = firebaseApp.storage().ref().child("image/"+ name);
  console.log(ref);
  const snapshot = await ref.put(blob);

  
  // We're done with the blob, close and release it
  if(Platform.OS != 'web'){
    blob.close();
  }

  return await snapshot.ref.getDownloadURL();
}