// types.ts

export interface Employee {
  id: number;
  name: string;
  role: string;
  status: string;
}

export interface CreateEmployeeInput {
  name: string;
  role: string;
  status: string;
}

export interface UpdateEmployeeInput {
  name?: string;
  role?: string;
  status?: string;
}

export interface ErrorResponse {
  error: string;
}
