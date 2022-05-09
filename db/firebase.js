// Import the functions you need from the SDKs you need
//require('@react-native-async-storage/async-storage').AsyncStorage;  
//import AsyncStorage from '@react-native-async-storage/async-storage';

//import React from "react";
import {LogBox} from 'react-native';
import { initializeApp, getApps } from "firebase/app";
//import { getAuth, initializeAuth } from "firebase/auth";
import {getReactNativePersistence, initializeAuth} from 'firebase/auth/react-native';

import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
LogBox.ignoreAllLogs();

const firebaseConfig = {
  apiKey: "AIzaSyBSIFCFSHNK5WcoH1pM_hKw3WiGSfzN62w",
  authDomain: "tefilati-7c135.firebaseapp.com",
  projectId: "tefilati-7c135",
  storageBucket: "tefilati-7c135.appspot.com",
  messagingSenderId: "56780274798",
  appId: "1:56780274798:web:ccea78d755f47b9c877a7f",
  measurementId: "G-JQTNJN2DWK"
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);

if(!getApps.length){
    app = initializeApp(firebaseConfig);
} else {
    app = app()
}

export const db = getFirestore(app)
const storage = getStorage(app)
//console.log(storage.providerData)


// Provide it to initializeAuth.
const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
//const auth = getAuth();

export default auth;