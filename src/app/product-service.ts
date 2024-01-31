import { Injectable } from '@angular/core';

import { PRODUCTS } from "./product-data";

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    public getProducts(){
        return PRODUCTS;
    }
}