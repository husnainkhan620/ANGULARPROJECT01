import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ProductService } from './product-service';
import { Product, SubProduct } from './product';
import { NewProductHolder } from './new-product-holder';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  products!:Product[];
  
  httpProducts!:Product[];
  errorMessage !: string;
  dropdownSelectedProduct !: Product;
  selectedProductIndex !: number;
  selectedPopUpProductName !: string;

  toAddProductCategoryName !: string;
  toAddSubProductName !: string;
  addedSubProduct !: Product;

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
    this.selectedProductIndex = 0;
    this.selectedPopUpProductName = 'Embedded Electronics'
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
    let subProduct : SubProduct[] = []; // create empty arraysubProduct 
    this.productService.addProductCategory({productName,productQuantity,subProduct}).subscribe(({next:product => this.httpProducts.push(product)}))
  }

  addSubproductCategory(productName:string,productQuantityParam : string,subproductName :string ,subProductQuantityParam : string ){
    console.log("Sub Product to add :" + productName,productQuantityParam,subproductName,subProductQuantityParam)
    let productQuantity = parseInt(productQuantityParam)
    let subProductQuantity = parseInt(subProductQuantityParam)
    let subProduct : SubProduct[] = []; // create empty arraysubProduct
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
                  let addedsubProduct = new SubProduct()
                  addedsubProduct.subproductName = justAddedSubproductName
                  addedsubProduct.subProductQuantity = 0
                  this.httpProducts[i].subProduct.push(addedsubProduct)
                }
            }
          }
         
        }
      }))
  }
 
  productSelected(productSelected : string){
      console.log("Product Selected "+productSelected)
      this.selectedproduct = productSelected
      for(var i=0;i< this.httpProducts.length ;i++ ){
        if(this.httpProducts[i].productName == productSelected){
          this.selectedProductIndex = i
          console.log("Drop down selected index "+this.selectedProductIndex)
          break;
        }
      }   
  }

  productFromPopUp( ){
    console.log("Pop up Productselected "+this.selectedPopUpProductName)
  }
  
  subProductSelected(subProductSelected : string){
      this.selectedsubProduct = subProductSelected
      console.log("sub product selected "+subProductSelected)
  }

  addProductCategorySubmitPopup(){
    console.log("New Product Category to add is "+this.toAddProductCategoryName)
    this.addProductCategory(this.toAddProductCategoryName,'0');
   
    this.toAddProductCategoryName = ''
  }
  addSubProductSubmitPopup(){
    console.log("New Sub Product Category to add is "+this.toAddSubProductName + " under PRoduct Category "+this.selectedPopUpProductName)
    this.addSubproductCategory(this.selectedPopUpProductName,'0',this.toAddSubProductName,'0')
    
    this.toAddSubProductName = ''
  }

  addProductSubmitPopup(){
    console.log("New Product Category Selected "+ this.selectedproduct)
    console.log("New Product SubCategory selected  "+ this.selectedsubProduct)

    console.log("New Product name to add "+ this.toAddProductName)
    console.log("New Product quantity to add "+ this.toAddProductQuantity)
    
    this.addNewProduct(this.selectedproduct,this.selectedsubProduct,this.toAddProductName,this.toAddProductQuantity)
   
  }

  products1  = [
    { productId:129,productName:'Embedded Electronics',
        subProduct:[
            {subProductId:17,subproductName:'Development'},
            {subProductId:5,subproductName:'Audio Speech'},
            {subProductId:1,subproductName:'Ethernet'},
            {subProductId:6,subproductName:'USB-R232-Serial'},
            {subProductId:17,subproductName:'Wireless Communications'},
            {subProductId:5,subproductName:'Lora'},
            {subProductId:1,subproductName:'Barcode'},
            {subProductId:6,subproductName:'ESP32 Series'},
            {subProductId:2,subproductName:'ESP8266 Series'},
            {subProductId:6,subproductName:'Remote Control'},
            {subProductId:4,subproductName:'USB Host'},
            {subProductId:0,subproductName:'Measurement'},
            {subProductId:1,subproductName:'Displays'},
            {subProductId:67,subproductName:'Sensors'},
            {subProductId:1,subproductName:'Printing'}
          ]},
    { productId:841,productName:'Connecters' ,
        subProduct:[
          {subProductId:94,subproductName:'JST XH 2.5mm'},
          {subProductId:74,subproductName:'JST PH 2.0mm'},
          {subProductId:79,subproductName:'JST 1.25mm'},
          {subProductId:8,subproductName:' JST VH 3.96mm'},
          {subProductId:13,subproductName:'CPU CH 3.96mm'},
          {subProductId:3,subproductName:'JST SM'},
          {subProductId:21,subproductName:'Berg 2.5mm'},
          {subProductId:53,subproductName:'Mini Fit'},
          {subProductId:42,subproductName:'FRC IDC Flat Cable-Box Header'},
          {subProductId:109,subproductName:'FFC-FPC-1mm'},
          {subProductId:30,subproductName:'FFC-FPC-0.5mm'},
          {subProductId:20,subproductName:'Header Strips'},
          {subProductId:43,subproductName:'USB'},
          {subProductId:14,subproductName:'Screw Terminal Fixed'},
          {subProductId:10,subproductName:'Screw Terminal Plugged'},
          {subProductId:7,subproductName:'Signals'},
          {subProductId:9,subproductName:'Battery Holder'},
          {subProductId:28,subproductName:'Power DC'},
          {subProductId:15,subproductName:'Power AC'},
          {subProductId:7,subproductName:'IC Socket'},
          {subProductId:28,subproductName:'D-Type'},
          {subProductId:7,subproductName:'Memory Card'},
          {subProductId:8,subproductName:'Sim Card Holders'},
          {subProductId:8,subproductName:'Banana Terminals'},
          {subProductId:13,subproductName:'Round Shell'},
          {subProductId:7,subproductName:'Audio Stereo'},
          {subProductId:4,subproductName:'Video HDMI'},
          {subProductId:9,subproductName:'Ethernet'},
          {subProductId:9,subproductName:'Wire to Wire'},
          {subProductId:10,subproductName:'Wires'},
          {subProductId:13,subproductName:'Wire Crimp Terminals'},
          {subProductId:22,subproductName:'Ferrule(Bootlace)'},
          {subProductId:23,subproductName:'Quick Disconnect Terminal'},
          {subProductId:1,subproductName:'Waterproof Connecters'}
       ]},
    { productId:201,productName:'Switches' ,
        subProduct:[
          {subProductId:46,subproductName:'6*6mm Size'},
          {subProductId:10,subproductName:'12*12mm Size'},
          {subProductId:14,subproductName:'12*12*7.3mm Omran B3F Series'},
          {subProductId:12,subproductName:'SMD Switces'},
          {subProductId:5,subproductName:'Switches with LEDs'},
          {subProductId:13,subproductName:'Slide Switches'},
          {subProductId:6,subproductName:'Membrane/Matrix'},
          {subProductId:9,subproductName:'Navigation'},
          {subProductId:18,subproductName:'Rocker'},
          {subProductId: 8,subproductName:'Push ON/OFF'},
          {subProductId:16,subproductName:'Panel Mount'},
          {subProductId:3,subproductName:'Limit'},
          {subProductId:1,subproductName:'Toggle'},
          {subProductId:26,subproductName:'DIP'},
          {subProductId:2,subproductName:'Key Switches'},
          {subProductId:6,subproductName:'6*6*7.3mm Size'},
          {subProductId:3,subproductName:'Switch Cap Silicone'},
          {subProductId:3,subproductName:'Thumbwheel Switch'}
      ]},
    { productId:544,productName:'Passive componets',
        subProduct:[
          {subProductId: 0,subproductName:' '},
          {subProductId:0,subproductName:''},
          {subProductId:0,subproductName:''}
      ]},
    { productId:308,productName:'Active Components',
      subProduct:[
        {subProductId: 0,subproductName:' '},
        {subProductId:0,subproductName:''},
        {subProductId:0,subproductName:''}
      ]},
    { productId:52,productName:'Power Supply' ,
      subProduct:[
        {subProductId: 0,subproductName:' '},
        {subProductId:0,subproductName:''},
        {subProductId:0,subproductName:''}
     ]},
    { productId:45,productName:'OptoElectronics',
      subProduct:[
        {subProductId: 0,subproductName:' '},
        {subProductId:0,subproductName:''},
        {subProductId:0,subproductName:''}
      ]},
    { productId:97,productName:'Prototyping and Testing',
      subProduct:[
        {subProductId: 0,subproductName:' '},
        {subProductId:0,subproductName:''},
        {subProductId:0,subproductName:''}
      ]},
    { productId:35,productName:'Circuit Protection' ,
      subProduct:[
        {subProductId: 0,subproductName:' '},
        {subProductId:0,subproductName:''},
        {subProductId:0,subproductName:''}
      ]},
    { productId:139,productName:'Hardware',
      subProduct:[
        {subProductId: 0,subproductName:' '},
        {subProductId:0,subproductName:''},
        {subProductId:0,subproductName:''}
    ]},
    { productId:2390,productName:'All Products',subProduct:[]}
  ]

}

