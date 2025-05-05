import { Server } from './server/Server';
import { ExpressServerAdapter } from './server/ExpressServerAdapter';
import { UserController } from './controllers/UserController';
import { UserService } from './services/UserService';
import { InMemoryUserRepository } from './repositories/InMemoryUserRepository';
import { ConsoleLogger } from './utils/ConsoleLogger';
import { LoggerInterface } from './utils/LoggerInterface';
import { ServerAdapterInterface } from './server/ServerAdapterInterface';
import { UserRepositoryInterface } from './repositories/UserRepositoryInterface';
import { UserServiceInterface } from './services/UserServiceInterface';
import { ServerInterface } from './server/ServerInterface';
import { ControllerInterface } from './controllers/ControllerInterface';
import { CarController } from './controllers/CarController';
import { CarServiceInterface } from './services/CarServiceInterface';
import { CarService } from './services/CarService';
import { CarRepositoryInterface } from './repositories/CarRepositoryInterface';
import { DbCarRepository } from './repositories/dbCarRepository';
import { MySQLManager } from './services/dbManager';
import { ParserServiceInterface } from './services/ParserServiceInterface';
import { FormatterServiceInterface } from './services/FormatterServiceInterface';
import { ParserService } from './services/ParserService';
import { FormatterService } from './services/FormatterService';

// Logger
const logger: LoggerInterface = new ConsoleLogger();

// Users
const userRepository: UserRepositoryInterface = new InMemoryUserRepository();
const userService: UserServiceInterface = new UserService(userRepository);
const userController: ControllerInterface = new UserController(userService);

// Cars
const dbManager = new MySQLManager();
const carRepository: CarRepositoryInterface = new DbCarRepository(dbManager);
const carService: CarServiceInterface = new CarService(carRepository);
const parserService: ParserServiceInterface = new ParserService();
const formatterService: FormatterServiceInterface = new FormatterService();
const carController: ControllerInterface = new CarController(carService, parserService, formatterService);

// Server
const serverAdapter: ServerAdapterInterface = new ExpressServerAdapter(3000, logger);
const server: ServerInterface = new Server(serverAdapter, logger);

// Register controllers
server.registerController(userController);
server.registerController(carController);

// Start server
server.start();
