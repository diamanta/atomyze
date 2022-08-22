import { DataSource } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { race, repeat, Subject, timer } from 'rxjs';
import { Valute } from './interfaces/valute.interface';
import { CbrRatesService } from './services/cbr-rates.service';

const AUTO_REFRESH_INTERVAL_MS = 10000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  amountToExchange: number | undefined;

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
    this.ratesDataSource.connect = () => this.cbrRates.getValute().pipe(
      repeat({
        delay: () => race([this.refreshRates$, timer(AUTO_REFRESH_INTERVAL_MS)]).pipe(repeat())
      })
    );
  }

}
