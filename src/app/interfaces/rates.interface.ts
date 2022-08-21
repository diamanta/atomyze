import { Valute } from './valute.interface';

export interface Rates {
  Date: Date;
  PreviousDate: Date;
  PreviousURL: string;
  Timestamp: Date;
  Valute: Record<string, Valute>;
}
