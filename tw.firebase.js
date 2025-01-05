// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
    TwitterAuthProvider,
    connectAuthEmulator,
    getAuth,
    getRedirectResult,
    getIdToken,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDMNmIN-4bDyXMjIIVefpqS_svR588-kVY",
    authDomain: "shiren-270409.firebaseapp.com",
    projectId: "shiren-270409",
    storageBucket: "shiren-270409.firebasestorage.app",
    messagingSenderId: "1032318555281",
    appId: "1:1032318555281:web:929948d485cd5211251b30",
    measurementId: "G-D8K6BJ4JRM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function postMessage(user) {
    window.parent.postMessage({
        action: "xauth",
        message: {
            screenName: `${user.reloadUserInfo.screenName}`,
            xid: Array.from(`${user.reloadUserInfo.providerUserInfo[0].rawId}`).reverse().join(""),
            userImageUrl: user.reloadUserInfo.providerUserInfo[0].photoUrl,
            username: `${user.displayName}`
        },
    }, window.origin);
}

function firebaseSignIn() {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider)
        .then(function (result) {
            postMessage(result.user);
            signOut(auth);
        })
        .catch(function (error) {
            console.error(error);
        });
}

// Listening for auth state changes.
function state(){
    const unsubscribe = onAuthStateChanged(auth, function (user) {
        if (user) {
            postMessage(user);
            signOut(auth);
            unsubscribe();
        }
    });
}