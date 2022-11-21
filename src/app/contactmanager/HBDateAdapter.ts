import {Injectable} from '@angular/core';
import {DateAdapter} from '@angular/material/core';
import {addDays, addMonths, addYears, format, getDate, getDaysInMonth, getMonth, getYear, parse, setDay, setMonth, toDate} from 'date-fns';

// CONFIG. Use environment or something for a dynamic locale and settings

import {es as locale} from 'date-fns/locale';
import {DateFnsAdapter} from "@angular/material-date-fns-adapter";
const WEEK_STARTS_ON = 1; // 0 sunday, 1 monday...

export const MAT_DATE_FNS_DATE_FORMATS = {
  parse: {
    dateInput: 'dd/MM/yyyy',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'LLL y',
    dateA11yLabel: 'MMMM d, y',
    monthYearA11yLabel: 'MMMM y',
  }
};

// in app.module.ts:
/*
{
  provide: DateAdapter,
  useClass: HBDateAdapter
},
{
  provide: MAT_DATE_FORMATS,
  useValue: MAT_DATE_FNS_DATE_FORMATS
},
 */

function range(start: number, end: number): number[] {
  let arr: number[] = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }

  return arr;
}

@Injectable()
export class HBDateAdapter extends DateFnsAdapter {

  //object to string
  //format

  //string to object
  //parse

  //string to string (with different format)
  //parse -> format

  //parse for input, format for output?

  //what I need is to parse like non-strict moment.js

  //moment.js implementation of parse
/*  override parse(value: any, parseFormat: string | string[]): Moment | null {
    if (value && typeof value == 'string') {
      return this._createMoment(value, parseFormat, this.locale);
    }
    return value ? this._createMoment(value).locale(this.locale) : null;
  }*/

  //date-fns implementation of format
/*  override format(date: Date, displayFormat: string): string {
    if (!this.isValid(date)) {
      throw Error('DateFnsAdapter: Cannot format invalid date.');
    }
    return format(date, displayFormat, {locale: this.locale});
  }*/

  //moment implementation of format
/*  format(date: Moment, displayFormat: string): string {
    date = this.clone(date);
    if (!this.isValid(date) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
      throw Error('MomentDateAdapter: Cannot format invalid date.');
    }
    return date.format(displayFormat);
  }*/


}
