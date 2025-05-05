import { QueryResult } from 'mysql2';
import { createConnection } from '../config/db';
import { DBManagerInterface } from './dbManagerInterface';

export class MySQLManager implements DBManagerInterface {
  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    const connection = await createConnection();
    const [rows] = await connection.query(sql, params);
    await connection.end();
    return rows as T[];
  }

  async queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    const connection = await createConnection();
    const [rows] = await connection.query(sql, params);
    await connection.end();
    const result = (rows as T[])[0];
    return result || null;
  }

  async execute(sql: string, params: any[] = []): Promise< QueryResult > {
    const connection = await createConnection();
    const [result] = await connection.query(sql, params);
    await connection.end();
    return result;
  }
}
