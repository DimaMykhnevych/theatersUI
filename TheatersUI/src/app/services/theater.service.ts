import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { ITheater } from '../models/theater';
import { IGetTheaterParams } from '../models/theaterParams';
import { convertToHttpParams } from '../helpers/httpParamsConverter';
import { AppSettings } from '../settings/settings';

@Injectable({
  providedIn: 'root',
})
export class TheaterService {
  private baseString = AppSettings.apiHost;
  constructor(private http: HttpClient) {}

  public getTheaters(getParams: IGetTheaterParams): Observable<ITheater[]> {
    const params: HttpParams = convertToHttpParams<IGetTheaterParams>(
      getParams
    );

    return this.http.get<ITheater[]>(`${this.baseString}/theater`, { params });
  }
}
