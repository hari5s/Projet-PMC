import { ServerInterface } from './ServerInterface';
import { ServerAdapterInterface } from './ServerAdapterInterface';
import { ControllerInterface } from '../controllers/ControllerInterface';
import { LoggerInterface } from '../utils/LoggerInterface';

export class Server implements ServerInterface {
  private controllers: ControllerInterface[] = [];

  constructor(
    private serverAdapter: ServerAdapterInterface,
    private logger: LoggerInterface
  ) {}

  registerController(controller: ControllerInterface): void {
    this.controllers.push(controller);
    this.logger.info(`Registered controller: ${controller.constructor.name}`);
  }

  start(): void {
    // Register all routes from controllers
    this.controllers.forEach((controller: ControllerInterface) => {
      controller.registerRoutes(this.serverAdapter);
    });

    // Start the server adapter
    this.serverAdapter.start();
    this.logger.info('Server started successfully');
  }

  stop(): void {
    this.serverAdapter.stop();
    this.logger.info('Server stopped');
  }
}