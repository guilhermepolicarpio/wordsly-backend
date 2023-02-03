import { Request, Response } from "express";
import httpStatus from "http-status";
import answerService from "@/services/answer-service";

export async function answerController(req: Request, res: Response) {
  const {answer,userId} = req.body;

  try {
    const result = await answerService.postUserAnswer(answer,userId )
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    console.log(error)
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
  
  }