import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rates } from './shared/interfaces/rates.interface';

@Injectable({
  providedIn: 'root'
})
export class CbrRatesService {

  private readonly cbrUrl = 'https://www.cbr-xml-daily.ru/daily_json.js';

  constructor(private http: HttpClient) { }

  public getRates(): Observable<Rates> {
    return this.http.get<Rates>(this.cbrUrl);
  }

}
