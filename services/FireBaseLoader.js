import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyBj-LyzWmugyW09OaSOYcUROi7xzsTul7c",
  authDomain: "tinderfell.firebaseapp.com",
  databaseURL: "https://tinderfell.firebaseio.com",
  projectId: "tinderfell",
  storageBucket: "tinderfell.appspot.com",
  messagingSenderId: "595935976522"
};

var dbConfig = {
    apiKey: "apiKey",
    authDomain: "projectId.firebaseapp.com",
    databaseURL: "https://databaseName.firebaseio.com",
    storageBucket: "bucket.appspot.com"
  };
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export default {
    database
};
