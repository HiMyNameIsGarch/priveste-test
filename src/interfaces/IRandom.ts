import { Prisma } from '.prisma/client';

// export const RandomInclude: Prisma.RandomInclude = {};
export interface IRandom extends Prisma.RandomGetPayload<{}> {}
export interface IRandomCreate extends Prisma.RandomUncheckedCreateInput {}
export interface IRandomUpdate extends Prisma.RandomUncheckedUpdateInput {}
