import { logger } from './utils/logger';
import express from 'express';
import dotenv from 'dotenv'

// ----- CONFIGURATION -----
dotenv.config();

const app = express();
app.use(express.json())

// ----- ROUTERS -----
const API_PREFIX = '/api/v1'

import healthRouter from './routes/health.routes'
import orderRouter from './routes/order.routes'

app.use(`${API_PREFIX}/health`, healthRouter);
app.use(`${API_PREFIX}/orders`, orderRouter);

logger.info('APP', "App initialized");

export default app;