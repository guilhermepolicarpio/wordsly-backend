import { User } from "@prisma/client";
import userRepository from "../../repositories/user-repository/index";
import sessionRepository from "../../repositories/session-repository/index";
import { duplicatedEmailError, invalidCredentialsError } from "./errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { exclude } from "../../utils/prisma.utils";

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await validateEmail(email);


  await validatePassword(password, user.password);
  console.log("depois validar")

  const token = await createSession(user.id);

  return {
    user: exclude(user, "password"),
    token,
  };
}

async function signUp({ username, email, password }: CreateUserParams): Promise<User> {
  await validateEmail(email);

  const hashedPassword = await bcrypt.hash(password, 12);

  const createuser = await userRepository.create(   
    username,
      email,
     hashedPassword,
  );
  return createuser;
}

async function validateEmail(email: string): Promise<GetValidateEmailResult> {
  const user = await userRepository.findByEmail(email);
  console.log(user);
  if (user) duplicatedEmailError();

  return user;
}

async function createSession(userId: number) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_KEY must be defined");
  }
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePassword(password: string, userPassword: string) {
   const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type SignInParams = Pick<User, "email" | "password">;

type SignInResult = {
  user: Pick<User, "id" | "email">;
  token: string;
};

type GetValidateEmailResult = Pick<User, "id" | "email" | "password">;
export type CreateUserParams = Pick<User, "username" | "email" | "password">;

const userService = {
  signIn,
  signUp,
};

export default userService;
