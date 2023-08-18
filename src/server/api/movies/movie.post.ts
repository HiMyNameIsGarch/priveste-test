import {IMovie} from '~/interfaces/IMovie';
import {add} from '~/server/services/movieService';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const newMovie = {} as IMovie;
  newMovie.name = body.movieName;
  newMovie.date = new Date();
  const movie = await add(newMovie);

  return movie;
});
