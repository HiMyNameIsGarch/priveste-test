import { IMovie } from '~/interfaces/IMovie';
// simulate server response
const sleepValue = 500;
const sleep = (ms: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const newMovie = {} as IMovie;
  newMovie.date = new Date();
  newMovie.name = body.movieName;

  await sleep(sleepValue);

  // upload the new created movie to database and return the object or null

  return newMovie;
});
