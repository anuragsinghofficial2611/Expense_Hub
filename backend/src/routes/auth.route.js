import epxress from 'express';
import { loginUser,registerUser } from '../controllers/auth.controller.js';
const router = epxress.Router();

router.post('/login',loginUser);
router.post('/register',registerUser);

export default router;