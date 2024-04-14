import { Router } from 'express';
import { EventController } from '@controllers/events.controller';
import { CreateEventDto } from '@/dtos/event.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class EventRoute implements Routes {
  public path = '/events';
  public router = Router();
  public event = new EventController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.event.getEvents);
    this.router.get(`${this.path}/:id`, this.event.getEventById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateEventDto), this.event.createEvent);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(CreateEventDto, true), this.event.updateEvent);
    this.router.delete(`${this.path}/:id`, this.event.deleteEvent);
  }
}
