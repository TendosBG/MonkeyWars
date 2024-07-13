import firebase from 'firebase/compat/app';
import 'firebase/compat/database'; // ou 'firebase/firestore' si vous utilisez Firestore

const firebaseConfig = {
    apiKey: "AIzaSyABi_nvFLUX6prkb9anUUuppfhybIDR7P4",
    authDomain: "monkeywars-4cd74.firebaseapp.com",
    databaseURL: "https://monkeywars-4cd74-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "monkeywars-4cd74",
    storageBucket: "monkeywars-4cd74.appspot.com",
    messagingSenderId: "357998688898",
    appId: "1:357998688898:web:5cf83ac3d9ae3238a9129b"
};

// Initialisation de Firebase
firebase.initializeApp(firebaseConfig);

// Exportez la référence à votre base de données (ou à Firestore)
export const db = firebase.database();

export default firebase;
