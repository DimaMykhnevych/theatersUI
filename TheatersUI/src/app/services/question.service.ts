import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../settings/settings';
import { IQuestion } from '../models/question';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiHost = AppSettings.apiHost;
  constructor(private http: HttpClient) {}

  public getAllQuestions(): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(`${this.apiHost}/question`);
  }
}
