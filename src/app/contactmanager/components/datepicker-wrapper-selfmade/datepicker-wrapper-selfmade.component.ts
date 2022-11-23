import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {compareAsc, format, isValid, parse, parseISO} from 'date-fns'
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {DateFnsAdapter} from "@angular/material-date-fns-adapter";
import {nb} from 'date-fns/locale';
import {DateFormatOutputFNS} from "../../models/date-formats";
import {DateInputTypeValue} from "../../directives/numbers-only.directive";

//Setting the selected date
//The type of values that the datepicker expects
// depends on the type of DateAdapter provided in your application.
//Depending on the DateAdapter being used,
// the datepicker may automatically deserialize certain date formats.
// (this will convert input string 1-1-1999 into Date object for datepicker)
// ("1/2/2017" - will not work )

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: "dd.MM.yyyy", // den er for <input
  },
  display: {
    dateInput: "dd.MM.yyyy", // satt av <mat-datepicker
    monthYearLabel: 'yyyy MMMM',
    dateA11yLabel: 'MMMM d, y',//'LL',
    monthYearA11yLabel: 'MMMM yyyy'
  },
};

@Component({
  selector: 'app-datepicker-wrapper-selfmade',
  templateUrl: './datepicker-wrapper-selfmade.component.html',
  styleUrls: ['./datepicker-wrapper-selfmade.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: nb },
    {
      provide: DateAdapter,
      useClass: DateFnsAdapter,
      // useClass: HBDateAdapter, //are these the methods called by datepicker? seem so.
      //deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class DatepickerWrapperSelfmadeComponent implements OnInit {
  @Input() config: DateFormatOutputFNS = DateFormatOutputFNS["yyyy-mm-dd"];
  @Input() control!: FormControl;
  @Input() min: string  = "1900-01-01"
  @Input() max: string  = "2100-01-01"
  local_control!: FormControl; //    this.local_control = new FormControl(this.control.value)

  //inputs for appNumbersDirective
  input_day: DateInputTypeValue = DateInputTypeValue.day
  input_month: DateInputTypeValue = DateInputTypeValue.month
  input_year: DateInputTypeValue = DateInputTypeValue.year

  date_obj!: Date;
  date_string: string = "" //day + . + month + . + year -ngOnChange?
  //this has to work together with datepicker, to update same output
  //1. bind inputs to something
    // a. ngModel b.ViewChild ?
  //2. on change event -> construct date_string -> log value
  //3. if value is valid -> (set it to input field?-why, its invisible) and send as output
  // I need rather parse mat-input to fill selfmade input

  //input bindings
  /*
      [ngModel]="day_value"
    (ngModelChange)="dayChange($event)"
  day_value: string = '11'
  month_value: string = '11'
  year_value: string = '1111'  */

  //these are collecting inputs after appNumbersOnly did input validation.
  day_value!: FormControl;
  month_value!: FormControl;
  year_value!: FormControl;


  constructor() {  }

  ngOnInit(): void {
    this.date_obj = parseISO(this.control.value)
    /*
    console.log("date obj \n", this.date_obj)
    console.log("date obj day \n", this.date_obj.getDate().toString())
    console.log("date obj month \n", (this.date_obj.getMonth()+1).toString())
    console.log("date obj year \n", this.date_obj.getFullYear().toString());
*/
    this.day_value = new FormControl<string>(this.date_obj.getDate().toString());
    this.month_value = new FormControl<string>((this.date_obj.getMonth()+1).toString());
    this.year_value = new FormControl<string>(this.date_obj.getFullYear().toString());

    this.day_value.valueChanges.subscribe(v=> {
      console.log("day updated", v)
    })

    //combine streams to update local_control (from custom input)

    //...need a diagram -_-

    this.local_control = new FormControl(this.control.value)

    //once local_control is updated by datepicker, update custom input
    this.local_control.valueChanges.subscribe(v => {
      console.log("local_control: \n", v)
      this.day_value.setValue(v.getDate().toString());
      this.month_value.setValue((v.getMonth()+1).toString());
      this.year_value.setValue(v.getFullYear().toString());
    })

    //parse control to Date object and assign day to day, month to month...
/*    this.control.valueChanges.subscribe(v => {
      console.log("valuechanges:", v)
    })*/
/*    this.date_obj = parse(this.control.value, "dd.MM.yyyy", 0)
/!*    this.day_value = this.date_obj.getDay().toString()
    console.log(this.day_value)*!/
    console.log(this.date_obj)*/

    //console.log(this.control)
  }

  withinRange(v: any):boolean {
    let result = false;
    if (compareAsc(v,parseISO(this.min)) == 1) result = true;
    return result;
  }
  isCorrectFormat():boolean {
    let result = false;
    if (true) result = true;
    return result;
  }

  chageFocus(el: HTMLInputElement) {
    el.focus()
  }

  //(change)="checkInput(day)"
  checkInput(el: HTMLInputElement) {
    console.log("check input?:", el.value)
  }

  dayChange(event: string) {
    //this.day_value = event
  }

  monthChange(event: any) {
    this.month_value = event
  }

  yearChange(event: any) {
    this.year_value = event
    this.date_string = this.day_value + "." + this.month_value + "." + this.year_value
    console.log(this.date_string)

  }
}

//$event -> input: Date  -  this is when datepicker sets value to input. event value can be anything
//#input -> input: HTMLInputElement

