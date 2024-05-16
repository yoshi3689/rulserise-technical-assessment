// adminController.ts

import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { ErrorResponse } from '../types';

const prisma = new PrismaClient();

// Retrieve total employees
const getTotalEmployees = async (req: Request, res: Response<{ totalEmployees: number } | ErrorResponse>) => {
  try {
    const totalEmployees = await prisma.employee.count();
    res.status(200).json({ totalEmployees });
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve total employees' });
  }
};

// Retrieve total available roles
const getTotalAvailableRoles = async (req: Request, res: Response<{ availableRoles: string[] } | ErrorResponse>) => {
  const availableRoles = ['manager', 'developer', 'design', 'scrum master'];
  res.status(200).json({ availableRoles });
};

// Create job role
const createJobRole = async (req: Request, res: Response<ErrorResponse>) => {
  const { role } = req.body;
  try {
    // Check if role already exists
    const existingRole = await prisma.jobRole.findUnique({
      where: { name: role },
    });
    if (existingRole) {
      return res.status(400).json({ error: 'Job role already exists' });
    }

    // Create new job role
    await prisma.jobRole.create({
      data: { name: role },
    });
    res.status(201).end();
  } catch (error) {
    res.status(500).json({ error: 'Unable to create job role' });
  }
};

// Delete job role by ID
const deleteJobRole = async (req: Request<{ id: string }>, res: Response<undefined | ErrorResponse>) => {
  const { id } = req.params;
  try {
    await prisma.jobRole.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete job role' });
  }
};

export {
  getTotalEmployees,
  getTotalAvailableRoles,
  createJobRole,
  deleteJobRole,
};
