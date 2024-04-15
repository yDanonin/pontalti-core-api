import prisma, { dbErrorHandle } from "@pontalti/lib/prisma";
import { User, RegisterUser } from "@pontalti/types/user.types"

const registerUser = async (data: RegisterUser): Promise<User> => {
  try {
    return await prisma.users.create({ data })
  } catch(e) {
    dbErrorHandle(e)
  }
}

const login = async (email: string): Promise<User> => {
  try{
    return await prisma.users.findUnique({ where: { email }})
  } catch(e) {
    dbErrorHandle(e)
  }
}


export default {
  registerUser,
  login
}
