import { ParserServiceInterface } from './ParserServiceInterface';
import { Quote } from '../models/Quote';
import { Input } from '../dto/Input';

export class ParserService implements ParserServiceInterface {
  parse(body: Input): Partial<Quote> {
    const parsed: Partial<Quote> = {};

    parsed.id = body.inputId;
    parsed.name = body.inputName.trim();
    parsed.surname = body.inputSurname.trim();
    parsed.email = body.inputEmail.trim();
    parsed.phone = body.inputPhone;
    parsed.adress = body.inputAdress.trim();
    parsed.company = body.inputCompany.trim();
    parsed.projectDescription = body.inputProjectDescription.trim();
    parsed.typeOfProperty = body.inputTypeOfProperty.trim();
    parsed.surface = body.inputSurface;
    parsed.owner = body.inputOwner.trim();
    return parsed;
  }
}
