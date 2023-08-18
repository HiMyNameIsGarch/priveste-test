import { cert, initializeApp } from 'firebase-admin/app';
import { CollectionReference, getFirestore } from 'firebase-admin/firestore';

export const app = initializeApp({
    credential: cert('./service-account.json'),
    databaseURL: 'https://priveste-test-5b872.firebaseio.com',
});

export const db = getFirestore();

// Collections
export const movies = db.collection('/movies');

// Dynamic collections
export const getCollection = (path: string): CollectionReference => db.collection(path);
