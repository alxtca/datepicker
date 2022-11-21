import {Injectable} from '@angular/core';
import {DateFnsAdapter} from "@angular/material-date-fns-adapter";

@Injectable()
export class HBDateAdapter extends DateFnsAdapter {

  override parse(value: any, parseFormat: string | string[]): Date | null {

    let parse_result = super.parse(value, parseFormat)

    if(isNaN(<number>parse_result?.valueOf())) {
      let new_parse_format = "dd/MM/yyyy"
      let new_parse_result = super.parse(value, new_parse_format)
      if(!isNaN(<number>new_parse_result?.valueOf())) {
        return super.parse(value, new_parse_format);
      }
    }

    if(isNaN(<number>parse_result?.valueOf())) {
      let new_parse_format = "dd,MM,yyyy"
      let new_parse_result = super.parse(value, new_parse_format)
      if(!isNaN(<number>new_parse_result?.valueOf())) {
        return super.parse(value, new_parse_format);
      }
    }

    return super.parse(value, parseFormat);
  }

}
