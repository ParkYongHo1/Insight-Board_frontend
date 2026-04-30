import axios from "axios";

export const baseConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 5000,
};

export const publicClient = axios.create(baseConfig);
export const authClient = axios.create(baseConfig);
