import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@interfaces/users.interface';
import fetch from 'node-fetch';

const URLEVENT =  process.env.URLEVENT || "http://localhost:3002/events";

export class EventController {

  public getEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
    //   const findAllUsersData: User[] = await this.user.findAllUser();

    const response = await fetch(
        `${URLEVENT}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        }
      );
      const statusCode = response.status;
      const data = await response.json();

      res.status(statusCode).json({ data: data, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getEventById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
    //   const findOneUserData: User = await this.user.findUserById(userId);

    const response = await fetch(
        `${URLEVENT}/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        }
      );
      const statusCode = response.status;
      const data = await response.json();

      res.status(statusCode).json({ data: data, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
    //   const createUserData: User = await this.user.createUser(userData);

    const response = await fetch(
        `${URLEVENT}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(userData)
        }
      );
      const statusCode = response.status;
      const data = await response.json();

      res.status(statusCode).json({ data: data, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: User = req.body;
    //   const updateUserData: User = await this.user.updateUser(userId, userData);

    const response = await fetch(
        `${URLEVENT}/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(userData)
        }
      );
      const statusCode = response.status;
      const data = await response.json();

      res.status(statusCode).json({ data: data, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
    //   const deleteUserData: User = await this.user.deleteUser(userId);

    const response = await fetch(
        `${URLEVENT}/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
        }
      );
      const statusCode = response.status;
      const data = await response.json();

      res.status(statusCode).json({ data: data, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
