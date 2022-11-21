import {AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {format, formatISO, isValid, parse, parseISO, toDate} from 'date-fns'
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {DateFnsAdapter} from "@angular/material-date-fns-adapter";
import { nb } from 'date-fns/locale';
import {DateFormatOutputFNS} from "../../models/date-formats";

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: "yyyy-MM-dd", // den er for <input type="date"
  },
  display: {
    dateInput: "dd.MM.yyyy", //dato input felt formatering satt av <mat-datepicker
    monthYearLabel: 'yyyy MMMM',
    dateA11yLabel: 'MMMM d, y',//'LL',
    monthYearA11yLabel: 'MMMM yyyy'
  },
};

@Component({
  selector: 'app-datepicker-wrapper-mask-ngx',
  templateUrl: './datepicker-wrapper-mask-ngx.component.html',
  styleUrls: ['./datepicker-wrapper-mask-ngx.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: nb },
    {
      provide: DateAdapter,
      useClass: DateFnsAdapter,
      // useClass: HBDateAdapter, //are these the methods called by datepicker? seem so.
      //deps: [MAT_DATE_LOCALE]
      // deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS], //optional, locale is already provided
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class DatepickerWrapperMaskNgxComponent implements OnInit, AfterViewInit {
  @Input() config: DateFormatOutputFNS = DateFormatOutputFNS["yyyy-mm-dd"];
  @Input() control!: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('input', { read: ElementRef }) inputElement!: ElementRef<HTMLInputElement>;
  ngAfterViewInit() {
    if (this.control.value) {
      this.inputElement.nativeElement.value = this.control.value;
    }
  }

  dateWasChanged(input: HTMLInputElement) {
    let parsed = parse(input.value, "dd.MM.yyyy", 0)
    //to parse anything, can try parse format1, if parsed = invalid value, try parse format2 etc...

    if(isValid(parsed)) {
      this.control.setValue(format(parsed, this.config))
      this.control.markAsDirty()
      this.control.markAsTouched()
    }
  }
}
