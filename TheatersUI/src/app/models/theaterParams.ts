import { TheaterTypes } from '../enums/theaterTypes.enum';
export interface IGetTheaterParams {
  name?: string;
  type?: TheaterTypes;
  fieldToSort?: string;
  descending?: boolean;
}
