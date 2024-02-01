import cors from "cors";
import express, { Application } from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "../graphql";

export const ApplicationService = (app: Application) => {
  const PORT = process.env.PORT || 4004;
  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP({ schema, graphiql: process.env.NODE_ENV === "development" })
  );
  app.listen(PORT, async () => {
    console.log("listening on port:", PORT);
  });
};
export default ApplicationService;
