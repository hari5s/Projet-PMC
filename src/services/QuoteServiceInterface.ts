import { Quote } from '../models/Quote';

export interface QuoteServiceInterface {
  getAllQuotes(): Promise<Quote[]>; 
  getQuoteById(id: number): Promise<Quote | null>; 
  getByName(brand: string): Promise<Quote[]>; 
  getBySurname(model: string): Promise<Quote[]>; 
  getByEmail(ownerId: string): Promise<Quote[]>; 
  getByPhone(year: number): Promise<Quote[]>; 
  getByAdress(vin: string): Promise<Quote[]>; 
  getByCompany(vin: string): Promise<Quote[]>; 
  getByProjectDescription(vin: string): Promise<Quote[]>; 
  getByTypeOfProperty(vin: string): Promise<Quote[]>; 
  getBySurface(vin: number): Promise<Quote[]>; 
  getByOwner(vin: string): Promise<Quote[]>; 
  createQuote(carData: Partial<Quote>): Promise<Quote>; 
  createMultipleQuotes(carsData: Quote[]): Promise<Quote[]>;  
  updateQuote(id: number, carData: Partial<Quote>): Promise<Quote | null>; 
  updateMultipleQuotes(carsData: Quote[]): Promise<Quote[]>;  
  deleteQuote(id: number): Promise<boolean>; 
  deleteMultipleQuotes(ids: number[]): Promise<boolean[]>;  
}
