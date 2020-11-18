import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';
import { AppSettings } from '../settings/settings';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiHost = AppSettings.apiHost;
  constructor(private http: HttpClient) {}

  public getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiHost}/user/${id}`);
  }

  public addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiHost}/user`, user);
  }
}
