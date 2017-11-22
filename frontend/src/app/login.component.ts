import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
    
    selector: 'login',
    template: `
    
    <mat-grid-list cols="2" align="center">
    <mat-card>
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <mat-form-field>
                <input matInput placeholder="Email" type="email" formControlName="email" required>
            </mat-form-field><br>
            <mat-input-container>
                <input matInput  placeholder="Password" type="password"  formControlName="password" required>
            </mat-input-container><br>
            <button mat-raised-button color="primary">Login</button>
        </form>
    </mat-card>
</mat-grid-list> 
    `
     
})


export class LoginComponent{
    form;
    constructor(private fb: FormBuilder, private auth: AuthService){
        this.form = this.fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required],
        });
    }


    onSubmit(){
        this.auth.login(this.form.value);
    }
}