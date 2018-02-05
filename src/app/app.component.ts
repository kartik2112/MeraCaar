import { Component, OnInit, ViewEncapsulation  } from '@angular/core';

declare var particlesJS: any;

@Component({
  selector: 'my-app',
  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit  {
  
  public ngOnInit() {
    particlesJS.load('particles-js', 'particles.json', null);
  }

}
