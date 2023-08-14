import { getAll } from '~/server/services/movieService';

export default defineEventHandler(async () => {
  const movies = await getAll();
  return movies;
});
