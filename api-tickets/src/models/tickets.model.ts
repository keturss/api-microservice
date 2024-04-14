import { model, Schema, Document } from 'mongoose';
import { Ticket } from '@/interfaces/tickets.interface';

const TicketSchema: Schema = new Schema({
  user: {
    type: String,
    required: true,
    unique: false,
  },
  event: {
    type: String,
    required: false,
  },
  count:{
    type: Number,
    required: false,
  }
});

export const TicketModel = model<Ticket & Document>('Ticket', TicketSchema);
