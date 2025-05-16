"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../queue/redis");
const EventLog_1 = require("../models/EventLog");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.MONGO_URI);
let lastId = '0-0';
const BATCH_SIZE = 100;
async function processEvents() {
    const response = await redis_1.redis.xread('COUNT', BATCH_SIZE, 'STREAMS', redis_1.STREAM_KEY, lastId);
    if (!response)
        return;
    const [_, messages] = response[0];
    const events = [];
    for (const [id, fields] of messages) {
        lastId = id;
        const event = {};
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
        await EventLog_1.EventLog.insertMany(events);
        console.log(`Inserted ${events.length} events`);
    }
}
setInterval(processEvents, 5000);
