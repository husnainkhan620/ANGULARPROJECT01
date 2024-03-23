import { Injectable } from '@angular/core';

import { PRODUCTS } from "./product-data";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap, throwError ,retry } from 'rxjs';
import {  Product, ProductHolder, ProductPageResult, ProductSubCategory } from './product';
import { NewProductHolder } from './new-product-holder';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    postedProductHolder !: Observable<ProductHolder>;
    retrivedProductHolders!:Observable<[ProductHolder]>;

    postedNewProduct !: Observable<NewProductHolder>;

    productSubCategoriesByProductCategoryName !: Observable<ProductSubCategory[]>

    productsforSubCategory !:  Observable<ProductPageResult>;

    productinDetail !: Observable<Product>;

    constructor(private httpClient : HttpClient) { }

    public getProducts(){
        return PRODUCTS;
    }

      getProductsFromHttp() : Observable<ProductHolder[]> {

        console.log(" getProductsFromHttp invoked this")
        const headers = new HttpHeaders({ 'Content-Type' : 'application/json','Authorization': 'Basic ' + btoa("buzz" + ':' + "buzz")});
        this.retrivedProductHolders = this.httpClient.get<ProductHolder[]>('http://localhost:8080/listProductsByCategory',{headers}).pipe(tap( (data : any) => console.log('Data Fetched is :' + JSON.stringify(data))),catchError(this.handleError))
        return this.retrivedProductHolders
      }



      findProductSubCategoriesByProductCategoryName(productCategoryName : string | null) : Observable<ProductSubCategory[]> {
        let params = new HttpParams();
        if(productCategoryName != null)
          params = params.append("productCategoryName", productCategoryName);

        console.log(" findProductSubCategoriesByProductCategoryName inside this")
        const headers = new HttpHeaders({ 'Content-Type' : 'application/json','Authorization': 'Basic ' + btoa("buzz" + ':' + "buzz")});
        this.productSubCategoriesByProductCategoryName = this.httpClient.get<ProductSubCategory[]>('http://localhost:8080/findProductSubCategoriesByProductCategoryName',{params:params,headers:headers}).pipe(tap( (data : any) => console.log('Data Fetched is :' + JSON.stringify(data))),catchError(this.handleError))

        return this.productSubCategoriesByProductCategoryName;
      }

      // next need to handle
      findProductsByProductSubCategoryName(productCategoryName : string | null,productSubCategoryName : string | null) : Observable<ProductPageResult>{

        let params = new HttpParams();
        if(productCategoryName != null && productSubCategoryName != null){
          params = params.append("productCategoryName", productCategoryName);
          params = params.append("productSubCategoryName", productSubCategoryName);
        }

        console.log(" findProductsByProductSubCategoryName inside this")
        const headers = new HttpHeaders({ 'Content-Type' : 'application/json','Authorization': 'Basic ' + btoa("buzz" + ':' + "buzz")});
        this.productsforSubCategory = this.httpClient.get<ProductPageResult>('http://localhost:8080/findProductsByProductSubCategoryName',{params:params,headers:headers}).pipe(tap( (data : any) => console.log('Data Fetched is :' + JSON.stringify(data))),catchError(this.handleError))

        return this.productsforSubCategory
      }

      getProductDetails(productCategoryName : string | null,productSubCategoryName : string | null,productName : string | null) : Observable<Product>{
        let params = new HttpParams();
        if(productCategoryName != null && productSubCategoryName != null && productName != null){
          params = params.append("productCategoryName", productCategoryName);
          params = params.append("productSubCategoryName", productSubCategoryName);
          params = params.append("productName", productName);
        }

        console.log(" getProductDetails inside this")
        const headers = new HttpHeaders({ 'Content-Type' : 'application/json','Authorization': 'Basic ' + btoa("buzz" + ':' + "buzz")});

        this.productinDetail = this.httpClient.get<Product>('http://localhost:8080/getProductDetailsByProductName',{params:params,headers:headers}).pipe(tap( (data : any) => console.log('Data Fetched is :' + JSON.stringify(data))),catchError(this.handleError))
        return this.productinDetail;
      }

      addProductCategory(product : ProductHolder) : Observable<any> {
        console.log(product.productName)
        console.log(product.productQuantity)

        const headers = new HttpHeaders({ 'Content-Type' : 'application/json','Authorization': 'Basic ' + btoa("dumm" + ':' + "dumm") });
        console.log("Adding new Product")
        this.postedProductHolder =  this.httpClient.post('http://localhost:8080/addProductCategory',product,{headers:headers}).pipe( tap( (data : any) => console.log('Posted Data is :' + JSON.stringify(data)) ),catchError(this.handleError));
        return this.postedProductHolder
      }  
 
      addSubProductCategory(product : ProductHolder){
        console.log(product.productName)
        console.log(product.productQuantity)
        console.log(product.subProduct[0].subproductName)
        console.log(product.subProduct[0].subProductQuantity)

        const headers = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'Basic ' + btoa("buzz" + ':' + "buzz")});
        console.log("Adding new Sub Product")
        this.postedProductHolder =  this.httpClient.post('http://localhost:8080/addSubProductCategory',product,{headers:headers}).pipe( tap( (data : any) => console.log('Posted Data is :' + JSON.stringify(data)) ),catchError(this.handleError));
        return this.postedProductHolder  
      }

      addNewProduct(newProductHolder : NewProductHolder){
        const headers = new HttpHeaders({'Content-Type' : 'application/json','Authorization': 'Basic ' + btoa("buzz" + ':' + "buzz")});
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

export { NewProductHolder, ProductHolder };
