import { Component } from '@angular/core';
import { ProductService } from '../product-service';
import { ProductHolder, ProductSubCategory } from '../product';
import { ActivatedRoute } from '@angular/router';
declare var $: any 

@Component({
  selector: 'app-productcategories',
  templateUrl: './productcategory.component.html',
  styleUrl: './productcategory.component.css'
})
export class ProductcategoryComponent {

  products!:ProductHolder[];
  httpProducts!:ProductHolder[];
  errorMessage !: string;

  productSubCategoriesByProductCategoryName !: ProductSubCategory[]

  title !: string | null;

  constructor(private productService : ProductService,private route : ActivatedRoute){}
  


  ngOnInit(): void {
   
    $(document).ready(function(){
      $('[data-toggle="popover"]').popover();   
    });

    const routeParams = this.route.snapshot.paramMap;
    const productcategoryFromRoute = routeParams.get('productCategory');

    this.title= productcategoryFromRoute

    this.findProductSubCategoriesByProductCategoryName(productcategoryFromRoute)

  }

  findProductSubCategoriesByProductCategoryName(productCategoryName : string | null){
    this.productService.findProductSubCategoriesByProductCategoryName(productCategoryName).subscribe({
      next:productCategory => this.productSubCategoriesByProductCategoryName = productCategory,
      error : error => this.errorMessage = <any>error
    })
  }
  


}
