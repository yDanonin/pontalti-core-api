import { User } from "@pontalti/types/user.types";
import repository from "@pontalti/repository/user";

const removePassword = (u: User | User[]) => {
  if (Array.isArray(u)){
    const data = u.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    return data;
  }

  const { password, ...userWithoutPassword } = u
  return userWithoutPassword
}

const getAllUsers = async () => {
  try {
    const userResponse = removePassword(await repository.getAllUsers());
    return userResponse;
  } catch(e) {
    throw e
  }
}

const getUserByEmail = async (email: string) => {
  try {
    const userResponse = removePassword(await repository.getUserByEmail(email))
    return userResponse;
  } catch(e) {
    throw e
  }
}

export default {
  getAllUsers,
  getUserByEmail
}