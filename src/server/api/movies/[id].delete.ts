import { del } from '~/server/services/movieService';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id || '.';
  const res = await del(id);
  return res;
});
