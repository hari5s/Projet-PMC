import { QueryResult } from "mysql2";

export interface DBManagerInterface {
    query<T = any>(sql: string, params?: any[]): Promise<T[]>;
    queryOne<T = any>(sql: string, params?: any[]): Promise<T | null>;
    execute(sql: string, params?: any[]): Promise< QueryResult >;
  }
  