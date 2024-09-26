import "source-map-support/register";
import serverlessExpress from "@codegenie/serverless-express";
import { createServer } from "./server";

// Initialize the Express app
const app = createServer();

// Export the handler for AWS Lambda
export const handler = serverlessExpress({ app });