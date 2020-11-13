import { PerformanceStatuses } from '../enums/performance-statuses.enum';
import { PerformanceGenres } from '../enums/performance-genres.enum';

export interface IGetPerformanceParams {
  name?: string;
  author?: string;
  composer?: string;
  fieldToSort?: string;
  descending?: boolean;
  status?: PerformanceStatuses;
  genre?: PerformanceGenres;
}
