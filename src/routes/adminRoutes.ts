// adminRoutes.ts

import express from 'express';
import {
  getTotalEmployees,
  getTotalAvailableRoles,
  createJobRole,
  deleteJobRole,
} from '../controllers/adminController';

const router = express.Router();

router.get('/total-employees', getTotalEmployees);
router.get('/total-available-roles', getTotalAvailableRoles);
router.post('/job-role', createJobRole);
router.delete('/job-role/:id', deleteJobRole);

export default router;
