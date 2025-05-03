import { ControllerInterface } from './ControllerInterface';
import { ServerAdapterInterface } from '../server/ServerAdapterInterface';
import { CarServiceInterface } from '../services/CarServiceInterface';
import { Request, Response } from '../types/http';
import { Car } from '../models/Car';
import { FormatterServiceInterface } from '../services/FormatterServiceInterface';
import { ParserServiceInterface } from '../services/ParserServiceInterface';

export class CarController implements ControllerInterface {
  constructor(
    private carService: CarServiceInterface,
    private parserService: ParserServiceInterface,
    private formatterService: FormatterServiceInterface
  ) {}

  registerRoutes(server: ServerAdapterInterface): void {
    server.get('/cars', this.getAllCars.bind(this));
    server.get('/cars/:id', this.getCarById.bind(this));
    server.get('/cars/brand/:brand', this.getByBrand.bind(this));
    server.get('/cars/model/:model', this.getByModel.bind(this));
    server.get('/cars/owner/:ownerId', this.getByOwnerId.bind(this));
    server.get('/cars/year/:year', this.getByYear.bind(this));
    server.get('/cars/vin/:vin', this.getByVin.bind(this));
    server.post('/cars', this.createCar.bind(this));
    server.post('/cars/multiple', this.createMultipleCars.bind(this));
    server.put('/cars/multiple', this.updateMultipleCars.bind(this));
    server.delete('/cars/multiple', this.deleteMultipleCars.bind(this));
    server.put('/cars/:id', this.updateCar.bind(this));
    server.delete('/cars/:id', this.deleteCar.bind(this));
  }

  async getAllCars(req: Request, res: Response): Promise<void> {
    const cars = await this.carService.getAllCars();
    const formattedCars = cars.map(car => this.formatterService.format(car));
    res.status(200).json(formattedCars);
  }

  async getCarById(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;
    try {
      const car = await this.carService.getCarById(id);
      if (car) {
        res.status(200).json(this.formatterService.format(car));
      } else {
        res.status(404).json({ error: 'Car not found' });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async getByBrand(req: Request, res: Response): Promise<void> {
    const brand = req.params.brand;
    try {
      const cars = await this.carService.getByBrand(brand);
      res.status(200).json(cars.map(car => this.formatterService.format(car)));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async getByModel(req: Request, res: Response): Promise<void> {
    const model = req.params.model;
    try {
      const cars = await this.carService.getByModel(model);
      res.status(200).json(cars.map(car => this.formatterService.format(car)));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async getByOwnerId(req: Request, res: Response): Promise<void> {
    const ownerId = req.params.ownerId;
    try {
      const cars = await this.carService.getByOwnerId(ownerId);
      res.status(200).json(cars.map(car => this.formatterService.format(car)));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async getByYear(req: Request, res: Response): Promise<void> {
    const year = +req.params.year;
    try {
      const cars = await this.carService.getByYear(year);
      res.status(200).json(cars.map(car => this.formatterService.format(car)));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async getByVin(req: Request, res: Response): Promise<void> {
    const vin = req.params.vin;
    try {
      const cars = await this.carService.getCarByVin(vin);
      res.status(200).json(cars.map(car => this.formatterService.format(car)));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async createCar(req: Request, res: Response): Promise<void> {
    try {
      const parsedCar = this.parserService.parse(req.body);
      const car = await this.carService.createCar(parsedCar);
      res.status(201).json(this.formatterService.format(car));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async createMultipleCars(req: Request, res: Response): Promise<void> {
    try {
      const parsedCars = req.body.map((car: any) => this.parserService.parse(car));
      const createdCars = await this.carService.createMultipleCars(parsedCars);
      res.status(201).json(createdCars.map(car => this.formatterService.format(car)));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async updateCar(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;
    try {
      const body: Partial<Car> = this.parserService.parse(req.body);
      const car = await this.carService.updateCar(id, body);
      if (car) {
        res.status(200).json(this.formatterService.format(car));
      } else {
        res.status(404).json({ error: 'Car not found' });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async updateMultipleCars(req: Request, res: Response): Promise<void> {
    try {
      const parsedCars = req.body.map((car: any) => this.parserService.parse(car));
      const updatedCars = await this.carService.updateMultipleCars(parsedCars);
      res.status(200).json(updatedCars.map(car => this.formatterService.format(car)));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async deleteCar(req: Request, res: Response): Promise<void> {
    const id = +req.params.id;
    try {
      const success = await this.carService.deleteCar(id);
      if (success) {
        res.status(204).send(null);
      } else {
        res.status(404).json({ error: 'Car not found' });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }

  async deleteMultipleCars(req: Request, res: Response): Promise<void> {
    try {
      const deletionResults = await this.carService.deleteMultipleCars(req.body);
      if (deletionResults.every(result => result)) {
        res.status(204).send(null);
      } else {
        res.status(400).json({ error: 'Some cars could not be deleted' });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ error: errorMessage });
    }
  }
}
