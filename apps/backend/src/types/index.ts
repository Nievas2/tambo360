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