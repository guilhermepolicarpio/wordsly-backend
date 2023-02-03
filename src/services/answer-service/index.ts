import answerRepository from "@/repositories/answer-repository";

async function postUserAnswer(answer: boolean, userId: number) {

    const answerData ={
        correctAnswer:answer,
        userId
    }
   
    const userAnswer = await answerRepository.createAnswer(answerData);
  
    return userAnswer;
  }

  const answerService = {
    postUserAnswer
  };
  
  export default answerService;