import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

export const app = initializeApp({
  credential: cert('./service-account.json'),
  databaseURL: 'https://priveste-test-5b872.firebaseio.com',
});

export const firestore = getFirestore();
