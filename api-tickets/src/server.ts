import { App } from '@/app';
import { TicketRoute } from '@/routes/tickets.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new TicketRoute()]);

app.listen();
