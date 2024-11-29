import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth ,initializeAuth} from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDdjZH8y0HNwo_WUF9U9-t7sxvgTe_QLwk",
  authDomain: "sathwika-trade-media.firebaseapp.com",
  projectId: "sathwika-trade-media",
  storageBucket: "sathwika-trade-media.appspot.com",
  messagingSenderId: "889258066142",
  appId: "1:889258066142:android:aeb4683f2f525238d6024f",
  measurementId: "G-ZJ8VXVLWXK"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });

export { app,firestore, auth, storage };
