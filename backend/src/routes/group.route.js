import express from 'express';
import {createGroup,getGroups,getGroupById,updateGroup,deleteGroup} from '../controllers/group.controller.js'
const router = express.Router();

router.post('/create',createGroup);
router.get('/all',getGroups);
router.post('/group/:id',getGroupById);
router.patch('/group/:id',updateGroup);
router.delete('/group/:id',deleteGroup);

export default router;