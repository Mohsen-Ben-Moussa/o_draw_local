import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import type { Db } from "mongodb";
import type { Message, Pixel, ReceivedMessage, ReceivedPixel } from "./types";


export function initWebsocketServer(server: HttpServer, db: Db) {
  const io = new Server(server, {
    cors: { origin: process.env.ALLOWED_ORIGIN }
  });

  io.on("connection", async (socket) => {
    socket.on("chat", saveAndDispatchMessage);
    socket.on("draw", saveAndDispatchPixel);

    socket.emit("retrieve-chat", await fetchLastChatMessages());
    socket.emit("retrieve-pixels", await fetchAllPixels());
  });


  async function saveAndDispatchMessage(message: ReceivedMessage) {
    const savedMessage = await saveMessage(message);
    io.emit("chat", savedMessage);
  }

  async function saveAndDispatchPixel(pixel: ReceivedPixel) {
    const savedPixel = await upsertPixelColor(pixel);
    io.emit("draw", savedPixel);
    await persistPixel(pixel);
  }

  async function saveMessage(message: ReceivedMessage) {
    const { insertedId: messageId } = await db.collection("messages").insertOne({
      content: message.content,
      pseudo: message.pseudo,
      createdAt: new Date()
    });
    return db.collection<Message>("messages").findOne(messageId);
  }

  async function upsertPixelColor(pixel: ReceivedPixel) {
    const { x, y, color } = pixel;
    await db.collection("pixels").updateOne({ x, y }, { $set: { color }}, { upsert: true });

    return db.collection<Pixel>("pixels").findOne({ x, y });
  }

  async function fetchLastChatMessages() {
    const messages = await db.collection("messages")
      .find()
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();
    return messages.sort(byOldestFirst);

    function byOldestFirst(message1: Message, message2: Message) {
      return message1.createdAt.valueOf() - message2.createdAt.valueOf();
    }
  }

  async function fetchAllPixels() {
    return db.collection<Pixel>("pixels").find().toArray();
  }

  async function persistPixel(pixel: ReceivedPixel) {
    await db.collection("pixelStorage").insertOne({
      ...pixel,
      createdAt: new Date()
    });
  }
}
