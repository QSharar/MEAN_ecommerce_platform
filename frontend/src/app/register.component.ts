import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html'
     
})


export class RegisterComponent{
    form;
    constructor(private fb: FormBuilder, private auth: AuthService){
        this.form = this.fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required],
            confirmPassword: ["", Validators.required]
        });
    }


    onSubmit(){
        this.auth.register(this.form.value);
    }
}