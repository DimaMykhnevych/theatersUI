import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { convertToHttpParams } from '../helpers/httpParamsConverter';
import { AppSettings } from '../settings/settings';
import { IPerformance } from '../models/performance';
import { IGetPerformanceParams } from '../models/performanceParams';

@Injectable({
  providedIn: 'root',
})
export class PerformanceService {
  private apiHost = AppSettings.apiHost;
  constructor(private http: HttpClient) {}

  public getPerformances(
    getParams: IGetPerformanceParams
  ): Observable<IPerformance[]> {
    const params: HttpParams = convertToHttpParams<IGetPerformanceParams>(
      getParams
    );

    return this.http.get<IPerformance[]>(`${this.apiHost}/performance`, {
      params,
    });
  }

  public getPerformanceById(id: number): Observable<IPerformance> {
    return this.http.get<IPerformance>(`${this.apiHost}/performance/${id}`);
  }

  public addPerformance(performance: IPerformance): Observable<IPerformance> {
    return this.http.post<IPerformance>(
      `${this.apiHost}/performance`,
      performance
    );
  }

  public updatePerformance(
    id: number,
    performance: IPerformance
  ): Observable<IPerformance> {
    return this.http.put<IPerformance>(
      `${this.apiHost}/performance/${id}`,
      performance
    );
  }

  public deletePerformance(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiHost}/performance/${id}`);
  }
}
