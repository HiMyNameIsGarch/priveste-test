import { IMovie } from '~/interfaces/IMovie';
// simulate server response
const sleepValue = 500;
const sleep = (ms: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const newMovie = {} as IMovie;
  newMovie.id = body.movieName + ' - id';
  newMovie.date = new Date();
  newMovie.name = body.movieName;
  console.log(newMovie.name);
  console.log(newMovie.id);

  await sleep(sleepValue);

  // upload the new created movie to database and return the object or null

  return newMovie;
});
