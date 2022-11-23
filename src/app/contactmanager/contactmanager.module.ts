import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from "../shared/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserService } from "./services/user.service";
import {HttpClientModule} from "@angular/common/http";
import { NotesComponent } from './components/notes/notes.component';
import { NewContactDialogComponent } from './components/new-contact-dialog/new-contact-dialog.component';
import { DatepickerWrapperComponent } from './components/datepicker-wrapper/datepicker-wrapper.component';
import {TextMaskModule} from "angular2-text-mask";
import { DatepickerWrapperMomentComponent } from './components/datepicker-wrapper-moment/datepicker-wrapper-moment.component';
import { DatepickerWrapperFnsComponent } from './components/datepicker-wrapper-fns/datepicker-wrapper-fns.component';
import { DatepickerWrapperNativeComponent } from './components/datepicker-wrapper-native/datepicker-wrapper-native.component';
import { DatepickerWrapperNativeMComponent } from './components/datepicker-wrapper-native-m/datepicker-wrapper-native-m.component';
import { DatepickerWrapperMaskA2Component } from './components/datepicker-wrapper-mask-a2/datepicker-wrapper-mask-a2.component';
import { DatepickerWrapperMaskNgxComponent } from './components/datepicker-wrapper-mask-ngx/datepicker-wrapper-mask-ngx.component';
import { DatepickerWrapperMomentMComponent } from './components/datepicker-wrapper-moment-m/datepicker-wrapper-moment-m.component';
import { DatepickerWrapperFnsMComponent } from './components/datepicker-wrapper-fns-m/datepicker-wrapper-fns-m.component';
import {IConfig, NgxMaskModule} from "ngx-mask";
import { DatepickerWrapperSelfmadeComponent } from './components/datepicker-wrapper-selfmade/datepicker-wrapper-selfmade.component';
import {NumbersOnlyDirective} from "./directives/numbers-only.directive";

const routes: Routes = [
  //new suntax for lazy loading modules
  { path: '', component: ContactmanagerAppComponent,
    children: [
      {path: ':id', component: MainContentComponent},
      {path: '', component: MainContentComponent},
    ]
  },
  { path: '**', redirectTo: ''}
];

const maskConfig: Partial<IConfig> = {
  validation: false,
};


@NgModule({
  declarations: [
    ContactmanagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
    NotesComponent,
    NewContactDialogComponent,
    DatepickerWrapperComponent,
    DatepickerWrapperMomentComponent,
    DatepickerWrapperFnsComponent,
    DatepickerWrapperNativeComponent,
    DatepickerWrapperNativeMComponent,
    DatepickerWrapperMaskA2Component,
    DatepickerWrapperMaskNgxComponent,
    DatepickerWrapperMomentMComponent,
    DatepickerWrapperFnsMComponent,
    DatepickerWrapperSelfmadeComponent,
    DatepickerWrapperSelfmadeComponent,
    NumbersOnlyDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
    TextMaskModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [
    UserService
  ]
})
export class ContactmanagerModule { }
