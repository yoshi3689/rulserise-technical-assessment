// employeeRoutes.ts

import express from 'express';
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
  assignRoleToEmployee,
  findEmployeesByName,
} from '../controllers/employeeController';

const router = express.Router();

router.post('/', createEmployee);
router.get('/', getEmployees);
router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployeeById);
router.delete('/:id', deleteEmployeeById);
router.put('/:id/assign-role', assignRoleToEmployee);
router.get('/search', findEmployeesByName);

export default router;
