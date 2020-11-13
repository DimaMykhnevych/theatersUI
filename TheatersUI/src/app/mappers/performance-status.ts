import { PerformanceStatuses } from '../enums/performance-statuses.enum';

export class PerformanceStatusMapper {
  public static statusDictionary = {
    [PerformanceStatuses.ok]: 'В прокате',
    [PerformanceStatuses.postponed]: 'Перенесено',
    [PerformanceStatuses.canceled]: 'Отменено',
  };
  public static getStatusString(statusNumber: PerformanceStatuses): string {
    return this.statusDictionary[statusNumber];
  }
}
