import { redis, STREAM_KEY } from '../queue/redis';
import { EventLog } from '../models/EventLog';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
mongoose.connect(process.env.MONGO_URI!);

let lastId = '0-0';

const BATCH_SIZE = 100;

async function processEvents() {
  const response = await redis.xread(
    'COUNT', BATCH_SIZE,
    'STREAMS', STREAM_KEY, lastId
  );

  if (!response) return;

  const [_, messages] = response[0];
  const events = [];

  for (const [id, fields] of messages) {
    lastId = id;
    const event: any = {};
    for (let i = 0; i < fields.length; i += 2) {
      event[fields[i]] = fields[i + 1];
    }
    events.push({
      user_id: event.user_id,
      event: event.event,
      timestamp: new Date(event.timestamp),
    });
  }

  if (events.length) {
    await EventLog.insertMany(events);
    console.log(`Inserted ${events.length} events`);
  }
}

setInterval(processEvents, 5000);
