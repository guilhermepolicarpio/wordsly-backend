import { prisma } from "../../config/index";
import { Answer } from "@prisma/client";

async function createAnswer(answerData:CreateAnswerParams) {
    return prisma.answer.create({
      data: {
        ...answerData
      }
    });
  }

  export type CreateAnswerParams = Omit<Answer, "id" | "createdAt" | "updatedAt">


const answerRepository = {
    createAnswer,
  };
  
  export default answerRepository;