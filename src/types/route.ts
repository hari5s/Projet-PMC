import { Request, Response } from './http';

export type RouteHandler = (req: Request, res: Response) => Promise<void>;