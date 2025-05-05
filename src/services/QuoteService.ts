import { QuoteRepositoryInterface } from '../repositories/QuoteRepositoryInterface';
import { Quote } from '../models/Quote';
import { QuoteServiceInterface } from './QuoteServiceInterface';

export class QuoteService implements QuoteServiceInterface {
  constructor(private carRepository: QuoteRepositoryInterface) {}

  async getAllQuotes(): Promise<Quote[]> {
    return await this.carRepository.findAll();
  }

  async getQuoteById(id: number): Promise<Quote | null> {
    return await this.carRepository.findById(id);
  }

  async getByName(name: string): Promise<Quote[]> {
    return await this.carRepository.findByName(name);
  }

  async getBySurname(surname: string): Promise<Quote[]> {
    return await this.carRepository.findByModel(surname);
  }

  async getByEmail(email: string): Promise<Quote[]> {
    return await this.carRepository.findByOwnerId(email);
  }

  async getByPhone(phone: number): Promise<Quote[]> {
    return await this.carRepository.findByYear(phone);
  }

  async getByAdress(adress: string): Promise<Quote[]> {
    return await this.carRepository.findByYear(adress);
  }

  async getByCompany(company: string): Promise<Quote[]> {
    return await this.carRepository.findByYear(company);
  }

  async getByProjectDescription(projectDescription: string): Promise<Quote[]> {
    return await this.carRepository.findByYear(projectDescription);
  }

  async getByTypeOfProperty(typeOfProperty: string): Promise<Quote[]> {
    return await this.carRepository.findByYear(typeOfProperty);
  }

  async getBySurface(surface: number): Promise<Quote[]> {
    return await this.carRepository.findByYear(surface);
  }

  async getByOwner(owner: string): Promise<Quote[]> {
    return await this.carRepository.findByOwner(owner);
  }
  private isQuoteTooOld(year: number): boolean {
    const currentYear = new Date().getFullYear();
    return currentYear - year > 20; 
  }

  async createQuote(carData: Quote): Promise<Quote> {
    if (this.isQuoteTooOld(carData.year)) {
      throw new Error(`The car with VIN ${carData.vin} is too old (over 20 years old).`);
    }

    const existingQuotes = await this.getQuoteByVin(carData.vin);
    const alreadyExistsForSameOwner = existingQuotes.some(car => car.ownerId === carData.ownerId);

    if (alreadyExistsForSameOwner) {
      throw new Error(`You already own a car with VIN ${carData.vin}.`);
    }

    return await this.carRepository.create(carData);
  }

  async createMultipleQuotes(carsData: Quote[]): Promise<Quote[]> {
    for (const carData of carsData) {
      if (this.isQuoteTooOld(carData.year)) {
        throw new Error(`The car with VIN ${carData.vin} is too old (over 20 years old).`);
      }

      const existingQuotes = await this.getQuoteByVin(carData.vin);
      const alreadyExistsForSameOwner = existingQuotes.some(car => car.ownerId === carData.ownerId);

      if (alreadyExistsForSameOwner) {
        throw new Error(`You already own a car with VIN ${carData.vin}.`);
      }
    }

    return await this.carRepository.createMultiple(carsData);
  }

  async updateQuote(id: number, carData: Quote): Promise<Quote> {
    if (this.isQuoteTooOld(carData.year)) {
      throw new Error(`The car with VIN ${carData.vin} is too old (over 20 years old).`);
    }

    const existingQuotes = await this.getQuoteByVin(carData.vin);
    const alreadyExistsForSameOwner = existingQuotes.some(car => car.ownerId === carData.ownerId && car.id !== id);

    if (alreadyExistsForSameOwner) {
      throw new Error(`You already own a car with VIN ${carData.vin}.`);
    }

    return await this.carRepository.update(id, carData);
  }

  async updateMultipleQuotes(cars: Quote[]): Promise<Quote[]> {
    for (const carData of cars) {
      if (this.isQuoteTooOld(carData.year)) {
        throw new Error(`The car with VIN ${carData.vin} is too old (over 20 years old).`);
      }

      const existingQuotes = await this.getQuoteByVin(carData.vin);
      const alreadyExistsForSameOwner = existingQuotes.some(car => car.ownerId === carData.ownerId && car.id !== carData.id);

      if (alreadyExistsForSameOwner) {
        throw new Error(`You already own a car with VIN ${carData.vin}.`);
      }
    }

    return await this.carRepository.updateMultiple(cars);
  }

  async deleteQuote(id: number): Promise<boolean> {
    return await this.carRepository.delete(id);
  }

  async deleteMultipleQuotes(ids: number[]): Promise<boolean[]> {
    return await this.carRepository.deleteMultiple(ids);
  }
  
}
