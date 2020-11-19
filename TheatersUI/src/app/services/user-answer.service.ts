import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../settings/settings';
import { Observable } from 'rxjs';
import { IUserAnswer } from '../models/user-answer';

@Injectable({
  providedIn: 'root',
})
export class UserAnswerService {
  private apiHost = AppSettings.apiHost;
  constructor(private http: HttpClient) {}

  public addUserAnswer(answers: IUserAnswer[]): Observable<IUserAnswer[]> {
    return this.http.post<IUserAnswer[]>(`${this.apiHost}/userAnswer`, answers);
  }
}
