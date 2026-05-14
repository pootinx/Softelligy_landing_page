import { initializeApp, getApps, FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | undefined;

export function getFirebaseApp(): FirebaseApp {
  if (app) return app;
  if (getApps().length > 0) {
    app = getApps()[0];
    return app;
  }
  if (typeof window === "undefined") {
    throw new Error("Firebase cannot be initialized on the server. Ensure this code only runs on the client.");
  }
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey.startsWith("AIzaSy___________________________")) {
    throw new Error(
      "Firebase is not configured. Add your Firebase config values to the .env file:\n" +
      "  NEXT_PUBLIC_FIREBASE_API_KEY\n" +
      "  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN\n" +
      "  NEXT_PUBLIC_FIREBASE_PROJECT_ID\n" +
      "  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET\n" +
      "  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID\n" +
      "  NEXT_PUBLIC_FIREBASE_APP_ID"
    );
  }
  app = initializeApp(firebaseConfig);
  return app;
}

export default app;
