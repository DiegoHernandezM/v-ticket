import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.get('/', (req, res) => {
  res.json({
    message: 'API V-Ticket funcionando correctamente'
  });
});
app.use(errorMiddleware);

export default app;