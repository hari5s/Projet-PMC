import { RouteHandler } from '../types/route';

export interface ServerAdapterInterface {
  get(path: string, handler: RouteHandler): void;
  post(path: string, handler: RouteHandler): void;
  put(path: string, handler: RouteHandler): void;
  delete(path: string, handler: RouteHandler): void;
  start(): void;
  stop(): void;
}