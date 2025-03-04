// firebase.config.js
const firebaseConfig = {
    apiKey: "AIzaSyD1zdby2LT0HIbDagQEhnTJWpGQOK8QiQg",
    authDomain: "pawitra-070-m2.firebaseapp.com",
    projectId: "pawitra-070-m2",
    storageBucket: "pawitra-070-m2.firebasestorage.app",
    messagingSenderId: "813048596695",
    appId: "1:813048596695:web:85ce071eeab5a9c36f8892"
};

// For service worker (firebase-messaging-sw.js)
// This ensures the config is available in both module and non-module contexts
if (typeof self !== 'undefined') {
    self.firebaseConfig = firebaseConfig;
}