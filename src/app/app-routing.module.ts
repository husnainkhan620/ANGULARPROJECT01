import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddProductComponent, } from './addproduct/addproduct.component';
import { ProductcategoryComponent } from './productcategory/productcategory.component';
import { ProductsubcategoryComponent } from './productsubcategory/productsubcategory.component';

import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'login',component:LoginComponent},
  {path: 'home',component:HomeComponent},
  {path: 'addproduct',component:AddProductComponent},
  {path: 'cart',component:CartComponent},
  {path: 'checkout',component:CheckoutComponent},
  {path: 'productcategory/:productCategory',component:ProductcategoryComponent},
  {path: 'productcategory/:productCategory/:productSubCategory',component:ProductsubcategoryComponent},
  {path: 'productcategory/:productCategory/:productSubCategory/:productName',component:ProductdetailsComponent},

  {path: '',redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
