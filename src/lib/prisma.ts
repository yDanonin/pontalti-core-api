import { PrismaClient, Prisma } from "@prisma/client";
import { NotFoundError, ConflictError, TimeoutError, InternalServerError } from "@pontalti/utils/errors";

const knownErrorCodeHandle = (error) => {
  switch (error.code) {
    case 'P2001':
      throw new NotFoundError(error.code + ': ' + error.message);
    case 'P2002':
      throw new ConflictError(error.code + ': ' + error.message);
    case 'P2015':
      throw new NotFoundError(error.code + ': ' + error.message);
    case 'P2024':
      throw new TimeoutError(error.code + ': ' + error.message);
    case 'P2025':
      throw new NotFoundError(error.code + ': ' + error.message);
    default:
      throw new InternalServerError('Uncategorized error in database. Code: ' + error.code, error)
  }
}

export const dbErrorHandle = (error) => {
  switch (error.constructor) {
    case Prisma.PrismaClientKnownRequestError:
      return knownErrorCodeHandle(error)
  }
}


declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
