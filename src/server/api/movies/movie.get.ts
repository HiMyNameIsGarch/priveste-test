// simulate server response
const sleepValue = 500;
const sleep = (ms: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default defineEventHandler(async () => {
  await sleep(sleepValue);

  return { currentMovie: 'Planning saving the world 2' };
});
