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
  private apiHost = AppSettings.apiHost;
  constructor(private http: HttpClient) {}

  public getTheaters(getParams: IGetTheaterParams): Observable<ITheater[]> {
    const params: HttpParams = convertToHttpParams<IGetTheaterParams>(
      getParams
    );

    return this.http.get<ITheater[]>(`${this.apiHost}/theater`, { params });
  }

  public getTheaterById(id: number): Observable<ITheater> {
    return this.http.get<ITheater>(`${this.apiHost}/theater/${id}`);
  }

  public addTheaters(theater: ITheater): Observable<ITheater> {
    return this.http.post<ITheater>(`${this.apiHost}/theater`, theater);
  }

  public deleteTheater(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiHost}/theater/${id}`);
  }
}
