import { getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from '~/composables/initFirebase';
import { IMovie } from '~/interfaces/IMovie';

const getAll = async (): Promise<Array<IMovie>> => {
  const movieCol = collection(db, 'movies');
  const movieSnapshot = await getDocs(movieCol);
  const movieList: Array<IMovie> = [];
  movieSnapshot.docs.forEach((doc) => movieList.push(doc.data() as IMovie));
  return movieList;
};

export { getAll };
