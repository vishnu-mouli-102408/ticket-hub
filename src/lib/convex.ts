import env from "@/env";
import { ConvexHttpClient } from "convex/browser";

// Create a client for server-side HTTP requests
export const getConvexClient = () => {
  if (!env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
  }
  return new ConvexHttpClient(env.NEXT_PUBLIC_CONVEX_URL);
};
