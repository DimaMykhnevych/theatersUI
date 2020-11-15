import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { convertToHttpParams } from '../helpers/httpParamsConverter';
import { AppSettings } from '../settings/settings';
import { ITheaterPerformance } from '../models/theater-performance';
import { ITheaterPerformanceParams } from '../models/theater-performance-params';
import { IAddUpdateTheaterPerformance } from '../models/add-update-theater-perf';

@Injectable({
  providedIn: 'root',
})
export class TheaterPerformanceService {
  private apiHost = AppSettings.apiHost;
  constructor(private http: HttpClient) {}

  public GetTheaterPerformances(
    getParams: ITheaterPerformanceParams
  ): Observable<ITheaterPerformance[]> {
    const params: HttpParams = convertToHttpParams<ITheaterPerformanceParams>(
      getParams
    );
    return this.http.get<ITheaterPerformance[]>(
      `${this.apiHost}/theaterPerformance`,
      { params }
    );
  }

  public getTheaterPerformanceById(
    id: number
  ): Observable<ITheaterPerformance> {
    return this.http.get<ITheaterPerformance>(
      `${this.apiHost}/theaterPerformance/${id}`
    );
  }

  public addTheaterPerformance(
    tp: IAddUpdateTheaterPerformance
  ): Observable<IAddUpdateTheaterPerformance> {
    return this.http.post<IAddUpdateTheaterPerformance>(
      `${this.apiHost}/theaterPerformance`,
      tp
    );
  }

  public updateTheaterPerformance(
    id: number,
    tp: IAddUpdateTheaterPerformance
  ): Observable<IAddUpdateTheaterPerformance> {
    return this.http.put<IAddUpdateTheaterPerformance>(
      `${this.apiHost}/theaterPerformance/${id}`,
      tp
    );
  }

  public deleteTheaterPerformance(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.apiHost}/theaterPerformance/${id}`
    );
  }
}
