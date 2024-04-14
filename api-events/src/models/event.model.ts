import { model, Schema, Document } from 'mongoose';
import { Event } from '@/interfaces/event.interface';

const EventSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  descp: {
    type: String,
    required: true,
  },
  place: {
    type: Number,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
});

export const EventModel = model<Event & Document>('Event', EventSchema);
