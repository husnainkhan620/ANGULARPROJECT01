import { Component } from '@angular/core';
import { ProductService } from '../product-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { CartItem } from '../cart';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent   {

  title !: string | null;
  quantity !: number;
  productinDetail !:  Product;
  errorMessage !: string;
  cartItem !: CartItem;

  localproductCategory !: string | null;
  localproductSubCategory !: string | null;


  constructor(private productService : ProductService,private cartService : CartService,private route : ActivatedRoute, private router: Router){}

  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap;
    const productcategoryFromRoute = routeParams.get('productCategory');
    const productsubcategoryFromRoute = routeParams.get('productSubCategory');
    const productNameFromRoute = routeParams.get('productName');

    this.title= productNameFromRoute
    this.localproductCategory = productcategoryFromRoute
    this.localproductSubCategory= productsubcategoryFromRoute

     // fetch the productDetails for a particular product
     this.productDetails(productcategoryFromRoute,productsubcategoryFromRoute,productNameFromRoute)

  }

  productDetails(productCategoryName : string | null,productSubCategoryName : string | null,productName : string | null){

    this.productService.getProductDetails(productCategoryName,productSubCategoryName,productName).subscribe({
      next:product => this.productinDetail = product,
      error : error => this.errorMessage = <any>error
    })

  }

  buythisProduct(){
      console.log("Buying this product"+this.productinDetail.productName)
      console.log("Quantity selected"+this.quantity)

      this.cartItem = new CartItem();;
      this.cartItem.product = this.productinDetail
      this.cartItem.productQuantity = this.quantity

      this.cartService.addToCart(this.cartItem)

      // update the cart count 
      let updatecartItemCount !: HTMLElement | null ;
      updatecartItemCount = document.getElementById("cartItemCount")
      console.log("------------" ,updatecartItemCount?.innerText)
      if(updatecartItemCount != null){
        updatecartItemCount.innerText = String(this.cartService.getItems().length)
      }

      // Route to where ever you want
      //this.router.navigate(['/productcategory',this.localproductCategory,this.localproductSubCategory]);

      
  } 

}
