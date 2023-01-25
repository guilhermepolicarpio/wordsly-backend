import { userSignUp,userSignIn } from "../controllers/users-controller";
import { createUserSchema,signInSchema } from "../schemas/index";
import { validateBody } from "../middlewares/index";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/sign-in", validateBody(signInSchema), userSignIn);
userRouter.post("/sign-up", validateBody(createUserSchema), userSignUp);

export { userRouter };