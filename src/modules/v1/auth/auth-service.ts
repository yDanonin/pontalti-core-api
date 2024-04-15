import { RegisterUser } from "@pontalti/types/user.types";
import { DefaultResponse } from "@pontalti/types/common.types";
import jwt from 'jsonwebtoken'
import repository from "@pontalti/repository/auth";
import bcrypt, { compare } from 'bcrypt'
import { UnauthorizedError } from "@pontalti/utils/errors";


const register = async (data: RegisterUser) => {
  try {
    const passwordHash = await bcrypt.hash(data.password, 10);
    data.password = passwordHash;

    const response = await repository.registerUser(data);
    return { data: response } as DefaultResponse;
  } catch (e) {
    throw e;
  }
}

const login = async (email: string, password: string) => {
  try {
    const user = await repository.login(email)

    if (!user) {
      throw new UnauthorizedError('Credenciais inválidas. Verifique o email e senha e tente novamente.');
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new UnauthorizedError('Credenciais inválidas. Verifique o email e senha e tente novamente.');
    }

    const token = jwt.sign({ name: user.name }, process.env.PRIVATE_KEY, { expiresIn: '1d' });
    return { data: { token } } as DefaultResponse;
  } catch (e) {
    throw e;
  }
}

export default {
    register,
    login,
};
