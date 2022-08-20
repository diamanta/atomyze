import { DataSource } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { distinctUntilChanged, map, race, repeat, Subject, timer } from 'rxjs';
import { CbrRatesService } from './cbr-rates.service';
import { Valute } from './shared/interfaces/valute.interface';

const AUTO_REFRESH_INTERVAL_MS = 10000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  readonly displayedColumns: (keyof Valute)[] = ['Name', 'Value'];
  readonly refreshRates$: Subject<void> = new Subject<void>();
  readonly ratesDataSource: DataSource<Valute> = new MatTableDataSource();
  readonly columnNamesMap: Record<keyof Valute, string> = {
    CharCode: 'Букв. код',
    ID: 'ID',
    Name: 'Валюта',
    Nominal: 'Единиц',
    NumCode: 'Числ. код',
    Previous: 'Пред. курс',
    Value: 'Курс'
  }

  constructor(private cbrRates: CbrRatesService) {
    this.ratesDataSource.connect = () => this.cbrRates.getRates().pipe(
      repeat({
        delay: () => race([this.refreshRates$, timer(AUTO_REFRESH_INTERVAL_MS)]).pipe(repeat())
      }),
      distinctUntilChanged((v1, v2) => v1.Timestamp === v2.Timestamp),
      map(rates => Object.values(rates.Valute))
    );
  }

}
