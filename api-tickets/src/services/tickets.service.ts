import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { Ticket } from '@/interfaces/tickets.interface';
import { TicketModel } from '@/models/tickets.model';
import  amqp  from 'amqplib';

const RABBIT = process.env.RABBIT || "amqp://localhost";

@Service()
export class TicketService {
  public async findAllTicket(): Promise<Ticket[]> {
    const users: Ticket[] = await TicketModel.find();
    return users;
  }

  public async findTicketById(userId: string): Promise<Ticket> {
    const findUser: Ticket = await TicketModel.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createTicket(userData: Ticket): Promise<Ticket> {

    //TODO need to connect to Event BDD
    // const findEvent: Event = await EventModel.findOne({ _id: userData.event });
    // if (findEvent) throw new HttpException(409, `This event ${userData.event} dont exists`);


    const connection = await amqp.connect(RABBIT);
    const channel = await connection.createChannel();
    const queueName = "mail";

    const message = { data: "vous avez acheter vos billet" };
    await channel.assertQueue(queueName, { durable: false });
    await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));

    console.log("Message envoyé à la file d'attente RabbitMQ");

    await channel.close();
    await connection.close();

    const createUserData: Ticket = await TicketModel.create({ ...userData});

    return createUserData;
  }

}
