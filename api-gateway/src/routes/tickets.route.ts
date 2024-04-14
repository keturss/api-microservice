import { Router } from 'express';
import { TicketController } from '@controllers/tickets.controller';
import { CreateTicketDto } from '@/dtos/tickets.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class TicketRoute implements Routes {
  public path = '/tickets';
  public router = Router();
  public ticket = new TicketController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.ticket.getTickets);
    this.router.get(`${this.path}/:id`, this.ticket.getTicketById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateTicketDto), this.ticket.createTicket);
  }
}
