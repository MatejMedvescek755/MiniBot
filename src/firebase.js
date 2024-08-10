import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBlJxA0nKzUdSpVY0V7wmgEGrnnOEtAPIY",
  authDomain: "gamblingbot-a0e7b.firebaseapp.com",
  projectId: "gamblingbot-a0e7b",
  storageBucket: "gamblingbot-a0e7b.appspot.com",
  messagingSenderId: "863600875546",
  appId: "1:863600875546:web:6dee746e6f38d3598959a3",
  measurementId: "G-BC8RCQL09N"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

