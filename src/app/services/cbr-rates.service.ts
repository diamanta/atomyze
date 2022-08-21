import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, distinctUntilChanged, map, Observable, of } from 'rxjs';
import { Rates } from '../interfaces/rates.interface';
import { Valute } from '../interfaces/valute.interface';

@Injectable({
  providedIn: 'root'
})
export class CbrRatesService {

  private valuteCache: Valute[] = [];
  private readonly cbrUrl = 'https://www.cbr-xml-daily.ru/daily_json.js';

  constructor(private http: HttpClient) { }

  getValute(): Observable<Valute[]> {
    return this.http.get<Rates>(this.cbrUrl).pipe(
      distinctUntilChanged((rates1, rates2) => rates1.Timestamp === rates2.Timestamp),
      map(rates => {
        this.valuteCache = Object.values(rates.Valute)
        return this.valuteCache;
      }),
      catchError(() => of(this.valuteCache))
    );
  }

}
