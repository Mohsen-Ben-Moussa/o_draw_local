import type { Pixel } from "@/types";
import { io } from "socket.io-client";

const BASE_HTTP_URL = process.env.VUE_APP_BACKEND_HTTP_URL;
const BASE_WS_URL = process.env.VUE_APP_BACKEND_WS_URL;

export async function fetchAllPastPixels() {
  const httpResponse = await fetch(`${BASE_HTTP_URL}/api/history`) ;
  const pixels: Pixel[] = await httpResponse.json();
  return pixels;
}

export const socket = io(BASE_WS_URL);
