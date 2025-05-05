import { Quote } from '../models/Quote';
import { Output } from '../dto/Output';

export interface FormatterServiceInterface {
  format(car : Quote): Output;

}