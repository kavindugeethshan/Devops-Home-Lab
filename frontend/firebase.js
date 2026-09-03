import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB2RyQ_kAzUDMVxoM0ewGaU9XG9VQDfy-8",
    authDomain: "g-lab-8b021.firebaseapp.com",
    projectId: "g-lab-8b021",
    storageBucket: "g-lab-8b021.firebasestorage.app",
    messagingSenderId: "242069606083",
    appId: "1:242069606083:web:2fb86d06544551ca1d1c76",
    measurementId: "G-GKBE94E919"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };