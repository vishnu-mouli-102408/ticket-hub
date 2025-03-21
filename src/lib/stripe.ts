import env from "@/env";
import Stripe from "stripe";

console.log(env.STRIPE_SECRET_KEY, "env.STRIP_SECRET_KEY");

// if (!env.STRIPE_SECRET_KEY) {
//   throw new Error("STRIPE_SECRET_KEY is missing in environment variables");
// }

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
});
