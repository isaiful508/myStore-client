import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB8MVXysw1uMZ-jKKOJcuaWbUWTT9LyApA",
    authDomain: "mystore-47861.firebaseapp.com",
    projectId: "mystore-47861",
    storageBucket: "mystore-47861.appspot.com",
    messagingSenderId: "1056878623252",
    appId: "1:1056878623252:web:c87520893defcf8815c501",
    // measurementId: import.meta.env.VITE_MEASUREMENT_ID
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)

  export {app, auth}