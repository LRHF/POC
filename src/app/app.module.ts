import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxInputModule } from 'jqwidgets-ng/jqxinput';
import { jqxNumberInputModule } from 'jqwidgets-ng/jqxnumberinput';
import { jqxDropDownListModule } from 'jqwidgets-ng/jqxDropDownList';
import { jqxDateTimeInputModule } from 'jqwidgets-ng/jqxDateTimeInput';
import { jqxWindowModule } from 'jqwidgets-ng/jqxwindow';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { jqxFormModule } from 'jqwidgets-ng/jqxform';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, jqxGridModule, jqxInputModule, jqxNumberInputModule, jqxWindowModule, jqxButtonModule, jqxFormModule, jqxDropDownListModule, jqxDateTimeInputModule],
  providers: [{ provide: LOCALE_ID, useValue: "en-NZ" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
