import {Injectable} from '@angular/core';
import {DateFnsAdapter} from "@angular/material-date-fns-adapter";
import {parse} from "date-fns";

@Injectable()
export class HBDateAdapter extends DateFnsAdapter {

  //this parses date from input field
  override parse(value: any, parseFormat: string | string[]): Date | null {
    if (typeof value == 'string' && value.length > 0) {
      if (!parseFormat.length) throw Error('Formats array must not be empty.');

      for (const currentFormat of parseFormat) {
        const fromFormat = parse(value, currentFormat, new Date(), {locale: this.locale});

        if (this.isValid(fromFormat)) {
          return fromFormat;
        }
      }

      return this.invalid();
    } else if (typeof value === 'number') {
      return new Date(value);
    } else if (value instanceof Date) {
      return this.clone(value);
    }

    return null;
  }
}

//other functions to look into:
//-deserialize
//-format

// date-fns implementation of parse in DateFnsAdapter
/*
https://github.com/angular/components/blob/2f9a59a24c0464cbed7f54cbeb5cba73e6007715/src/material-date-fns-adapter/adapter/date-fns-adapter.ts
}*/
