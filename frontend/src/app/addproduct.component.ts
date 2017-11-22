import {Component} from '@angular/core';
import {ProductService} from './products.service';

@Component({
    selector: 'addproduct',
    template: `
    <mat-grid-list cols="2" align="center">
            <mat-card>
            
            <mat-form-field>
                <input matInput placeholder="Title of Product" [(ngModel)]="product.title">
            </mat-form-field>
            <br>
            <mat-form-field>
                <input matInput placeholder="Brief description of product" [(ngModel)]="product.subtitle">
            </mat-form-field>
            <br>
            <mat-form-field>
                <input matInput placeholder="Price of Product" [(ngModel)]="product.price">
            </mat-form-field>
            <br>
            <button mat-raised-button color="primary" (click)="post()">Add</button>
        
        </mat-card>
    </mat-grid-list>
    `
        
       
        
    
})

export class AddProductComponent{

    product = {
        title: "",
        subtitle: "",
        price: ""
    }

    constructor(private products: ProductService){

    }

    post(){
        this.products.addProduct(this.product);
        // .then( () => console.log("product added")).catch( (err) => {throw err});
    }

}