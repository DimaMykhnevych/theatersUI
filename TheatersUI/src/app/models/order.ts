import { ITheaterPerformance } from '../models/theater-performance';
import { IUser } from './user';
export interface IOrder {
  id: number;
  userId: number;
  theaterPerformanceId: number;
  ticketsAmount: number;
  user: IUser;
  theaterPerformance: ITheaterPerformance;
}
