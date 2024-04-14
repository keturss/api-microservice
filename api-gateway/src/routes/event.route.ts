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

        /**
     * @swagger
     * tags:
     *   - name: Events
     *     description: events endpoints
     */
    /**
     * @swagger
     * /events:
     *   get:
     *     summary: Get a list of events
     *     description: Retrieve a list of events.
     *     tags:
     *       - Events
     *     responses:
     *       '200':
     *         description: A successful response
     *         content:
     */
    this.router.get(`${this.path}`, this.event.getEvents);
          /**
     * @swagger
     * /events/{id}:
     *   get:
     *     summary: Get a ticket by ID
     *     description: Retrieve a ticket by its ID.
     *     tags:
     *       - Events
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

     */
    this.router.get(`${this.path}/:id`, this.event.getEventById);
         /**
     * @swagger
     * /events:
     *   post:
     *     summary: Create a new ticket
     *     description: Create a new ticket with the provided data.
     *     tags:
     *       - Events
     *     requestBody:
     *       required: true
     *       content:
     *     responses:
     *       '201':
     *         description: ticket created successfully
     *       '400':
     *         description: Bad request - Invalid input data
     */
    this.router.post(`${this.path}`, ValidationMiddleware(CreateEventDto), this.event.createEvent);
        /**
     * @swagger
     * /events/{id}:
     *   put:
     *     summary: Update a events by ID
     *     description: Update a events's data by its ID.
     *     tags:
     *       - Events
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the events to update.
     *     requestBody:
     *       required: true
     *       content:
     *     responses:
     *       '200':
     *         description: events updated successfully
     *       '400':
     *         description: Bad request - Invalid input data
     */
    this.router.put(`${this.path}/:id`, ValidationMiddleware(CreateEventDto, true), this.event.updateEvent);
            /**
     * @swagger
     * /events/{id}:
     *   delete:
     *     summary: Delete a events by ID
     *     description: Delete a events by its ID.
     *     tags:
     *       - Events
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the events to delete.
     *     responses:
     *       '204':
     *         description: events deleted successfully
     */
    this.router.delete(`${this.path}/:id`, this.event.deleteEvent);
  }
}
