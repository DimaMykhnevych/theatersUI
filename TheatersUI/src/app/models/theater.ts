import { TheaterTypes } from '../enums/theaterTypes.enum';
import { IAddress } from './address';
export interface ITheater {
  id: number;
  name: string;
  theaterType: TheaterTypes;
  addressId: number;
  address: IAddress;
}
