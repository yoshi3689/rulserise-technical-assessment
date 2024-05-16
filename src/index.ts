import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express';
import specs from '../swagger/swagger';

import employeeRoutes from './routes/employeesRoutes';
import adminRoutes from './routes/adminRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// read data transferred by POST request
  // these lines have to be before configuing routes to enable POST request data transfer
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  

app.use('/employees', employeeRoutes);
app.use('/admin', adminRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});