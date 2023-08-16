import {IMovie} from '~/interfaces/IMovie';

import {movies} from '../utils/firebase';

const getAll = async(): Promise<Array<IMovie>> => {
  const data = await movies.get();
  const movieList: Array<IMovie> = [];
  data.forEach((doc) => movieList.push(doc.data() as IMovie));
  return movieList;
};

export {getAll};
