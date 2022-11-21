import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons',
  template: `
    <button mat-button>
      Click me
      <mat-icon fontIcon="home"></mat-icon>
    </button>

    <button mat-button color="primary">Primary<mat-icon fontIcon="home"></mat-icon></button>
    <button mat-button color="accent">Accent<mat-icon fontIcon="home"></mat-icon></button>
    <button mat-button color="warn">Warn<mat-icon fontIcon="home"></mat-icon></button>

    <mat-checkbox>Are you with me?</mat-checkbox>
  `,
  styles: [
  ]
})
export class ButtonsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
