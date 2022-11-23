import {AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {format, formatISO, isValid, parse, parseISO} from 'date-fns'
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {DateFnsAdapter} from "@angular/material-date-fns-adapter";
import { nb } from 'date-fns/locale';
import {DateFormatOutputFNS} from "../../models/date-formats";

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: "yyyy-MM-dd", // den er for <input type="date"
  },
  display: {
    dateInput: "yyyy-MM-dd", //satt av <mat-datepicker>
    monthYearLabel: 'yyyy MMMM',
    dateA11yLabel: 'MMMM d, y',//'LL',
    monthYearA11yLabel: 'MMMM yyyy'
  },
};

@Component({
  selector: 'app-datepicker-wrapper-native',
  templateUrl: './datepicker-wrapper-native.component.html',
  styleUrls: ['./datepicker-wrapper-native.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: nb },
    {
      provide: DateAdapter,
      useClass: DateFnsAdapter,
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class DatepickerWrapperNativeComponent implements OnInit, AfterViewInit {
  @Input() config: DateFormatOutputFNS = DateFormatOutputFNS["yyyy-mm-dd"];
  @Input() control!: FormControl;
  @Input() input_type: string = "date"
  formatSelected: string = "yyyy-MM-dd"

  local_date!: string

  constructor() {  }

  ngOnInit(): void {
    if(typeof this.control.value == "string") {
      this.local_date = format(parseISO(this.control.value), this.formatSelected)
    } else if (typeof this.control.value == "object") {
      this.local_date = format(this.control.value, this.formatSelected)
    } else {
      this.local_date = format( new Date(), this.formatSelected)
    }
  }


  //$event -> input: Date
  //#input -> input: HTMLInputElement
  //  input.value - typeof string in iso format yyyy-mm-dd
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

}


