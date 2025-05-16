import express from 'express';
import bodyParser from 'body-parser';
import eventRoutes from './routes/event';

const app = express();
app.use(bodyParser.json());
app.use('/', eventRoutes);

export default app;
