import { ServerAdapterInterface } from '../server/ServerAdapterInterface';

export interface ControllerInterface {
  registerRoutes(server: ServerAdapterInterface): void;
}