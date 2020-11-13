import { IVariant } from '../models/variant';
export interface IQuestion {
  id: number;
  text: string;
  variants: IVariant[];
}
