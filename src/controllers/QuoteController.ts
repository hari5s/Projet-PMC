import { ControllerInterface } from './ControllerInterface';
import { ServerAdapterInterface } from './../server/ServerAdapterInterface';
import { QuoteServiceInterface } from '../services/QuoteServiceInterface';
import { Request, Response } from './../types/http';
import { Quote } from '../models/Quote';
import { FormatterServiceInterface } from '../services/FormatterServiceInterface';
import { ParserServiceInterface } from '../services/ParserServiceInterface';

export class QuoteController implements ControllerInterface {
  constructor(
    private quoteService: QuoteServiceInterface,
    private parserService: ParserServiceInterface,
    private formatterService: FormatterServiceInterface
  ) {}

  registerRoutes(server: ServerAdapterInterface): void {
    server.get('/quotes', this.getAllQuote.bind(this));
    server.get('/quotes/:id', this.getQuoteById.bind(this));
    server.get('/quotes/name/:name', this.getByName.bind(this));
    server.get('/quotes/surname/:surname', this.getBySurname.bind(this));
    server.get('/quotes/email/:email', this.getByEmail.bind(this));
    server.get('/quotes/phone/:phone', this.getByPhone.bind(this));
    server.get('/quotes/adress/:adress', this.getByAdress.bind(this));
    server.get('/quotes/company/:company', this.getByCompany.bind(this));
    server.get('/quotes/projectDescription/:projectDescription', this.getByProjectDescription.bind(this));
    server.get('/quotes/typeOfProperty/:typeOfProperty', this.getByTypeOfProperty.bind(this));
    server.get('/quotes/surface/:surface', this.getBySurface.bind(this));
    server.get('/quotes/owner/:owner', this.getByOwner.bind(this));

    server.post('/quotes', this.createQuote.bind(this));
    server.post('/quotes/multiple', this.createMultipleQuotes.bind(this));
    server.put('/quotes/multiple', this.updateMultipleQuotes.bind(this));
    server.delete('/quotes/multiple', this.deleteMultipleQuotes.bind(this));
    server.put('/quotes/:id', this.updateQuote.bind(this));
    server.delete('/quotes/:id', this.deleteQuote.bind(this));
  }

  async getAllQuote(req: Request, res: Response): Promise<void> {
    const quotes = await this.quoteService.getAllQuotes();
    const formattedQuotes = quotes.map(quote => this.formatterService.format(quote));
    res.status(200).json(formattedQuotes);
  }

  async getQuoteById(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;
    try {
      const quote = await this.quoteService.getQuoteById(id);
      if (quote) {
        res.status(200).json(this.formatterService.format(quote));
      } else {
        res.status(404).json({ error: 'Quote not found' });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async getByName(req: Request, res: Response): Promise<void> {
    const brand = req.params.brand;
    try {
      const quotes = await this.quoteService.getByName(brand);
      res.status(200).json(quotes.map(quote => this.formatterService.format(quote)));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async getBySurname(req: Request, res: Response): Promise<void> {
    const model = req.params.model;
    try {
      const quotes = await this.quoteService.getBySurname(model);
      res.status(200).json(quotes.map(quote => this.formatterService.format(quote)));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async getByEmail(req: Request, res: Response): Promise<void> {
    const ownerId = req.params.ownerId;
    try {
      const quotes = await this.quoteService.getByEmail(ownerId);
      res.status(200).json(quotes.map(quote => this.formatterService.format(quote)));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async getByPhone(req: Request, res: Response): Promise<void> {
    const ownerId = req.params.ownerId;
    try {
      const quotes = await this.quoteService.getByPhone(ownerId);
      res.status(200).json(quotes.map(quote => this.formatterService.format(quote)));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async getByAdress(req: Request, res: Response): Promise<void> {
    const ownerId = req.params.ownerId;
    try {
      const quotes = await this.quoteService.getByAdress(ownerId);
      res.status(200).json(quotes.map(quote => this.formatterService.format(quote)));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async getByCompany(req: Request, res: Response): Promise<void> {
    const ownerId = req.params.ownerId;
    try {
      const quotes = await this.quoteService.getByCompany(ownerId);
      res.status(200).json(quotes.map(quote => this.formatterService.format(quote)));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async getByProjectDescription(req: Request, res: Response): Promise<void> {
    const ownerId = req.params.ownerId;
    try {
      const quotes = await this.quoteService.getByProjectDescription(ownerId);
      res.status(200).json(quotes.map(quote => this.formatterService.format(quote)));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async getByTypeOfProperty(req: Request, res: Response): Promise<void> {
    const ownerId = req.params.ownerId;
    try {
      const quotes = await this.quoteService.getByTypeOfProperty(ownerId);
      res.status(200).json(quotes.map(quote => this.formatterService.format(quote)));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async getBySurface(req: Request, res: Response): Promise<void> {
    const ownerId = req.params.ownerId;
    try {
      const quotes = await this.quoteService.getBySurface(ownerId);
      res.status(200).json(quotes.map(quote => this.formatterService.format(quote)));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async getByOwner(req: Request, res: Response): Promise<void> {
    const ownerId = req.params.ownerId;
    try {
      const quotes = await this.quoteService.getByOwner(ownerId);
      res.status(200).json(quotes.map(quote => this.formatterService.format(quote)));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async createQuote(req: Request, res: Response): Promise<void> {
    try {
      const parsedQuote = this.parserService.parse(req.body);
      const quote = await this.quoteService.createQuote(parsedQuote);
      res.status(201).json(this.formatterService.format(quote));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async createMultipleQuotes(req: Request, res: Response): Promise<void> {
    try {
      const parsedQuotes = req.body.map((quote: any) => this.parserService.parse(quote));
      const createdQuotes = await this.quoteService.createMultipleQuotes(parsedQuotes);
      res.status(201).json(createdQuotes.map(quote => this.formatterService.format(quote)));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async updateQuote(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;
    try {
      const body: Partial<Quote> = this.parserService.parse(req.body);
      const quote = await this.quoteService.updateQuote(id, body);
      if (quote) {
        res.status(200).json(this.formatterService.format(quote));
      } else {
        res.status(404).json({ error: 'Quote not found' });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async updateMultipleQuotes(req: Request, res: Response): Promise<void> {
    try {
      const parsedQuotes = req.body.map((quote: any) => this.parserService.parse(quote));
      const updatedQuotes = await this.quoteService.updateMultipleQuotes(parsedQuotes);
      res.status(200).json(updatedQuotes.map(quote => this.formatterService.format(quote)));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async deleteQuote(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;
    try {
      const success = await this.quoteService.deleteQuote(id);
      if (success) {
        res.status(204).send(null);
      } else {
        res.status(404).json({ error: 'Quote not found' });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async deleteMultipleQuotes(req: Request, res: Response): Promise<void> {
    try {
      const deletionResults = await this.quoteService.deleteMultipleQuotes(req.body);
      if (deletionResults.every(result => result)) {
        res.status(204).send(null);
      } else {
        res.status(400).json({ error: 'Some quotes could not be deleted' });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }
}
