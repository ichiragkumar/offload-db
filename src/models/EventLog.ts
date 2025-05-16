import mongoose from 'mongoose';

const EventLogSchema = new mongoose.Schema({
  user_id: String,
  event: String,
  timestamp: Date,
}, { timestamps: true });

export const EventLog = mongoose.model('EventLog', EventLogSchema);
