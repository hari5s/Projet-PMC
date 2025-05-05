import express, { Express, Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { Request, Response } from '../types/http';
import { RouteHandler } from '../types/route';
import { LoggerInterface } from '../utils/LoggerInterface';
import { ServerAdapterInterface } from './ServerAdapterInterface';

export class ExpressServerAdapter implements ServerAdapterInterface {
  private app: Express;
  private server: any;

  constructor(private port: number, private logger: LoggerInterface) {
    this.app = express();
    this.app.use(express.json());
  }

  private adaptRequest(req: ExpressRequest): Request {
    return {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers
    };
  }

  private adaptResponse(res: ExpressResponse): Response {
    return {
      status: (code: number) => {
        res.status(code);
        return {
          json: (data: any) => res.json(data),
          send: (data: any) => res.send(data)
        };
      }
    };
  }

  get(path: string, handler: RouteHandler): void {
    this.app.get(path, async (req: ExpressRequest, res: ExpressResponse) => {
      try {
        await handler(this.adaptRequest(req), this.adaptResponse(res));
      } catch (error: unknown) {
        const errorMessage: string = error instanceof Error ? error.message : 'Internal server error';
        this.logger.error(`Error handling GET ${path}: ${errorMessage}`);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  }

  post(path: string, handler: RouteHandler): void {
    this.app.post(path, async (req: ExpressRequest, res: ExpressResponse) => {
      try {
        await handler(this.adaptRequest(req), this.adaptResponse(res));
      } catch (error: unknown) {
        const errorMessage: string = error instanceof Error ? error.message : 'Internal server error';
        this.logger.error(`Error handling POST ${path}: ${errorMessage}`);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  }

  put(path: string, handler: RouteHandler): void {
    this.app.put(path, async (req: ExpressRequest, res: ExpressResponse) => {
      try {
        await handler(this.adaptRequest(req), this.adaptResponse(res));
      } catch (error: unknown) {
        const errorMessage: string = error instanceof Error ? error.message : 'Internal server error';
        this.logger.error(`Error handling PUT ${path}: ${errorMessage}`);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  }

  delete(path: string, handler: RouteHandler): void {
    this.app.delete(path, async (req: ExpressRequest, res: ExpressResponse) => {
      try {
        await handler(this.adaptRequest(req), this.adaptResponse(res));
      } catch (error: unknown) {
        const errorMessage: string = error instanceof Error ? error.message : 'Internal server error';
        this.logger.error(`Error handling DELETE ${path}: ${errorMessage}`);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  }

  start(): void {
    this.server = this.app.listen(this.port, () => {
      this.logger.info(`Express server listening on port ${this.port}`);
    });
  }

  stop(): void {
    if (this.server) {
      this.server.close();
    }
  }
}