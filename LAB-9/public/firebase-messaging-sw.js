// firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/8.2.6/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.6/firebase-messaging.js");

self.addEventListener("notificationclick", function (event) {
  var redirectUrl = event.notification.data.FCM_MSG.notification.click_action;

  event.waitUntil(
    self.clients
      .claim()
      .then(() => self.clients.matchAll({ type: "window" }))
      .then((clients) => {
        return clients.map((client) => {
          const url = new URL(client.url);

          if (url.pathname != redirectUrl && "navigate" in client) {
            return client.navigate(redirectUrl);
          }
        });
      })
  );
});

firebase.initializeApp({
  apiKey: "AIzaSyD1zdby2LT0HIbDagQEhnTJWpGQOK8QiQg",
  authDomain: "pawitra-070-m2.firebaseapp.com",
  projectId: "pawitra-070-m2",
  storageBucket: "pawitra-070-m2.firebasestorage.app",
  messagingSenderId: "813048596695",
  appId: "1:813048596695:web:85ce071eeab5a9c36f8892"
});

const messaging = firebase.messaging();

// This will be called only once when the service worker is installed for first time.
self.addEventListener("activate", async (event) => {
  event.waitUntil(
    self.clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((windowClients) => {
        const client = windowClients[0];

        messaging
          .getToken()
          .then((currentToken) => {
            console.log("Recovered token from messaging: ", currentToken);

            client.postMessage({
              source: "firebase-messaging-sw",
              currentToken: currentToken,
            });
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
          });
      })
  );
});

// index.js

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`)
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("message", (message) => {
    if (message.data.source === "firebase-messaging-sw") {
      API.post("/user_devices", {
        token: message.data.currentToken,
        os: navigator.userAgent,
        bundle_name: packageJson.name,
        bundle_short_version: gitLastCommitJson.tags[0],
        bundle_version: gitLastCommitJson.hash,
      });
    }
  });
}