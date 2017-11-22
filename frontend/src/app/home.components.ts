import {Component} from '@angular/core';
import {ProductService} from './products.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'home',
    template: `
    {{title}}
            <mat-grid-list cols="6" rowHeight="1:1">
            <div *ngFor = "let product of products">
            <mat-grid-tile>
            <mat-card style="cursor:pointer" [routerLink]="['/products', product.id]">
            <mat-card-title> {{product.title}} </mat-card-title>
            <mat-card-subtitle>{{product.subtitle}}</mat-card-subtitle>
            <mat-card-content>{{product.price}}</mat-card-content>
            </mat-card>
            </mat-grid-tile>
            </div>
            </mat-grid-list>
            `
        
       
        
    
})


export class HomeComponent{
    //title  = 'Mean Ecommerce';

    products;
   
    constructor(private productService: ProductService, private route: ActivatedRoute){

    }

    ngOnInit(){
        var product = (this.route.snapshot.params.product);
        this.productService.getProducts(product);
        this.productService.productSubject.subscribe( products => {this.products = products});
        
    }
    
    // products = [];

    // async ngOnInit(){
    //     var response = await (this.productService.getProducts());
    //     this.products = response.json();
    //     console.log(this.products);
    // }

}