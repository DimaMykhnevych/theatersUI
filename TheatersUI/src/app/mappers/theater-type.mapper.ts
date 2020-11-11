import { TheaterTypes } from '../enums/theaterTypes.enum';
export class TheaterTypeMapper {
  public static typeDictionary = {
    [TheaterTypes.OperaAndBallet]: 'Театр оперы и балета',
    [TheaterTypes.Musical]: 'Музыкальный',
    [TheaterTypes.Philharmonic]: 'Филармония',
    [TheaterTypes.Youth]: 'Молодежный',
    [TheaterTypes.Dramatic]: 'Драматический',
    [TheaterTypes.Authors]: 'Авторский',
    [TheaterTypes.Childish]: 'Детский',
    [TheaterTypes.Puppet]: 'Кукольный',
    [TheaterTypes.TheaterSchool]: 'Школа-театр',
    [TheaterTypes.Comedy]: 'Комедийный',
    [TheaterTypes.TheaterCafe]: 'Театр-кафе',
    [TheaterTypes.StageAnimation]: 'Сценической анимаци',
    [TheaterTypes.TheaterStudio]: 'Театр-студия',
  };
  public static getTypeString(typeNumber: TheaterTypes): string {
    return this.typeDictionary[typeNumber];
  }
}
