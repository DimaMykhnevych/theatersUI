import { TheaterTypes } from '../enums/theaterTypes.enum';
export interface ITheaterAttendance {
  id: number;
  name: string;
  theaterType: TheaterTypes;
  attendanceAmount: number;
}
