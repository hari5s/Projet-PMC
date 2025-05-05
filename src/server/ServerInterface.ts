import { ControllerInterface } from '../controllers/ControllerInterface';

export interface ServerInterface {
  registerController(controller: ControllerInterface): void;
  start(): void;
  stop(): void;
}