import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {HttpModule} from "@angular/http";
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';


import { AppComponent } from './app.component';
import {HomeComponent} from './home.components';
import {ProductService} from './products.service';
import {AddProductComponent} from './addproduct.component';
import {NavComponent} from './nav.component';
import {RegisterComponent} from "./register.component";
import {LoginComponent} from "./login.component";
import {AuthService} from './auth.service';



var routes = [{
  path: 'addproduct',
  component: AddProductComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: "products/:product",
    component: HomeComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  }
]

@NgModule({
  declarations: [
    AppComponent, HomeComponent,AddProductComponent, NavComponent, RegisterComponent, LoginComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, RouterModule.forRoot(routes), BrowserAnimationsModule, MatCardModule, MatGridListModule, HttpModule, MatInputModule, MatButtonModule, FormsModule, MatSnackBarModule, MatToolbarModule
  ],
 
  providers: [ProductService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
