import { PerformanceGenres } from '../enums/performance-genres.enum';

export class PerformanceGenreMapper {
  public static genreDictionary = {
    [PerformanceGenres.BalletSuite]: 'Балетная сюита',
    [PerformanceGenres.Comedy]: 'Комедия',
    [PerformanceGenres.Concert]: 'Концерт',
    [PerformanceGenres.DanceShow]: 'Танцевальное шоу',
    [PerformanceGenres.Detective]: 'Детектив',
    [PerformanceGenres.Drama]: 'Драма',
    [PerformanceGenres.FairyTale]: 'Сказка',
    [PerformanceGenres.Fiaba]: 'Фьяба',
    [PerformanceGenres.LyricExtravaganza]: 'Лиричкская феерия',
    [PerformanceGenres.Melodrama]: 'Мелодрама',
    [PerformanceGenres.Musical]: 'Мюзикл',
    [PerformanceGenres.Novel]: 'Роман',
    [PerformanceGenres.Opera]: 'Опера',
    [PerformanceGenres.Operetta]: 'Оперетта',
    [PerformanceGenres.PerformanceParable]: 'Спектакль-притча',
    [PerformanceGenres.Phantasmagoria]: 'Фантасмагория',
    [PerformanceGenres.Play]: 'Пьеса',
    [PerformanceGenres.RockOpera]: 'Рок-опера',
    [PerformanceGenres.SatiricalComedy]: 'Сатирическая комедия',
    [PerformanceGenres.ScienceFiction]: 'Научная фантастика',
    [PerformanceGenres.Spectacle]: 'Спектакль',
    [PerformanceGenres.Tragedy]: 'Трагедия',
  };

  public static getGenreString(genreNumber: PerformanceGenres): string {
    return this.genreDictionary[genreNumber];
  }
}
