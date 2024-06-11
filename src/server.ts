/* eslint-disable no-console */
import mongoose from "mongoose";
import { Server } from "http";
import config from "./config";
import app from "./app";

// server run bootstrap
const serverBootStrep = async () => {
  try {
    //connect database
    await mongoose.connect(config.database_url as string);
    console.log("database connect..........");

    const server: Server = app.listen(config.port, () => {
      console.log(`server Is Running Successfully On PORT NO- ${config.port}`);
    });

    // exist Server----
    const existHandler = () => {
      if (server) {
        server.close(() => {
          console.log("Opps Server Is Closed...");
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unexpectedErrorHandler = (error: any) => {
      console.log(
        error,
        "Server Is Close Because- - Receive  unexpected Error..."
      );
      existHandler();
    };

    process.on("uncaughtException", unexpectedErrorHandler);
    process.on("unhandledRejection", unexpectedErrorHandler);
    // process.on('SIGTERM', sigtermIsReceived)
  } catch (error) {
    console.log("Server Error---", error);
  }
};

serverBootStrep();
