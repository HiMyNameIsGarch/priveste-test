import {IMovie} from '~/interfaces/IMovie';

import {movies} from '../utils/firebase';

const getAll = async(): Promise<Array<IMovie>> => {
  const data = await movies.get();
  const movieList: Array<IMovie> = [];
  data.forEach((doc: any) => movieList.push(doc.data() as IMovie));
  return movieList;
};

const add = async(movie: IMovie):
    Promise<IMovie> => {
      const newId = movies.doc();
      movie.id = newId.id;
      const res = await movies.doc(newId.id).set(movie);
      if (res)
        return movie;
      return {} as IMovie;
    }

const del = async(movieId: string):
    Promise<boolean> => {
      const res = await movies.doc(movieId).delete();
      console.log(res);
      return res.isEqual(res);
    }

const update = async(movie: IMovie):
    Promise<IMovie> => {
      const res = await movies.doc(movie.id).update({name : movie.name});
      if (res)
        return movie;
      return {} as IMovie;
    }

export {getAll, add, del, update};
