import { Component } from '@angular/core';
import { ProductService } from "./product.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public total_amount = 0;

  constructor(private product_serv: ProductService) {
  }

  ngOnInit() {
    this.product_serv.totalAmount.subscribe(data => {
      this.total_amount = data;
    });
  }

}
