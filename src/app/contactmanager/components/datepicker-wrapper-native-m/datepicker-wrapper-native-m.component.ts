import {AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {format, formatISO, isValid, parse, parseISO} from 'date-fns'
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {DateFnsAdapter} from "@angular/material-date-fns-adapter";
import { nb } from 'date-fns/locale';
import {MatDatepicker} from "@angular/material/datepicker";
import * as moment from 'moment';
import { Moment } from 'moment';

import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {DateFormatOutputFNS} from "../../models/date-formats";

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'MM.YYYY',
  },
  display: {
    dateInput: 'MM.YYYY',
    monthYearLabel: 'YYYY MMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-datepicker-wrapper-native-m',
  templateUrl: './datepicker-wrapper-native-m.component.html',
  styleUrls: ['./datepicker-wrapper-native-m.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'nb' },
    {
      provide: DateAdapter,
      // useClass: DateFnsAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class DatepickerWrapperNativeMComponent implements OnInit, AfterViewInit {
  @Input() config: DateFormatOutputFNS = DateFormatOutputFNS["yyyy-mm-dd"];
  @Input() control!: FormControl;
  formatSelected: string = "yyyy-MM"
  date!: FormControl;

  local_date: string = "2001-10"

  constructor() {  }
  // @ViewChild('input') date_input!: HTMLInputElement;

  ngOnInit(): void {
    this.date = new FormControl(new Date())
/*    if(typeof this.control.value == "string") {
      this.local_date = format(parseISO(this.control.value), this.formatSelected)
    } else if (typeof this.control.value == "object") {
      this.local_date = format(this.control.value, this.formatSelected)
    } else {
      this.local_date = format( new Date(), this.formatSelected)
    }*/
    // this.date_input.value = "2000-10"
  }


  //$event -> input: Date
  //#input -> input: HTMLInputElement
  //  input.value - typeof string in iso format yyy-mm-dd
  dateWasChanged(input: Date) {
    console.log("dateChange: \n", input, "\n type:", typeof input)

    let formatted = format(input, this.formatSelected)
    console.log("formatted:", formatted)

    if(isValid(input)) {
      this.control.setValue(formatted)
      this.control.markAsDirty()
      this.control.markAsTouched()
    }
  }

  ngAfterViewInit() {
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<any>) {

/*    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.control.setValue(normalizedMonthAndYear.format());
    this.local_date = this.date.value*/
    datepicker.close();
  }

}
