import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ProductService } from '../product-service'; 
import { ProductHolder, ProductSubCategory} from '../product';
import { NewProductHolder } from '../product';
import { SubProductHolder } from '../product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  products!:ProductHolder[];
  httpProducts!:ProductHolder[];
  errorMessage !: string;

  dropdownSelectedProduct !: ProductHolder;
  selectedProductIndex !: number;
  selectedPopUpProductCategoryName !: string;

  toAddProductCategoryName !: string;
  toAddSubProductName !: string;
  addedSubProduct !: ProductHolder;

  

  /* Modal popup params */
  toAddProductName !: string;
  toAddProductQuantity !: number;
  selectedproduct !: string;
  selectedsubProduct !: string;

  constructor(private productService : ProductService){}
  
  title = 'AngularProjectv01';

  ngOnInit(): void {
    $(document).ready(function(){
      $('.dropdown-submenu a.dropdown-child').on("click", function(e){
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
      });
    });

    this.getProducts()
    this.getProductsFromHttp()
    
    /* Default values */
    this.selectedProductIndex = 0;
    this.selectedPopUpProductCategoryName = 'Embedded Electronics'

    /* Modal popup params init */
    this.selectedproduct = 'Embedded Electronics'
    this.selectedsubProduct = 'Development'

  }

  getProducts(){
    this.products = this.productService.getProducts()
    console.log(this.products)
  }

  getProductsFromHttp(){
    this.productService.getProductsFromHttp().subscribe({
      next:product => this.httpProducts = product,
      error : error => this.errorMessage = <any>error
    })
  }

  
}
