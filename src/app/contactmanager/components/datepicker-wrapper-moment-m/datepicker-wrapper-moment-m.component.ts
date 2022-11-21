import {AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MatDatepicker} from "@angular/material/datepicker";
import * as moment from 'moment';
import { Moment } from 'moment';
import {format, formatISO, isValid, parse, toDate} from 'date-fns'

import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {DateFormatOutputMoment} from "../../models/date-formats";

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
  selector: 'app-datepicker-wrapper-moment-m',
  templateUrl: './datepicker-wrapper-moment-m.component.html',
  styleUrls: ['./datepicker-wrapper-moment-m.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'nb' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class DatepickerWrapperMomentMComponent implements OnInit {
  @Input() config: DateFormatOutputMoment = DateFormatOutputMoment["yyyy-mm-dd"];
  @Input() control!: FormControl;
  local_control!: FormControl;

  constructor() {  }

/*  ngOnInit(): void {
    //sounds like infinite loop:
    this.locale_date = new FormControl(this.control.value)
    this.locale_date.valueChanges.subscribe(v => {
      //check if valid, then save
      console.log(format(v, "yyyy-MM-dd"))
      //this.control.setValue(v.format(this.config))
      if (isValid(v)){
        this.control.setValue(format(v, "yyyy-MM-dd"))
        this.control.markAsDirty()
        this.control.markAsTouched()
      }
    })
  }*/

  ngOnInit(): void {
    this.local_control = new FormControl(this.control.value)

    this.local_control.valueChanges.subscribe(v => {
      let parsed = moment(v, 'DD.MM.YYYY', true);
      console.log("PARSED:" , parsed)
      let formatted = parsed.format('YYYY-MM-DD')
      console.log("FORMATED:" , formatted)
      this.control.setValue(formatted)
    })
  }

  //when date is set through input

  //when date is set with datepicker modal
  setMonthAndYear(date: Moment, datepicker: MatDatepicker<any>) {
    console.log(date, "-" , typeof date)
    //1. set value to control
    this.control.setValue(date.format(this.config))
    //2. set value to input.
    this.local_control.setValue(date.format(this.config))
    datepicker.close();
  }

}
