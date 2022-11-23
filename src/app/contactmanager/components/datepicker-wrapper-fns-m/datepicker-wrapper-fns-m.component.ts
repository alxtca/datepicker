import {AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {compareAsc, format, formatISO, isValid, parse, parseISO, toDate} from 'date-fns'
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import { nb } from 'date-fns/locale';
import {MatDatepicker} from "@angular/material/datepicker";
import {DateFormatOutputFNS} from "../../models/date-formats";
import {HBDateAdapter} from "../../HBDateAdapter";

//Setting the selected date
//The type of values that the datepicker expects
// depends on the type of DateAdapter provided in your application.
//Depending on the DateAdapter being used,
// the datepicker may automatically deserialize certain date formats.
// (this will convert input string 1-1-1999 into Date object for datepicker)
// ("1/2/2017" - will not work )

export const MY_DATE_FORMATS = {
  parse: {
    // dateInput: "MM.yyyy", // den er for <input
    dateInput: ["MM.yyyy", "MM,yyyy", "MM/yyyy", ], // den er for <input

  },
  display: {
    dateInput: "MM.yyyy", // satt av <mat-datepicker
    monthYearLabel: 'yyyy MMMM',
    dateA11yLabel: 'MMMM d, y',//'LL',
    monthYearA11yLabel: 'MMMM yyyy'
  },
};

@Component({
  selector: 'app-datepicker-wrapper-fns-m',
  templateUrl: './datepicker-wrapper-fns-m.component.html',
  styleUrls: ['./datepicker-wrapper-fns-m.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: nb },
    { provide: DateAdapter, useClass: HBDateAdapter,  },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class DatepickerWrapperFnsMComponent implements OnInit {
  @Input() config: DateFormatOutputFNS = DateFormatOutputFNS["yyyy-mm-dd"];
  @Input() control!: FormControl;
  @Input() min: string  = "1900-01-01"
  @Input() max: string  = "2100-01-01"

  local_control!: FormControl;

  constructor() {  }

  ngOnInit(): void {
    this.local_control = new FormControl(this.control.value)

    this.local_control.valueChanges.subscribe(v => {
      console.log("v \n", v)

      if (isValid(v) && this.withinRange(v)){
        this.control.setValue(format(v, this.config))
        this.control.markAsDirty()
        this.control.markAsTouched()
      }
    })

  }

  withinRange(v: any):boolean {
    return (compareAsc(v,parseISO(this.min)) == 1) && (compareAsc(parseISO(this.max), v) == 1);
  }
  isCorrectFormat():boolean {
    let result = false;
    if (true) result = true;
    return result;
  }

  //when date is set with datepicker modal
  setMonthAndYear(date: any, datepicker: MatDatepicker<any>) {
    console.log(date, "-" , typeof date)
    //1. set value to control
    this.control.setValue(format(date, this.config))
    //2. set value to input.
    this.local_control.setValue(format(date, this.config))
    datepicker.close();
  }
}


