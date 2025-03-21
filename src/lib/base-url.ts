import env from "@/env";

const baseUrl =
  env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;

export default baseUrl;
