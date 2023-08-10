import type { ObjectId } from "mongodb";

export interface ReceivedMessage {
  content: string;
  pseudo: string;
}

export interface ReceivedPixel {
  x: number;
  y: number;
  color: string;
}

export interface Message {
  _id: ObjectId;
  content: string;
  pseudo: string;
  createdAt: Date;
}

export interface Pixel {
  _id: ObjectId;
  x: number;
  y: number;
  color: string;
}
