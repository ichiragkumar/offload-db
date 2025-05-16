"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventLog = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const EventLogSchema = new mongoose_1.default.Schema({
    user_id: String,
    event: String,
    timestamp: Date,
}, { timestamps: true });
exports.EventLog = mongoose_1.default.model('EventLog', EventLogSchema);
