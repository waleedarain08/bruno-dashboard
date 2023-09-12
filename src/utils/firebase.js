import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyA8PQF5x1tKEAZ3O2Ndwv9CCY-IAZDAJ3c",
    authDomain: "bruno-s-kitchen.firebaseapp.com",
    projectId: "bruno-s-kitchen",
    storageBucket: "bruno-s-kitchen.appspot.com",
    messagingSenderId: "469529767335",
    appId: "1:469529767335:web:930fad99d548637f1e9a82",
    measurementId: "G-7W89XQG5SG"
};
const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);

export { storage, firebase as default };