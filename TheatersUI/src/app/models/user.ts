import { IOrder } from '../models/order';
import { IUserAnswer } from './user-answer';

export interface IUser {
  id: number;
  fullName: string;
  birthDate: Date;
  email: string;
  telephoneNumber: string;
  // orders: IOrder[];
  // userAnswers: IUserAnswer[];
}
