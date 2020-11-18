import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { convertToHttpParams } from '../helpers/httpParamsConverter';
import { AppSettings } from '../settings/settings';
import { ITheaterPerformance } from '../models/theater-performance';
import { ITheaterPerformanceParams } from '../models/theater-performance-params';
import { IAddUpdateTheaterPerformance } from '../models/add-update-theater-perf';
import { ITheaterAttendance } from '../models/theater-attendance';
import { IPerformanceAttendance } from '../models/performance-attendance';
import { IPopularGenres } from '../models/popular-genres';
import { IPopularAuthors } from '../models/popular-authors';
import { IPopularComposers } from '../models/popular-composers';
import { ITicketSales } from '../models/ticket-sales';

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

  public getTheaterAttendance(): Observable<ITheaterAttendance[]> {
    return this.http.get<ITheaterAttendance[]>(
      `${this.apiHost}/theaterPerformance/attendanceTheaters`
    );
  }

  public getMostPopularTheaters(): Observable<ITheaterAttendance[]> {
    return this.http.get<ITheaterAttendance[]>(
      `${this.apiHost}/theaterPerformance/mostPopularTheaters`
    );
  }

  public getMostUnpopularTheaters(): Observable<ITheaterAttendance[]> {
    return this.http.get<ITheaterAttendance[]>(
      `${this.apiHost}/theaterPerformance/mostUnpopularTheaters`
    );
  }

  public getPerformanceAttendance(): Observable<IPerformanceAttendance[]> {
    return this.http.get<IPerformanceAttendance[]>(
      `${this.apiHost}/theaterPerformance/attendancePerformances`
    );
  }

  public getMostPopularPerformances(): Observable<IPerformanceAttendance[]> {
    return this.http.get<IPerformanceAttendance[]>(
      `${this.apiHost}/theaterPerformance/mostPopularPerformances`
    );
  }

  public getMostUnpopularPerformances(): Observable<IPerformanceAttendance[]> {
    return this.http.get<IPerformanceAttendance[]>(
      `${this.apiHost}/theaterPerformance/mostUnpopularPerformances`
    );
  }

  public getPopularGenres(): Observable<IPopularGenres[]> {
    return this.http.get<IPopularGenres[]>(
      `${this.apiHost}/theaterPerformance/popularGenres`
    );
  }

  public getPopularAuthors(): Observable<IPopularAuthors[]> {
    return this.http.get<IPopularAuthors[]>(
      `${this.apiHost}/theaterPerformance/popularAuthors`
    );
  }

  public getPopularComposers(): Observable<IPopularComposers[]> {
    return this.http.get<IPopularComposers[]>(
      `${this.apiHost}/theaterPerformance/popularComposers`
    );
  }

  public getTicketSales(
    getParams: ITheaterPerformanceParams
  ): Observable<ITicketSales[]> {
    const params: HttpParams = convertToHttpParams<ITheaterPerformanceParams>(
      getParams
    );
    return this.http.get<ITicketSales[]>(
      `${this.apiHost}/theaterPerformance/ticketSales`,
      {
        params,
      }
    );
  }

  public getActiveTheaterPerformances(): Observable<ITheaterPerformance[]> {
    return this.http.get<ITheaterPerformance[]>(
      `${this.apiHost}/theaterPerformance/activeTheaterPerformances`
    );
  }

  public getCanceledTheaterPerformances(): Observable<ITheaterPerformance[]> {
    return this.http.get<ITheaterPerformance[]>(
      `${this.apiHost}/theaterPerformance/canceledTheaterPerformances`
    );
  }

  public getPosponedTheaterPerformances(): Observable<ITheaterPerformance[]> {
    return this.http.get<ITheaterPerformance[]>(
      `${this.apiHost}/theaterPerformance/postponedTheaterPerformances`
    );
  }

  public getTheaterPerformanceById(
    id: number
  ): Observable<ITheaterPerformance> {
    return this.http.get<ITheaterPerformance>(
      `${this.apiHost}/theaterPerformance/${id}`
    );
  }

  public getPerformancesByTheaterId(
    id: number
  ): Observable<ITheaterPerformance[]> {
    return this.http.get<ITheaterPerformance[]>(
      `${this.apiHost}/theaterPerformance/performanceByTheater/${id}`
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
