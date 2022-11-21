import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {User} from "../../models/user";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {

  @ViewChild('input', { read: ElementRef }) inputElement!: ElementRef<HTMLInputElement>;
  user!: User;
  avatars = [
    'svg-1',
    'svg-2',
    'svg-3',
    'svg-4',
  ]

  today = new Date()
  thisYear = this.today.getFullYear()
  year1990 = new Date(1990, 0, 1)

  birthDate!: FormControl;

  constructor(private dialogRef: MatDialogRef<NewContactDialogComponent>) { }

  ngOnInit(): void {
    this.user = new User();
    this.birthDate = new FormControl(this.today)
    this.birthDate.valueChanges.subscribe(val => {
      console.log("form control date: ", val)
      console.log("form control date: ", val.toISOString())
      console.log("form control date: ", val.toISOString().split('.')[0]+"Z")
      console.log("inputElement: ", this.inputElement)
      console.log("inputElement: ", this.inputElement.nativeElement.value)

      this.user.birthDate = val.toISOString().split('.')[0]+"Z"

    })
  }

  saveUser() {
    this.dialogRef.close(this.user)
  }

  dismiss() {
    this.dialogRef.close(null)
  }

  setDate(dateRef: HTMLInputElement) {
    console.log("DATE REF:", dateRef)
    console.log("DATE REF:", dateRef.value)
    console.log("DATE REF:", dateRef.valueAsDate)
    console.log("DATE REF:", dateRef.outerHTML)
/*    let settedDate:Date = (e.target as HTMLInputElement).value as Date
    this.user.birthDate = toISOs*/
  }
}
