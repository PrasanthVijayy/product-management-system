import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});

// Event handlers for Redis client
redisClient.on("connect", () => {
  console.log("Connected to Redis successfully.");
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

// Connect to Redis
const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis client connected.");
  } catch (error) {
    console.error("Redis connection failed:", error);
  }
};

export { redisClient, connectRedis };
