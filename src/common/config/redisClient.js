import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("connect", () => {
  console.log("Connected to Redis successfully.");
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis client connected.");
  } catch (error) {
    console.error("Redis connection failed:", error);
  }
};

export { redisClient, connectRedis };
