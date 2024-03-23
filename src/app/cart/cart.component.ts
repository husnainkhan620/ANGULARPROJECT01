import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductService } from '../product-service';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  title = 'Cart Status';

  cartItems !:CartItem[];

  constructor(private productService : ProductService,private cartService : CartService,private route : ActivatedRoute){

  }


  ngOnInit(): void {
    this.cartItems  = this.cartService.getItems()
  }


}
