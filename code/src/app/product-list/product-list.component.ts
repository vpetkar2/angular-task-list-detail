import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product, ProductInit } from "../product";
import { ProductService } from "../product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  public active_product : number = 0;
  public searchText: string = "";
  public product_data : Array<Product> = [];
  constructor(
    private product_serv: ProductService) { }

  ngOnInit() {
    this.product_serv.getProducts().subscribe(data => {
      this.product_data = data;
      this.product_serv.productData.next(this.product_data[0]);
    });
  }

  selectedProduct(indx, prod_id) {
    this.active_product = prod_id;
    this.product_serv.productData.next(this.product_data[indx]);
  }

}
