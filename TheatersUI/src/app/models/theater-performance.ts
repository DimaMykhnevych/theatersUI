import { ITheater } from '../models/theater';
import { IPerformance } from '../models/performance';
import { IOrder } from './order';

export interface ITheaterPerformance {
  id: number;
  theaterId: number;
  performanceId: number;
  performanceDate: Date;
  ticketPrice: number;
  theater: ITheater;
  performance: IPerformance;
  // orders: IOrder[];
}
