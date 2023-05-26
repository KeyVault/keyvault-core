import apicache from 'apicache';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import auth from './middlewares/auth';
import validate from './middlewares/validate';

import newAccountController from './controllers/newAccountController';

const cache = apicache.middleware;

const successCache = (duration: string) => {
    cache(duration, (_req: Request, res: Response) => res.statusCode === 200);
}

const router = express.Router();

router.get('/', (_, res) => {
    res.send('🧸 keylock-core online.🧸');
})

router.post('/signup',newAccountController);

export default router;