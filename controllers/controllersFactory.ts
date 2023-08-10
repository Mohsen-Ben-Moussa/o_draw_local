import type { Request, Response } from "express";
import type { Db } from "mongodb";

export function controllersFactory(db: Db) {
  return {
    async getPixelHistory(_: Request, res: Response) {
      const pixels = await db.collection("pixelStorage")
        .find()
        .sort({ createdAt: 1 })
        .project({ createdAt: 0, _id: 0 })
        .toArray();
      res.json(pixels);
    }
  };
}
