import "dotenv/config";
import * as cors from "cors";
import * as express from "express";
import * as http from "http";
import { connectDB } from "./database";
import { initWebsocketServer } from "./websocket";
import { homeController, notFoundMiddleware, controllersFactory } from "./controllers";

const app = express();

app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));

const server = http.createServer(app);

// Connect to the database first (it can take times if the server and DB aren't on the same machine !)
connectDB().then(db => {

  // Start Websocket server
  initWebsocketServer(server, db);

  // Attach middlewares
  app.get("/", homeController);
  app.get("/api/history", controllersFactory(db).getPixelHistory);
  app.use(notFoundMiddleware);

  // Start HTTP server
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`🚀 Listening at http://localhost:${port}`);
  });
});
