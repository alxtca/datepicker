import {AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {format, formatISO, isValid, parse, toDate} from 'date-fns'
import * as moment from 'moment';

import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter} from "@angular/material/core";
import {DateFnsAdapter} from "@angular/material-date-fns-adapter";

//Setting the selected date (applicable for formControl directive?)
//The type of values that the datepicker expects
// depends on the type of DateAdapter provided in your application.
//Depending on the DateAdapter being used,
// the datepicker may automatically deserialize certain date formats.
// (this will convert input string 1-1-1999 into Date object for datepicker)
// ("1/2/2017" - will not work )

import { nb } from 'date-fns/locale';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {HBDateAdapter} from "../../HBDateAdapter";
import {MatCalendarCellClassFunction} from "@angular/material/datepicker";
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
  selector: 'app-datepicker-wrapper',
  templateUrl: './datepicker-wrapper.component.html',
  styleUrls: ['./datepicker-wrapper.component.scss'],
  providers: [
    //{ provide: MAT_DATE_LOCALE, useValue: 'nb' },
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
export class DatepickerWrapperComponent implements OnInit, AfterViewInit {
  @Input() config: DateFormatOutputFNS = DateFormatOutputFNS["yyyy-mm-dd"];
  @Input() control!: FormControl;
  formatSelected: string = "yyyy-MM-dd"
  formatSelected2: string = "dd.MM.yyyy"

  local_control!: FormControl;
  // local_date: Date = new Date()
  local_date: string = "2020-11-20"

  startDate = new Date(2022, 12, 1) //can set up for one month from now
  minDate = new Date(2010, 0, 3);
  maxDate = new Date(2010, 0, 15);

  public mask = {
    guide: false,
    showMask : true,
    keepCharPositions: true,
    mask: [/\d/, /\d/, '.', /\d/, /\d/, '.',/\d/, /\d/,/\d/, /\d/]
  };

  public mask_maaned = {
    guide: false,
    showMask : true,
    mask: [/\d/, /\d/, '.', /\d/, /\d/, '.',/\d/, /\d/,/\d/, /\d/]
  };

  constructor() {

  }

  ngOnInit(): void {
    this.local_date = format(parse(this.control.value, this.formatSelected, 0), this.formatSelected)

    this.local_control = new FormControl(this.control.value)
    this.local_control.valueChanges.subscribe(v => {

      console.log("v:", v, " -typeof:", typeof v) //Date object

      this.formatSelected = (true) ? "dd-MM-yyyy" : "MMMM dd, yyyy HH:MM:ss"

      let formated = format(v, this.formatSelected)

      //second argument has to match format on input string (or use parseISO wo second arg)
      let parsed = parse(formated, this.formatSelected, 0)

      //??? QUESTION
      // HOW to parse several different string formats into Date object?
      // moment has options for strict mode

      console.log("FORMATTED:", formated)
      console.log("PARSED:" , parsed)
      console.log("local_date:" , this.local_date)

      //probably need some formatting? slik som før:
      //const momentValue = moment(inputValue, 'DD.MM.YYYY', true);
      if (isValid(v)){
        this.control.setValue(format(v, this.config))
        this.control.markAsDirty()
        this.control.markAsTouched()
      }
    })
  }

  dateFilter: (date: Date | null) => boolean =
    (date: Date | null) => {
      if (!date) {
        return false;
      }
      const day = date.getDay();
      return day == 1; // 1 means monday, 0 means sunday, etc.
    };

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {

    const date = cellDate.getDate();

    if (view == 'month') {
      return (date == 1) ? 'highlight-date' : "";
    }

    return "";
  }

  //some experiments with accessing input value directly and mutate it.
  //because of this comment:
  //I ended up firing the (dateChange) event on the date picker
  // and manually formatting the date object in to a ISO string.
  // Its really a one liner, but was all i needed as I stored
  // the date as a string and parsed into a DateTime object on the server
  //note: dateChange doesn't work with textMask

  dateWasChanged(input: HTMLInputElement) {
    console.log("dateChange: ", input.value)
    // let temp = parse(input.value, "dd.MM.yyyy", 0)
    // console.log(temp)
    // this.local_date = format(temp, this.formatSelected)
    // this.local_date = temp
    // console.log("dateChange: ", input)
    //if date is valid, save it to control, according to config

    let parsed = parse(input.value, this.formatSelected2, 0)
    console.log("PARSED:", parsed)
    if(isValid(parsed)) {
      this.control.setValue(format(parsed, this.config))
      this.control.markAsDirty()
      this.control.markAsTouched()
    }
  }

  @ViewChild('input', { read: ElementRef }) inputElement!: ElementRef<HTMLInputElement>;
  ngAfterViewInit() {
     if (this.control.value) {
      this.inputElement.nativeElement.value = this.local_date;
    }
/*    console.log("viewChild:", this.el)
    console.log("viewChild:", this.el.nativeElement)
    this.el.nativeElement.value = "2020"
    console.log("viewChild:", this.el.nativeElement.value)*/
  }

  handleChange() {
    console.log(this.local_date)
  }

}

//notes for discussion:
//-type of input to build for (Date, "yyyy-mm-dd", "yyyy-mm-ddT00:00:00Z")
//-config for output format (Date, "yyyy-mm-dd", "yyyy-mm-ddT00:00:00Z")
//-UX input (separators to accept: 25.11.2020, 25/11/2020)
// -UX pictures from Randi
//-use formControl in <input>
//-where does validation happen - in wrapper or outside?
