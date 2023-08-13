import { Firestore, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';
import { IMovie } from '~/interfaces/IMovie';

// simulate server response
const sleepValue = 500;
const sleep = (ms: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const firebaseConfig = {
  apiKey: 'AIzaSyCyiunVb7WFWW2PrIeThPj6pPjp8GFsTTg',
  authDomain: 'priveste-test-5b872.firebaseapp.com',
  projectId: 'priveste-test-5b872',
  storageBucket: 'priveste-test-5b872.appspot.com',
  messagingSenderId: '1088149786221',
  appId: '1:1088149786221:web:608c6a14546fd9f5d1f964',
};

const initApp = async (db: Firestore) => {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  return citySnapshot;
};

export default defineEventHandler(async () => {
  const firebaseapp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseapp);
  const citiesCol = collection(db, 'movies');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());

  // mock data
  // const movies = [
  //   { id: 'one', name: 'Cirlce', date: new Date() } as IMovie,
  //   { id: 'two', name: 'Cube', date: new Date() } as IMovie,
  //   { id: 'three', name: 'Buzz', date: new Date() } as IMovie,
  // ];

  return cityList;
});
