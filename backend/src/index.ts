import express from "express";
import dotenv from "dotenv";
import DatabaseService from "./services/database";
import { ApplicationService } from "./services/application";
dotenv.config();

const app = express();
const startServer = () => {
  DatabaseService();
  ApplicationService(app);
};
startServer();


