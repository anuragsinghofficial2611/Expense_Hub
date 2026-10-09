import express from 'express';
import authRoute from './routes/auth.route.js';
import groupRoute from './routes/group.route.js';
import expenseRoute from './routes/expense.route.js';

const app = express();

app.use(express.json());

app.use('/api/v1/auth',authRoute);
app.use('/api/v1/group',groupRoute);
app.use('/api/v1/expense',expenseRoute);

export default app;