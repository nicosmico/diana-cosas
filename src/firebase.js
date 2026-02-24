// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAKa_OZvt3O3eJ3EwxA6PgQCMLSprnx_2w",
    authDomain: "diana-cosas.firebaseapp.com",
    projectId: "diana-cosas",
    storageBucket: "diana-cosas.firebasestorage.app",
    messagingSenderId: "710486264553",
    appId: "1:710486264553:web:660ff527cfa5d417167e78",
    measurementId: "G-9C7G6EFK06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics = null;
if (typeof window !== "undefined") {
    if (window.location.hostname === "diana-cosas.web.app") {
        console.log("🟢 Firebase Analytics ACTIVADO (Estás en producción)");
        analytics = getAnalytics(app);
    } else {
        console.log(`🔴 Firebase Analytics APAGADO. Estás en: ${window.location.hostname}`);
    }
}

export { analytics };
