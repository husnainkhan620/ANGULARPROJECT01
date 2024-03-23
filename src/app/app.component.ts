import { Component, OnInit } from '@angular/core';
import { ProductHolder } from './product';
import { ProductService } from './product-service';
import { CartService } from './cart.service';
import { CartItem } from './cart';
declare var $: any 




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  products!:ProductHolder[];
  httpProducts!:ProductHolder[];
  errorMessage !: string;

  isLoaded !:boolean;
  displayProducts !: boolean

  constructor(private productService : ProductService,private cartService : CartService){}
  
  title = 'AngularProjectv01';
  total !: number ;
  cartItems !: CartItem[];

  badgeCartItems !: number;

  clearCart(){
    console.log("Inside clear cart")
  }

  ngOnInit(): void {
   /*
    $(function () {
      $('.example-popover').popover({
        container: 'body'
      })
    })
    */

    this.badgeCartItems = this.cartService.getItems().length
    var object = this
   
    $(document).ready(function(){
     
      $(function(){
        $("[data-toggle=popover]").popover({    //   $("[data-toggle=popover]").popover({
            html : true,
           
            title: function() {

              var title = $(this).attr("data-popover-content");
              var popoverheading = $(title).children(".popover-heading")

              var popovertitlespan = document.getElementById("popovertitlespan")
              if(popovertitlespan != null){
                console.log("Removing popovertitlespan")
                popovertitlespan.remove()
              }

              var subspan = document.createElement("span")
              subspan.setAttribute("id","popovertitlespan")
              subspan.innerHTML= "<div class = 'popoverheading'>" +object.cartService.getItems().length +" item(s) in Your Cart </div>"

              popoverheading.append(subspan) 

              return popoverheading.html();
            },
            content: function() {
              var popovercontentbodydiv = document.getElementById("popovercontentbodydiv")
              if(popovercontentbodydiv != null){
                console.log("Removing junk popovercontentbodydiv")
                popovercontentbodydiv.remove()
              }
              var checkoutdivid = document.getElementById("checkoutdivid")
              if(checkoutdivid != null){
                console.log("Removing junk checkoutdivid")
                checkoutdivid.remove()
              }
              
              

              console.log("getting the items ",object.cartService.getItems());
              object.cartItems =  object.cartService.getItems();
              var content = $(this).attr("data-popover-content");
              var popoverbody = $(content).children(".popover-content")
              
            
              var htmltemplate = "<div class = 'popovercontentbodydiv' id='popovercontentbodydiv' >"
              for(var i=0;i<object.cartService.getItems().length;i++){
                htmltemplate = htmltemplate + "<div class='samplecss'><img src = 'assets/images/lights.jpg' height='50px' width='50px' />"+object.cartService.getItems()[i].product.productName + "</span>"+ " <span  class='badge'> " + object.cartService.getItems()[i].productQuantity +"</span> </div>"
              }
              htmltemplate = htmltemplate+"</div> <div id='checkoutdivid'> <div class='horizontal-line'></div> <a href='/cart'><div class='button-viewcart'>View Cart</div></a> <a href='/checkout'><div class='button-checkout'>Check Out </div></a> </div>"


              console.log(htmltemplate) 
          
              popoverbody.append(htmltemplate)
              
              return popoverbody.html()  ;
            },
        });
    }
    );
    
    });

    
    this.isLoaded = false
    this.getProducts()
    this.getProductsFromHttp()

  }



  getProducts(){
    this.products = this.productService.getProducts()
    console.log(this.products)
  }

  getProductsFromHttp(){
    this.productService.getProductsFromHttp().subscribe({
      next:product => this.httpProducts = product,
      error : error => this.errorMessage = <any>error
    });
  }

  onmouseoverProductCategory(){
    console.log("onmouseoverProductCategory")
    console.log("onFocusProductCategory")
    
    if(!this.isLoaded)
    {
      var mainul = document.getElementById("productCategoryId")
      if(mainul != null){
        mainul.style.position='obsulute'
        mainul.style.padding='10'
        mainul.style.listStyleType='none'
        
      }
      for(var i=0;i<this.httpProducts.length;i++){
           
        
            var productCategoryli = document.createElement("li")
            productCategoryli.innerHTML = " <a ><span class='badge'>"+ this.httpProducts[i].productQuantity +  " </span> "+ this.httpProducts[i].productName + " </a>"
            productCategoryli.setAttribute("id", this.httpProducts[i].productName +"-li-Id")
            productCategoryli.style.width='300px'
            productCategoryli.style.padding='6px 6px'
      
            
            // creating a ul to hold the subproducts  data
            var subul = document.createElement("ul")
            subul.setAttribute("id", this.httpProducts[i].productName+"-ul-Id")
            subul.style.display='none'
            subul.style.listStyleType='none'

            for(var j=0;j<this.httpProducts[i].subProduct.length;j++){

              var subulli =  document.createElement("li")
              subulli.innerHTML = " <a><span class='badge'>"+ this.httpProducts[i].subProduct[j].subProductQuantity +  " </span> " + this.httpProducts[i].subProduct[j].subproductName +"</a>"
              subulli.setAttribute("id", this.httpProducts[i].productName+this.httpProducts[i].subProduct[j].subproductName+"Id")
              subulli.style.width='300px'
              subulli.style.padding='3px 3px'
              subul.appendChild(subulli)
              productCategoryli.appendChild(subul)
            }
            productCategoryli.addEventListener("mouseover",this.hoverOverProducrCategory)
            productCategoryli.addEventListener("mouseout",this.hoveroutProducrCategory)

            if(mainul != null)
              mainul.appendChild(productCategoryli)
      }

      this.isLoaded=true
    }
 
    
  }

  hoverOverProducrCategory(this: HTMLLIElement, ev: MouseEvent){
    
    var hoverinid = this.getAttribute("id")
    console.log("some junk "+hoverinid) 
    // replace li with ul in someid
    
      if(hoverinid != null )
      {
        hoverinid = hoverinid.replace("-li-","-ul-")
        let somevalue: HTMLElement | null = document.getElementById(hoverinid)
        if(somevalue != null){
          somevalue.style.display='block'
          
        }
      } 
    
  }

  hoveroutProducrCategory(this: HTMLLIElement, ev: MouseEvent){
    var hoveroutId = this.getAttribute("id")
    console.log("mouseout "+hoveroutId)
      
   if(hoveroutId != null)
   {
    hoveroutId = hoveroutId.replace("-li-","-ul-")
     let somevalue: HTMLElement | null = document.getElementById(hoveroutId)
     if(somevalue != null)
      somevalue.style.display='none'
   } 
  }
}

