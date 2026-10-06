import express from 'express';
import { createExpense,getExpenses,getExpenseById,updateExpense,deleteExpense } from '../controllers/expense.conroller';

const router = express.Router();

router.post('/create',createExpense);
router.get('/expenses',getExpenses);
router.get('/expense/:id',getExpenseById);
router.patch('/expense/:id',updateExpense);
router.delete('/expense/:id',deleteExpense);


export default router;
