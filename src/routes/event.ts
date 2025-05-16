import express from "express";
import { redis, STREAM_KEY } from "../queue/redis";

const router = express.Router();

router.post("/track_event", async (req, res): Promise<any> => {
  const { user_id, event, timestamp } = req.body;

  if (!user_id || !event) {
    return res.status(400).json({ error: "Missing user_id or event" });
  }

  await redis.xadd(
    STREAM_KEY,
    "*",
    "user_id",
    user_id,
    "event",
    event,
    "timestamp",
    timestamp || new Date().toISOString()
  );

  return res.status(200).json({ message: "Event received" });
});

export default router;
