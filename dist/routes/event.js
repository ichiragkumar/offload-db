"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis_1 = require("../queue/redis");
const router = express_1.default.Router();
router.post('/track_event', async (req, res) => {
    const { user_id, event, timestamp } = req.body;
    if (!user_id || !event) {
        return res.status(400).json({ error: 'Missing user_id or event' });
    }
    await redis_1.redis.xadd(redis_1.STREAM_KEY, '*', 'user_id', user_id, 'event', event, 'timestamp', timestamp || new Date().toISOString());
    return res.status(200).json({ message: 'Event received' });
});
exports.default = router;
