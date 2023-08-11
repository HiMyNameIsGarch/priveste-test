// simulate server response
const sleepValue = 500;
const sleep = (ms: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default defineEventHandler(async (event) => {
  await sleep(sleepValue);

  console.log('hey, im here');

  return event.context.params?.id || 'nothingmansorry';
});
