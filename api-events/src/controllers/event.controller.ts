import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Event } from '@/interfaces/event.interface';
import { EventService } from '@/services/event.service';

export class EventController {
  public event = Container.get(EventService);

  public getEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAlleventsData: Event[] = await this.event.findAllEvents();

      res.status(200).json({ data: findAlleventsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public geteventById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const eventId: string = req.params.id;
      const findOneeventData: Event = await this.event.findEventById(eventId);

      res.status(200).json({ data: findOneeventData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const eventData: Event = req.body;
      const createeventData: Event = await this.event.createEvent(eventData);

      res.status(201).json({ data: createeventData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const eventId: string = req.params.id;
      const eventData: Event = req.body;
      const updateeventData: Event = await this.event.updateEvent(eventId, eventData);

      res.status(200).json({ data: updateeventData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const eventId: string = req.params.id;
      const deleteeventData: Event = await this.event.deleteevent(eventId);

      res.status(200).json({ data: deleteeventData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
