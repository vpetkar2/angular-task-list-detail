import { Component, OnInit } from '@angular/core';
import { ProductService } from "../product.service";
import { Product, ProductInit } from "../product";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public product_id : number = 0;
  public isAvailableInCart: boolean = false;
  public prodData:Product = new ProductInit();
  constructor(private product_serv: ProductService) { }

  ngOnInit() {
    this.product_serv.productData.subscribe(data=>{
      this.prodData = data;
      this.product_id = data.id;
    });
  }

  addToCart(product) {
    this.product_serv.addCartData.next(product);
    this.product_id = product.id;
  }

  removeFromCart(product) {
    this.product_serv.removeCartData.next(product);
    this.product_id = product.id;
  }

  nextProduct(prod_id) {
    this.product_serv.getProducts().subscribe(products => {
      var indx = products.findIndex(x => x.id==prod_id);
      indx++;
      this.prodData = products[indx];
      this.product_id = prod_id;
    });
  }

  previousProduct(prod_id) {
    this.product_serv.getProducts().subscribe(products => {
      var indx = products.findIndex(x => x.id==prod_id);
      if(indx!=0) {
        indx--;
        this.prodData = products[indx];
        this.product_id = prod_id;
      }
    });
  }

  ngDoCheck() {
    this.product_serv.getCartProducts().subscribe(data => {
      if(data.length>=0) {
        var indx = data.findIndex(x => x.id==this.product_id);
        if(indx!==-1) {
          this.isAvailableInCart = true;
        } else {
          this.isAvailableInCart = false;
        }
      }
    });
  }
}