import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router'

import { AppComponent }  from './app.component';
import {ContentComponent} from './content/content.component'

const appRoutes: Routes = [ 
  { 
    path: '', component: AppComponent, 
    children: [
      { path: ':elem', component: ContentComponent }
    ]
  }  
]

@NgModule({
  imports:      [ RouterModule.forRoot(appRoutes, {enableTracing: true }), BrowserModule ],
  declarations: [ AppComponent, ContentComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
