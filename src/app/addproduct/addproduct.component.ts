import { Component } from '@angular/core';
import { NewProductHolder, ProductHolder, SubProductHolder } from '../product';
import { ProductService } from '../product-service';
import * as $ from 'jquery';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddProductComponent {

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

  ngOnInit(): void {


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
    console.log(this.httpProducts)
    console.log("Length is -->"+this.httpProducts.length)
  }

  addNewProduct(selectedproduct : string,selectedsubProduct : string ,toAddProductName : string,toAddProductQuantity : number){
    let newProductHolder = new NewProductHolder()
    newProductHolder.selectedproduct = selectedproduct
    newProductHolder.selectedsubProduct = selectedsubProduct
    newProductHolder.toAddProductName = toAddProductName
    newProductHolder.toAddProductQuantity = toAddProductQuantity
    this.productService.addNewProduct(newProductHolder).subscribe(({next:newProductHolder => 
      {
        console.log(newProductHolder)
      }
    }))
  } 


  addProductCategory(productName :string,productQuantityParam : string){
    console.log("Product to add :" + productName,productQuantityParam)
    let productQuantity = parseInt(productQuantityParam)
    let subProduct : SubProductHolder[] = []; // create empty arraysubProduct 
    this.productService.addProductCategory({productName,productQuantity,subProduct}).subscribe(({next:product => this.httpProducts.push(product)}))
  }

  addSubproductCategory(productName:string,productQuantityParam : string,subproductName :string ,subProductQuantityParam : string ){
    console.log("Sub Product to add :" + productName,productQuantityParam,subproductName,subProductQuantityParam)
    let productQuantity = parseInt(productQuantityParam)
    let subProductQuantity = parseInt(subProductQuantityParam)
    let subProduct : SubProductHolder[] = []; // create empty arraysubProduct
    subProduct.push({subproductName,subProductQuantity})
    this.productService.addSubProductCategory({productName,productQuantity,subProduct}).subscribe(({next:product => 
        {
          
          if( true){
            console.log("Subscribed product"+product.productName) 
            let justAddedSubproductName = product.subProduct[0].subproductName
            for(var i=0;i<this.httpProducts.length;i++){
                if(this.httpProducts[i].productName == product.productName)
                {
                  console.log("Under product category " + product.productName+ "index is "+i)
                  let addedsubProduct = new SubProductHolder()
                  addedsubProduct.subproductName = justAddedSubproductName
                  addedsubProduct.subProductQuantity = 0
                  this.httpProducts[i].subProduct.push(addedsubProduct)
                }
            }
          }
         
        }
      }))
  }
 
  productCategorySelected(){
      console.log("Product Selected "+this.selectedproduct)
      for(var i=0;i< this.httpProducts.length ;i++ ){
        if(this.httpProducts[i].productName == this.selectedproduct){
          this.selectedProductIndex = i
          console.log("Drop down selected index "+this.selectedProductIndex)
          break;
        }
      }   
  }

  productCategoryForSubFromPopUp(){
    console.log("Pop up Productselected "+this.selectedPopUpProductCategoryName)
  }
  
  subProductCategorySelected(){
      console.log("sub product selected "+this.selectedsubProduct)
  }

  addProductCategorySubmitPopup(){
    console.log("New Product Category to add is "+this.toAddProductCategoryName)
    this.addProductCategory(this.toAddProductCategoryName,'0');
   
    this.toAddProductCategoryName = ''
  }
  addSubProductCategorySubmitPopup(){
    console.log("New Sub Product Category to add is "+this.toAddSubProductName + " under PRoduct Category "+this.selectedPopUpProductCategoryName)
    this.addSubproductCategory(this.selectedPopUpProductCategoryName,'0',this.toAddSubProductName,'0')
    
    this.toAddSubProductName = ''
  }

  addProductSubmitPopup(){
    console.log("New Product Category Selected "+ this.selectedproduct)
    console.log("New Product SubCategory selected  "+ this.selectedsubProduct)

    console.log("New Product name to add "+ this.toAddProductName)
    console.log("New Product quantity to add "+ this.toAddProductQuantity)
    
    this.addNewProduct(this.selectedproduct,this.selectedsubProduct,this.toAddProductName,this.toAddProductQuantity)
   
  }

}
