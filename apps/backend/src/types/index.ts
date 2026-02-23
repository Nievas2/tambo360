import {Establecimiento} from "@prisma/client";


declare module 'express' {
  interface Request {
    user?: { id: string };
    establecimiento?: Establecimiento;
  }
}

interface RegistrationData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ValidationError {
  field: string;
  message: string;
}
export { RegistrationData, LoginData, ValidationError };