import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { TicketRoute } from './routes/tickets.route';
import { EventRoute } from './routes/event.route';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute(),new TicketRoute(),new EventRoute()]);

app.listen();
