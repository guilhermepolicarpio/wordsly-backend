import { Request, Response } from "express";
import httpStatus from "http-status";

import userService from "../services/users-service";

export async function userSignIn(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const result = await userService.signIn({ email, password })
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    console.log(error)
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export async function userSignUp(req: Request, res: Response) {
  const { username, email, password,userImage } = req.body;
  console.log(username, email, password,userImage)
  try {

    const user = await userService.signUp({username, email, password,userImage });
  
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    })
  } catch (error) {
    console.log("error")
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
