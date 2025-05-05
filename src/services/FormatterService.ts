import { FormatterServiceInterface } from './FormatterServiceInterface';
import { Quote } from '../models/Quote';
import { Output } from '../dto/Output';

export class FormatterService implements FormatterServiceInterface {
  format(quote: Quote): Output {
    return {
      outputId: quote.id,
      outputName: quote.name,
      outputSurname: quote.surname,
      outputEmail: quote.email,
      outputPhone: quote.phone,
      outputAdress: quote.adress,
      outputCompany: quote.company,
      outputProjectDescription: quote.projectDescription,
      outputTypeOfProperty: quote.typeOfProperty,
      outputSurface: quote.surface,
      outputOwner: quote.owner,
    };
  }
}

