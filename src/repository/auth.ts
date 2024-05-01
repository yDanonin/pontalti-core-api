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
  try {
    return await prisma.users.findUnique({ where: { email }})
  } catch(e) {
    dbErrorHandle(e)
  }
}

const getUserByEmail = async (email: string) => {
  try {
    return await prisma.users.findUnique({ where: { email: email }});
  } catch(e) {
    dbErrorHandle(e)
  }
} 

const updateUser = async (id: number, data: User) => {
  try {
    console.log(data.password)
    return await prisma.users.update({
      where: { id },
      data: { ...data }
    })
  } catch(e) {
    dbErrorHandle(e)
  }
}

export default {
  registerUser,
  login,
  getUserByEmail,
  updateUser
}
