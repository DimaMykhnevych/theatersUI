import { PerformanceStatuses } from '../enums/performance-statuses.enum';
import { PerformanceGenres } from '../enums/performance-genres.enum';
import { ITheaterPerformance } from './theater-performance';

export interface IPerformance {
  id: number;
  name: string;
  performanceStatus: PerformanceStatuses;
  performanceGenre: PerformanceGenres;
  author: string;
  composer: string;
  theaterPerformances: ITheaterPerformance[];
}
