// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzssa-Q-dpbrZs_PJ9UJdpbVPjMHojjYs",
  authDomain: "rbac-28d19.firebaseapp.com",
  projectId: "rbac-28d19",
  storageBucket: "rbac-28d19.appspot.com",
  messagingSenderId: "729628331702",
  appId: "1:729628331702:web:14ccc494f364ecfc4de017",
  measurementId: "G-X09NE95XLS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);