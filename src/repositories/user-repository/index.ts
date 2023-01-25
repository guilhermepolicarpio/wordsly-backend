import { prisma } from "../../config";
import { Prisma } from "@prisma/client";

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function create(username: string, email: string,  password: string) {

    return prisma.user.create({
      data:{username,email,
      password
      }
    });
  }


export default{
    findByEmail,
    create,
}