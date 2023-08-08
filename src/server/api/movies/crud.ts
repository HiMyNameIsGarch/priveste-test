// simulate server response
const sleepValue = 500;
const sleep = (ms: number): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default defineEventHandler(async () => {
  await sleep(sleepValue);

  // switch (event.node.req.method) {
  //   case 'CREATE':
  //     break;
  //   case 'GET':
  //     break;
  //   case 'PUT':
  //     break;
  //   case 'DELETE':
  //     break;
  //   default:
  //     return {};
  // }
  // const body = await readBody(event);

  return { currentMovie: 'Planning saving the world' };
});
