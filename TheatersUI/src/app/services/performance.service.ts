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
  public deletePerformance(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiHost}/performance/${id}`);
  }
}
