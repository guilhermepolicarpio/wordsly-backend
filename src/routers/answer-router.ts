import { Router } from "express";
import { answerController } from "../controllers/answer-controller";

const answerRouter = Router();

answerRouter.post("/answer",  answerController);
console.log("olaaaaaaaa123")
export { answerRouter };