import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Injectable()

export class AuthService{

    constructor(private http: Http, private router: Router, private sb: MatSnackBar){

    }

    get username() {
        return localStorage.getItem('username');
    }

    get isAuthenticated(){
        return !!localStorage.getItem('token');
    }

    register(user){
        delete user.confirmPassword;

        this.http.post("http://localhost:9000/register", user).subscribe( (res) => {
            this.setToken(res);
        });
    }

    logout(){
        localStorage.clear();
        
    }

    login(user){
        this.http.post("http://localhost:9000/login", user).subscribe( (res) => {
            this.setToken(res);
        })
    }

    setToken(res){
        let authResponse = res.json();
        if(!authResponse.token){
            console.log(authResponse);
            this.sb.open("Incorrect Login Info", "dismiss", {duration: 3000});
            return;
        }

        localStorage.setItem('token', authResponse.token);
        localStorage.setItem('username', authResponse.username);
        this.router.navigate(['/']);
    }
}