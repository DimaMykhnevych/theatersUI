import { PerformanceGenres } from '../enums/performance-genres.enum';
export interface IPerformanceAttendance {
  id: number;
  name: string;
  performanceGenre: PerformanceGenres;
  author: string;
  attendanceAmount: number;
}
