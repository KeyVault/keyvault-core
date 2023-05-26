import express from 'express';
import cors from 'cors';
import routes from './routes';
import { logError, returnError } from './errors/errorHandler';

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

process.on('uncaughtException', (error) => {
    logError(error);
});
  

app.use(express.json({ limit: '20mb' }));
app.use(`/`, routes);
app.use(returnError);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})