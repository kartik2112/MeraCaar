import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router'

import { AppComponent }  from './app.component';
import {ContentComponent} from './home/content/content.component'
import {HomeComponent} from './home/home.component'
import {EmptyComponent} from './home/empty.component'

const appRoutes: Routes = [ 
  // { 
  //   path: '', 
  //   component: AppComponent,
  //   children: [
  //       {
  //           path: 'home',
  //           component: HomeComponent,
  //           children: [
  //             { path: '', component: EmptyComponent },
  //             { path: ':elem', component: ContentComponent }
  //           ]
  //       },
  //       {
  //           path: '',
  //           component: EmptyComponent
  //       }
  //   ]  
  // } 
  { 
    path: '', 
    pathMatch: 'full',
    redirectTo: 'home'   
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: EmptyComponent },
      { path: ':elem', component: ContentComponent }
    ]
  }
]

@NgModule({
  imports:      [ RouterModule.forRoot(appRoutes, {enableTracing: true }), BrowserModule ],
  declarations: [ AppComponent, ContentComponent, HomeComponent, EmptyComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
