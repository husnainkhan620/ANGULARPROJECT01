import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './addproduct/addproduct.component';
import { ProductcategoryComponent } from './productcategory/productcategory.component';
import { ProductsubcategoryComponent } from './productsubcategory/productsubcategory.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,HomeComponent,AddProductComponent,LoginComponent,CartComponent,CheckoutComponent,ProductcategoryComponent,ProductsubcategoryComponent,ProductdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
