import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAQLzRABECiLf3NmSuTA7RfHpjyTURJnus",
    authDomain: "bt3103-healthbuddy-group18.firebaseapp.com",
    projectId: "bt3103-healthbuddy-group18",
    storageBucket: "bt3103-healthbuddy-group18.appspot.com",
    messagingSenderId: "156269022012",
    appId: "1:156269022012:web:afcdce03d39b10153cac39",
    measurementId: "G-X7X1LG8YST"

};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;

