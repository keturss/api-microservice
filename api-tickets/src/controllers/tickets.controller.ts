import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Ticket } from '@/interfaces/tickets.interface';
import { TicketService } from '@/services/tickets.service';

export class TicketController {
  public ticket = Container.get(TicketService);

  public getTickets = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: Ticket[] = await this.ticket.findAllTicket();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTicketById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: Ticket = await this.ticket.findTicketById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: Ticket = req.body;
      const createUserData: Ticket = await this.ticket.createTicket(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };


}
