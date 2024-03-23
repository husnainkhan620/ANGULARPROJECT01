import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { CartItem } from './cart';

@Injectable({
  providedIn: 'root'
})    
export class CartService {

  items : CartItem[] = [];
  itemsSet = new Set();

  constructor(private httpClient : HttpClient) { 
   // localStorage.clear()
   
  }

  removeFromCart(cartItem : CartItem){

    for(var i =0;i<this.items.length;i++){

      if(Number(this.items[i].product.productId) == Number(cartItem.product.productId))
      {
        console.log("Product found",this.items[i].product.productName)
        this.items.splice(i,1);
        this.syncCartItems(this.items)
        return;
      }
    }

  }

  addToCart(cartItem : CartItem){
    // check if item present in cart

    for(var i =0;i<this.items.length;i++){

      if(Number(this.items[i].product.productId) == Number(cartItem.product.productId))
      {
        console.log("Product found",this.items[i].product.productName)
        console.log("Updating its quantity")
        this.items[i].productQuantity = Number(this.items[i].productQuantity) + Number(cartItem.productQuantity)
        this.syncCartItems(this.items)
        return;
      }
    }
    console.log("No Match found and adding as new item",)
    this.items.push(cartItem);
    this.syncCartItems(this.items) 
    
  }

  getItems() : CartItem[]{
    this.items = JSON.parse(localStorage.getItem('items') || '[]');
    return this.items;
  }

  clearItems(){
    this.items = [];
    localStorage.clear()
    return this.items;
  }

  syncCartItems(items : CartItem[]){
    console.log("Current Items -->",JSON.stringify(this.items))
    localStorage.setItem('items',JSON.stringify(this.items));
  }

}
