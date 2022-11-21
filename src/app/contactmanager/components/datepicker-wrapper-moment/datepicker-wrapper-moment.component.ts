import {Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import * as moment from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {DateFormatOutputMoment} from "../../models/date-formats";

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'YYYY MMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}

@Component({
  selector: 'app-datepicker-wrapper-moment',
  templateUrl: './datepicker-wrapper-moment.component.html',
  styleUrls: ['./datepicker-wrapper-moment.component.scss'],
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
export class DatepickerWrapperMomentComponent implements OnInit {
  @Input() config: DateFormatOutputMoment = DateFormatOutputMoment["yyyy-mm-dd"];
  @Input() control!: FormControl;

  local_control!: FormControl;
  //WHY do I have local control???
  // - to format according to config - no other way?

  constructor() {  }

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
}

