import { IUser } from '../models/user';
import { IVariant } from './variant';

export interface IUserAnswer {
  id: number;
  userId: number;
  variantId: number;
  user: IUser;
  variant: IVariant;
}
