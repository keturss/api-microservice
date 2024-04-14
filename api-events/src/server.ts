import { App } from '@/app';
import { EventRoute } from '@routes/event.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new EventRoute()]);

app.listen();
