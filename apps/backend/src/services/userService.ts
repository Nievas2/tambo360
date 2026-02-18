import User from "../models/User";
import { prisma } from "../lib/prisma";

class UserService {
  private users: User[] = [];
  constructor() {
    this.users = [];
  }
  

  findByEmail(email: any) {
    return this.users.find(user => user.email === email);
  }

  findById(id: any) {
    return this.users.find(user => user.id === id);
  }

  async create(userData: any) {
    const existingUser = this.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = User.create(userData);
    this.users.push(newUser);
    return newUser;
  }

  async authenticate(email: any, password: any) {
    const user = this.findByEmail(email);
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    return user;
  }

  getAllUsers() {
    return this.users.map(user => user.toJSON());
  }
}

export default new UserService();
