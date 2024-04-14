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
    /**
     * @swagger
     * tags:
     *   - name: Tickets
     *     description: tickets endpoints
     */
    /**
     * @swagger
     * /tickets:
     *   get:
     *     summary: Get a list of tickets
     *     description: Retrieve a list of tickets.
     *     tags:
     *       - Tickets
     *     responses:
     *       '200':
     *         description: A successful response
     *         content:
     *           application/json:
     *             example:
     *               tickets: [{ id: 1, user: 'John@gmail.com', event: "Tours", count: "1" }]
     */
    this.router.get(`${this.path}`, this.ticket.getTickets);
           /**
     * @swagger
     * /tickets/{id}:
     *   get:
     *     summary: Get a ticket by ID
     *     description: Retrieve a ticket by its ID.
     *     tags:
     *       - Tickets
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the ticket.
     *     responses:
     *       '200':
     *         description: A successful response
     *         content:
     *           application/json:
     *             example:
     *               tickets: [{ id: 1, user: 'John@gmail.com', event: "Tours", count: "1" }]
     */
    this.router.get(`${this.path}/:id`, this.ticket.getTicketById);

         /**
     * @swagger
     * /tickets:
     *   post:
     *     summary: Create a new ticket
     *     description: Create a new ticket with the provided data.
     *     tags:
     *       - Tickets
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           example:
     *             email: john_doe@gmail.com
     *             password: secretpassword
     *             role: ADMIN
     *     responses:
     *       '201':
     *         description: ticket created successfully
     *       '400':
     *         description: Bad request - Invalid input data
     */
    this.router.post(`${this.path}`, ValidationMiddleware(CreateTicketDto), this.ticket.createTicket);
  }
}
