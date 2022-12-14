import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})

export class NumbersOnlyDirective {
  @Input() dateInputType: DateInputTypeValue = DateInputTypeValue.day

  previousValue: string = '';

  // --------------------------------------
  //  Regular expressions
  integerUnsigned: string = '^[0-9]*$';
  integerSigned: string = '^-?[0-9]+$';
  decimalUnsigned: string = '^[0-9]+(.[0-9]+)?$';
  decimalSigned: string = '^-?[0-9]+(.[0-9]+)?$';

  /**
   * Class constructor
   * @param hostElement
   */
  constructor(private hostElement: ElementRef) { }

  /**
   * Event handler for host's change event
   * @param e
   */
  @HostListener('change', ['$event']) onChange(e: any) {
    this.validateValue(this.hostElement.nativeElement.value);
  }

  /**
   * Event handler for host's paste event
   * @param e
   */
  @HostListener('paste', ['$event']) onPaste(e: any) {

    // get and validate data from clipboard
    let value = e.clipboardData.getData('text/plain');
    this.validateValue(value);
    e.preventDefault();
  }

  /**
   * Event handler for host's keydown event
   * @param event
   */
  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    let cursorPosition: number | null = (e.target as HTMLInputElement).selectionStart;
    let originalValue: string = (e.target as HTMLInputElement).value;
    let key: string = this.getName(e);
    let controlOrCommand = (e.ctrlKey || e.metaKey);
    let signExists = originalValue.includes('-');
    // let separatorExists = originalValue.includes(this.decimalSeparator);

    // allowed keys apart from numeric characters
    let allowedKeys = [
      'Backspace', 'ArrowLeft', 'ArrowRight', 'Escape', 'Tab'
    ];

    // allow some non-numeric characters
    if (allowedKeys.indexOf(key) != -1 ||
      // Allow: Ctrl+A and Command+A
      (key == 'a' && controlOrCommand) ||
      // Allow: Ctrl+C and Command+C
      (key == 'c' && controlOrCommand) ||
      // Allow: Ctrl+V and Command+V
      (key == 'v' && controlOrCommand) ||
      // Allow: Ctrl+X and Command+X
      (key == 'x' && controlOrCommand)) {
      // let it happen, don't do anything
      return;
    }

    // save value before keydown event
    this.previousValue = originalValue;

    // allow number characters only
    let isNumber = (new RegExp(this.integerUnsigned)).test(key);
    console.log("isNumber", isNumber)
    console.log("key", key)

    if (+key >= 3) {
      //add 0 in front and change focus to next field
    }
    else if (isNumber) return;
    else e.preventDefault();
  }

  /**
   * Test whether value is a valid number or not
   * @param value
   */
  validateValue(value: string): void {
    //console.log("validating...", value)

    let regex: string = this.integerUnsigned;

    // test number with regular expression, when
    // number is invalid, replace it with a zero
    let valid: boolean = (new RegExp(regex)).test(value);
    this.hostElement.nativeElement['value'] = valid ? value : 0;

    ////////////////////////////
    //if first digit entered > 3 -> set value to 03 and change focus
/*    if (+firstCharacter >= 3) {
      value = 0 + value
      this.hostElement.nativeElement['value'] = value
    }*/

  }

  /**
   * Get key's name
   * @param e
   */
  getName(e: any): string {

    if (e.key) {

      return e.key;

    } else {

      // for old browsers
      if (e.keyCode && String.fromCharCode) {

        switch (e.keyCode) {
          case   8:
            return 'Backspace';
          case   9:
            return 'Tab';
          case  27:
            return 'Escape';
          case  37:
            return 'ArrowLeft';
          case  39:
            return 'ArrowRight';
          case 188:
            return ',';
          case 190:
            return '.';
          case 109:
            return '-'; // minus in numbpad
          case 173:
            return '-'; // minus in alphabet keyboard in firefox
          case 189:
            return '-'; // minus in alphabet keyboard in chrome
          default:
            return String.fromCharCode(e.keyCode);
        }
      }
    }
    return ""
  }
}

export enum DateInputTypeValue {
  "day" = "day",
  "month" = "month",
  "year" = "year"
}
