import { PerformanceGenres } from '../enums/performance-genres.enum';
export interface IPopularGenres {
  id: number;
  performanceGenre: PerformanceGenres;
  attendanceAmount: number;
}
