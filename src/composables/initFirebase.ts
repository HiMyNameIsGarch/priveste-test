import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// firebase init
const firebaseConfig = {
  apiKey: 'AIzaSyCyiunVb7WFWW2PrIeThPj6pPjp8GFsTTg',
  authDomain: 'priveste-test-5b872.firebaseapp.com',
  projectId: 'priveste-test-5b872',
  storageBucket: 'priveste-test-5b872.appspot.com',
  messagingSenderId: '1088149786221',
  appId: '1:1088149786221:web:608c6a14546fd9f5d1f964',
};

if (getApps().length < 1) {
  initializeApp(firebaseConfig);
}
const app = getApp();

// utils
export const db = getFirestore(app);
