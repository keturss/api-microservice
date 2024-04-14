import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { Event } from '@/interfaces/event.interface';
import { EventModel } from '@/models/event.model';

@Service()
export class EventService {
  public async findAllEvents(): Promise<Event[]> {
    const events: Event[] = await EventModel.find();
    return events;
  }

  public async findEventById(eventId: string): Promise<Event> {
    const findevent: Event = await EventModel.findOne({ _id: eventId });
    if (!findevent) throw new HttpException(409, "event doesn't exist");

    return findevent;
  }

  public async createEvent(eventData: Event): Promise<Event> {
    const findevent: Event = await EventModel.findOne({ name: eventData.name });
    if (findevent) throw new HttpException(409, `This event ${eventData.name} already exists`);

    const createeventData: Event = await EventModel.create({ ...eventData});

    return createeventData;
  }

  public async updateEvent(eventId: string, eventData: Event): Promise<Event> {

    const updateeventById: Event = await EventModel.findByIdAndUpdate(eventId, { eventData });
    if (!updateeventById) throw new HttpException(409, "event doesn't exist");

    return updateeventById;
  }

  public async deleteevent(eventId: string): Promise<Event> {
    const deleteeventById: Event = await EventModel.findByIdAndDelete(eventId);
    if (!deleteeventById) throw new HttpException(409, "event doesn't exist");

    return deleteeventById;
  }
}
