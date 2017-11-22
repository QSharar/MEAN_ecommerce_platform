import {Component} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
    selector: 'navbar',
    template: `<mat-toolbar color="primary">
    
        ECommerce Website
        <button mat-button routerLink="/">Home</button>
        <button *ngIf="auth.isAuthenticated" mat-button  routerLink="/addproduct">Add Products</button>
        
        <span style="flex: 1 1 auto"></span> 
        <button *ngIf="!auth.isAuthenticated" mat-button routerLink="/login">Login</button>
        <button *ngIf="!auth.isAuthenticated" mat-button routerLink="/register">Register</button>
        <button *ngIf="auth.isAuthenticated" mat-button >Welcome {{auth.username}}</button>
        <button *ngIf="auth.isAuthenticated" (click)="logout()" mat-button >Log Out</button>
           
    </mat-toolbar>`
})

export class NavComponent {
    
    constructor(private auth: AuthService){
        
    }

    logout(){
        this.auth.logout();
    }
}