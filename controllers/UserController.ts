import { ControllerInterface } from './ControllerInterface';
import { ServerAdapterInterface } from '../server/ServerAdapterInterface';
import { UserServiceInterface } from '../services/UserServiceInterface';
import { CarServiceInterface } from '../services/CarServiceInterface';
import { Request, Response } from '../types/http';
import { User } from '../models/User';
import { Car } from '../models/Car';

export class UserController implements ControllerInterface {
  constructor(
    private userService: UserServiceInterface,
  ) {}

  registerRoutes(server: ServerAdapterInterface): void {

    server.get('/users', this.getAllUsers.bind(this));
    server.get('/users/:id', this.getUserById.bind(this));
    server.post('/users', this.createUser.bind(this));
    server.put('/users/:id', this.updateUser.bind(this));
    server.delete('/users/:id', this.deleteUser.bind(this));

  }


  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users: User[] = await this.userService.getAllUsers();
    res.status(200).json(users);
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    try {
      const user: User | null = await this.userService.getUserById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error: unknown) {
      const errorMessage: string = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user: User = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error: unknown) {
      const errorMessage: string = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    try {
      const user: User | null = await this.userService.updateUser(id, req.body);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error: unknown) {
      const errorMessage: string = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    try {
      const success: boolean = await this.userService.deleteUser(id);
      if (success) {
        res.status(204).send(null);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error: unknown) {
      const errorMessage: string = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }
}
