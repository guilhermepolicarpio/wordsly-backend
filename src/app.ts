import dotenv from 'dotenv';
import express, { Express } from "express";
import cors from 'cors';

import { loadEnv, connectDb, disconnectDB } from "./config"

loadEnv();

import {answerRouter, userRouter } from './routers';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/answer", answerRouter)
app.use("/user", userRouter)


export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app);
  }
  
  export async function close(): Promise<void> {
    await disconnectDB();
  }
  
export default app;

