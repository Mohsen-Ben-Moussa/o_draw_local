import type { Request, Response } from "express";

export function homeController(_: Request, res: Response) {
  res.send("<h1>Odraw backend is up !</h1>");
}

export function notFoundMiddleware(_: Request, res: Response) {
  res.status(404).send("<h1>Resource not found</h1>");
}
