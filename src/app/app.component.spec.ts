import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { Valute } from './interfaces/valute.interface';
import { valuteResponseMock } from './mocks/valute-response.mock';
import { CalculateExchangePipe } from './pipes/calculate-exchange.pipe';
import { CbrRatesService } from './services/cbr-rates.service';

@Injectable()
class MockCbrService extends CbrRatesService {
  override getValute(): Observable<Valute[]> {
    return of(valuteResponseMock);
  }
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;
  let mockCbrService: MockCbrService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        CalculateExchangePipe
      ],
      providers: [
        {
          provide: CbrRatesService,
          useClass: MockCbrService
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    mockCbrService = TestBed.inject(CbrRatesService)
    appComponent = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

  it('should render table', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div.container .rates-table')).toBeTruthy();
  });

  it('should render table header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const header = compiled.querySelector('div.container .rates-table .rates-table-header')
    expect(header).toBeTruthy();
    expect(header?.childElementCount).toEqual(appComponent.displayedColumns.length);
    appComponent.displayedColumns.forEach((column, idx) => {
      expect(header?.children.item(idx)?.textContent).toEqual(appComponent.columnNamesMap[column]);
    })
  })

  it('should render table input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('div.container .rates-table .rates-table-header .exchange-input');
    expect(input).toBeTruthy();
  })

  it('should render rows', async () => {
    const tableComponent = fixture.debugElement.query(By.css('mat-table'));
    await fixture.whenRenderingDone();
    expect(tableComponent.queryAll(By.css('mat-row')).length).toEqual(valuteResponseMock.length);
  })

});
