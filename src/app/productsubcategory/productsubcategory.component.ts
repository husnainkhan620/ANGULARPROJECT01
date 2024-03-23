import { Component } from '@angular/core';
import { ProductService } from '../product-service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product, ProductPageResult } from '../product';


@Component({
  selector: 'app-productsubcategory',
  templateUrl: './productsubcategory.component.html',
  styleUrl: './productsubcategory.component.css'
})
export class ProductsubcategoryComponent {

  title !: string | null;
  jsonProductPageResult !: ProductPageResult;
  productsforSubCategoryName !:  Product[];
  errorMessage !: string;


  constructor(private productService : ProductService,private route : ActivatedRoute){}
  


  ngOnInit(): void {


   
    const routeParams = this.route.snapshot.paramMap;
    const productcategoryFromRoute = routeParams.get('productCategory');
    const productsubcategoryFromRoute = routeParams.get('productSubCategory');

    this.title= productsubcategoryFromRoute  

    // fetch the productsforSubCategory(productCategory,productSubCategory)
    this.productsforSubCategory(productcategoryFromRoute,productsubcategoryFromRoute)

  }

  productsforSubCategory(productCategory : string | null ,productSubCategory: string | null){

    this.productService.findProductsByProductSubCategoryName(productCategory,productSubCategory).subscribe({
      next:jsonPageContent => {
        this.productsforSubCategoryName = jsonPageContent.content
      },
      error : error => this.errorMessage = <any>error
      
    })
    

  }

}
