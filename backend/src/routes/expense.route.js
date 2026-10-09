import express from 'express';
import { createExpense,getExpenses,getExpenseById,updateExpense,deleteExpense } from '../controllers/expense.conroller.js';
import { expenseMiddleware } from '../middlewares/expense.middleware.js'
const router = express.Router();

router.post('/create',expenseMiddleware,createExpense);
router.get('/expenses',getExpenses);
router.get('/expense/:id',getExpenseById);
router.patch('/expense/:id',updateExpense);
router.delete('/expense/:id',deleteExpense);


export default router;
