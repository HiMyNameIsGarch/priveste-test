import {update} from '~/server/services/movieService';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const updatedMovie = body.movie;
  const newMovie = await update(updatedMovie);
  return newMovie;
});
