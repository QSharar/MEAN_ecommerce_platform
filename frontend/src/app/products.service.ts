import {Http} from "@angular/http";
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import 'rxjs' 
import {Subject} from 'rxjs/Rx';


@Injectable()


export class ProductService{

    private products = [];
    constructor(private http: Http, private sb: MatSnackBar){
        this.getProducts();
    }

    productSubject = new Subject();

    getProducts(product?){
        // return this.http.get("http://localhost:9000").toPromise();

        // try {

        product =  (product) ? "/products/" + product : "";
        
            this.http.get("http://localhost:9000" + product)
                .subscribe( response =>  {
                    this.products = response.json();
                    this.productSubject.next(this.products);
                } , error =>  {this.handleError("Cant Get Products", error)
                });
                               


            // let response = await this.http.get("http://localhost:9000").toPromise();
            // this.products = response.json();
    
        // } catch (error) {
        //     this.handleError("Cant Get Products", error);
            
        // }

       
    }
    addProduct(product){
    


        this.http.post("http://localhost:9000/addproduct", product)
              .subscribe( response => {
                  this.products.push(response.json());
                   this.sb.open("Product Added", "dismiss", {duration: 3000})
                } , error => {
                    this.handleError("Can't Post Products", error)
                });
               
      
    }

    handleError(errormsg, error){
        //this.sb.openSnackBar(errormsg, "dismiss", {duration: 3000});
        this.sb.open(errormsg, "dismiss", {duration: 3000})
        console.log(error);
    }
}

