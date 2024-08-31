import { Microservice } from "./app";

const microservice = new Microservice();

microservice.start();

process.on("SIGINT", () => {
  console.warn("Gracefully shutting down...");
  microservice.stop();
});

process.on("SIGTERM", () => {
  console.warn("Gracefully shutting down...");
  microservice.stop();
});
