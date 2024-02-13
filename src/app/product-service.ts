import { Injectable } from '@angular/core';

import { PRODUCTS } from "./product-data";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError ,retry } from 'rxjs';
import { Product, SubProduct } from './product';
import { NewProductHolder } from './new-product-holder';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    postedProduct !: Observable<Product>;
    retrivedProducts!:Observable<[Product]>;

    postedNewProduct !: Observable<NewProductHolder>;

    constructor(private httpClient : HttpClient) { }

    public getProducts(){
        return PRODUCTS;
    }

    getProductsFromHttp() : Observable<Product[]> {

        console.log(" getProductsFromHttp invoked this")
        this.retrivedProducts = this.httpClient.get<Product[]>('http://localhost:8080/listProducts').pipe(tap( (data : any) => console.log('Data Fetched is :' + JSON.stringify(data))),catchError(this.handleError))
        return this.retrivedProducts
      }

      addProductCategory(product : Product) : Observable<any> {
        console.log(product.productName)
        console.log(product.productQuantity)

        const headers = new HttpHeaders({'Content-Type' : 'application/json'});
        console.log("Adding new Product")
        this.postedProduct =  this.httpClient.post('http://localhost:8080/addProductCategory',product,{headers:headers}).pipe( tap( (data : any) => console.log('Posted Data is :' + JSON.stringify(data)) ),catchError(this.handleError));
        return this.postedProduct 
      } 

      addSubProductCategory(product : Product){
        console.log(product.productName)
        console.log(product.productQuantity)
        console.log(product.subProduct[0].subproductName)
        console.log(product.subProduct[0].subProductQuantity)

        const headers = new HttpHeaders({'Content-Type' : 'application/json'});
        console.log("Adding new Sub Product")
        this.postedProduct =  this.httpClient.post('http://localhost:8080/addSubProductCategory',product,{headers:headers}).pipe( tap( (data : any) => console.log('Posted Data is :' + JSON.stringify(data)) ),catchError(this.handleError));
        return this.postedProduct  
      }

      addNewProduct(newProductHolder : NewProductHolder){
        const headers = new HttpHeaders({'Content-Type' : 'application/json'});
        this.postedNewProduct = this.httpClient.post('http://localhost:8080/addNewProduct',newProductHolder,{headers:headers}).pipe( tap( (data : any) => console.log('Posted Data is :' + JSON.stringify(data)) ),catchError(this.handleError));
        console.log("Add New Product from product service completed")
        return this.postedNewProduct 
      }

 
      handleError(err : HttpErrorResponse) : Observable<any> {
        let errMsg = "";
        if(err.error instanceof Error){
          console.log('An error occured:',err.error.message);
          errMsg = err.error.message
        }
        else {
          console.log('Backend returned code ${err.status');
          errMsg = err.error.status
        }
        
        return throwError(() => errMsg)
      }
      
}