import { IOrder } from '../models/order';
import { IUserAnswer } from './user-answer';

export interface IUser {
  id: number;
  fullName: number;
  birthDate: Date;
  email: string;
  telephoneNumber: string;
  orders: IOrder[];
  userAnswers: IUserAnswer[];
}
