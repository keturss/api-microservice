import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import fetch from 'node-fetch';
import {getAuthorization} from '@middlewares/auth.middleware';

const URLAUTH =  process.env.URLAUTH || "http://localhost:3001";

export class AuthController {

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      
      const response = await fetch(
        `${URLAUTH}/signup`,
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
      

      res.status(statusCode).json({ data: data, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      // const { cookie, findUser } = await this.auth.login(userData);

      const response = await fetch(
        `${URLAUTH}/login`,
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
      const cookie = response.headers.raw()['set-cookie'];


      res.setHeader('Set-Cookie', [cookie]);
      res.status(statusCode).json({ data: data, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      // const logOutUserData: User = await this.auth.logout(userData);
      
      const response = await fetch(
        `${URLAUTH}/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${getAuthorization(req)}`
          }
        }
      );
      const statusCode = response.status;
      const data = await response.json();
      const cookie = response.headers.raw()['set-cookie'];

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(statusCode).json({ data: data, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}
