import {AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {compareAsc, format, formatISO, isValid, parse, parseISO, toDate} from 'date-fns'
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import { nb } from 'date-fns/locale';
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
    dateInput: ["dd.MM.yyyy", "dd/MM/yyyy", "dd,MM,yyyy"], // to accept different input styles from user
  },
  display: {
    dateInput: "dd.MM.yyyy", // display format in input field
    monthYearLabel: 'yyyy MMMM',
    dateA11yLabel: 'MMMM d, y',//'LL',
    monthYearA11yLabel: 'MMMM yyyy'
  },
};

@Component({
  selector: 'app-datepicker-wrapper-fns',
  templateUrl: './datepicker-wrapper-fns.component.html',
  styleUrls: ['./datepicker-wrapper-fns.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: nb },
    { provide: DateAdapter, useClass: HBDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class DatepickerWrapperFnsComponent implements OnInit {
  @Input() config: DateFormatOutputFNS = DateFormatOutputFNS["yyyy-mm-dd"];
  @Input() control!: FormControl;
  @Input() min: string  = "1900-01-01" //any in design, ok for datepicker, men ikke for parseISO (kan bygge omvei)
  @Input() max: string  = "2100-01-01"

  local_control!: FormControl;

  constructor() {  }

  ngOnInit(): void {

    //hvorfor trenger jeg local_control:
    //-datepicker trenger ikke, da den kan bli configurert til å kunne velge bare dato som er tillat
    //-manual input må sjekkes om den er innenfor dato interval etc

    this.local_control = new FormControl(this.control.value)

    this.local_control.valueChanges.subscribe(v => {

      if (isValid(v)){ //to avoid sending output as user type into input field
        if (this.withinRange(v)){ // add you validation logic as you like
          this.control.setValue(format(v, this.config))
          this.control.markAsDirty()
          this.control.markAsTouched()
        }
      }

    })
  }

  //den virker prosjektspesifikk,
  //men her må det være samme sjekk som i datepickeren
  withinRange(v: Date):boolean {
    let result = false;
    if (compareAsc(v,parseISO(this.min)) == 1) result = true;
    return result;
  }
  isCorrectFormat():boolean {
    let result = false;
    if (true) result = true;
    return result;
  }
}
