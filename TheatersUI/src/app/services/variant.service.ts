import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVariant } from '../models/variant';
import { AppSettings } from '../settings/settings';

@Injectable({
  providedIn: 'root',
})
export class VariantService {
  private apiHost = AppSettings.apiHost;
  constructor(private http: HttpClient) {}

  public getAllVariants(): Observable<IVariant[]> {
    return this.http.get<IVariant[]>(`${this.apiHost}/variant`);
  }

  public addVariant(variant: IVariant): Observable<IVariant> {
    return this.http.post<IVariant>(`${this.apiHost}/variant`, variant);
  }
}
