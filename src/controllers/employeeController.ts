// employeeController.ts

import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { CreateEmployeeInput, UpdateEmployeeInput, ErrorResponse, Employee } from "../types";

const prisma = new PrismaClient();

// Create new employee
const createEmployee = async (req: Request, res: Response<Employee | ErrorResponse>) => {
console.log(req)
  const { name, role, status } = req.body as CreateEmployeeInput;
  try {
    const employee = await prisma.employee.create({
      data: { name, role, status },
    });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create employee' });
  }
};

// Get all employees
const getEmployees = async (req: Request, res: Response<Employee[] | ErrorResponse>) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch employees' });
  }
};

// Get employee by ID
const getEmployeeById = async (req: Request<{ id: string }>, res: Response<Employee | ErrorResponse>) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: Number(id) },
    });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch employee' });
  }
};

// Update employee by ID
const updateEmployeeById = async (req: Request<{ id: string }, {}, UpdateEmployeeInput>, res: Response<Employee | ErrorResponse>) => {
  const { id } = req.params;
  const { name, role, status } = req.body;
  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id: Number(id) },
      data: { name, role, status },
    });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update employee' });
  }
};

// Delete employee by ID
const deleteEmployeeById = async (req: Request<{ id: string }>, res: Response<undefined | ErrorResponse>) => {
  const { id } = req.params;
  try {
    await prisma.employee.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete employee' });
  }
};

// Assign role to employee by ID
const assignRoleToEmployee = async (req: Request<{ id: string }, {}, { role: string }>, res: Response<Employee | ErrorResponse>) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id: Number(id) },
      data: { role },
    });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Unable to assign role to employee' });
  }
};

// Find employees by name
const findEmployeesByName = async (req: Request<{}, {}, {}, { name: string }>, res: Response<Employee[] | ErrorResponse>) => {
  const { name } = req.query;
  try {
    const employees = await prisma.employee.findMany({
      where: { name: { contains: name as string } },
    });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Unable to find employees by name' });
  }
};

export {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
  assignRoleToEmployee,
  findEmployeesByName,
};
