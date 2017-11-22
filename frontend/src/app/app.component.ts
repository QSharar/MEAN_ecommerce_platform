import { Component } from '@angular/core';
import {HomeComponent} from './home.components';

@Component({
  selector: 'app-root',
  template: `
  <navbar></navbar>
  <router-outlet></router-outlet>
  
  `
  ,

  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //appStatement =  `Serviing formt he appComp`;<home></home><addproduct><addproduct>
}
