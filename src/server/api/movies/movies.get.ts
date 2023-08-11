import { IMovie } from '~/interfaces/IMovie';

// simulate server response
const sleepValue = 500;
const sleep = (ms: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default defineEventHandler(async () => {
  await sleep(sleepValue);

  // mock data
  const movies = [
    { id: 'one', name: 'Cirlce', date: new Date() } as IMovie,
    { id: 'two', name: 'Cube', date: new Date() } as IMovie,
    { id: 'three', name: 'Buzz', date: new Date() } as IMovie,
  ];

  return movies;
});
