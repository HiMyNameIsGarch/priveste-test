import { Prisma } from '.prisma/client';

// export const MovieInclude: Prisma.MovieInclude = {};
export interface IMovie extends Prisma.MovieGetPayload<{}> {
  name: string;
  date: Date;
}
export interface IMovieCreate extends Prisma.MovieUncheckedCreateInput {}
export interface IMovieUpdate extends Prisma.MovieUncheckedUpdateInput {}
