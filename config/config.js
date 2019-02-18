import firebase from 'firebase';

//API details

  const config = {
    apiKey: "AIzaSyDOGdku8047jDWTl40SWXDVr1Cpv3Pg7m4",
    authDomain: "myfirstproject-21fc7.firebaseapp.com",
    databaseURL: "https://myfirstproject-21fc7.firebaseio.com",
    projectId: "myfirstproject-21fc7",
    storageBucket: "myfirstproject-21fc7.appspot.com",
    messagingSenderId: "406392702651"
  };

  firebase.initializeApp(config)

  export const f = firebase;
  export const database = firebase.database();
  export const auth = firebase.auth();
  export const storage = firebase.storage();
