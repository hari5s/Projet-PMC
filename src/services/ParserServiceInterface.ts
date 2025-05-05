import { Quote } from '../models/Quote';
import { Input } from '../dto/Input';

export interface ParserServiceInterface {
  parse(body : Input): Partial<Quote>; 

}
