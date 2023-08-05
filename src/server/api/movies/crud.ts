// simulate server response
const sleep = (ms: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default defineEventHandler(async () => {
  // const body = await readBody(event);

  await sleep(500);

  return { currentMovie: 'Planning saving the world' };
});
