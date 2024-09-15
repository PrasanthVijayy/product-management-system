// src/common/utils/cacheUtils.js
import { redisClient } from "../config/redisClient.js";

/**
 * Get data from Redis cache
 * @param {string} key
 * @returns {Promise<any|null>}
 */
export const getCache = async (key) => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting data from Redis:", error);
    return null;
  }
};

/**
 * Set data in Redis cache
 * @param {string} key
 * @param {any} value
 * @param {number} [ttl=3600] - Time 1 hour
 * @returns {Promise<void>}
 */
export const setCache = async (key, value, ttl = 3600) => {
  try {
    await redisClient.setEx(key, ttl, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting data in Redis:", error);
  }
};
