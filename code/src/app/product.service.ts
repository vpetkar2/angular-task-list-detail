import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product, ProductInit } from "./product";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public productData :BehaviorSubject<Product> = new BehaviorSubject<Product>(new ProductInit);
  public addCartData :BehaviorSubject<Product> = new BehaviorSubject<Product>(new ProductInit);
  public removeCartData :BehaviorSubject<Product> = new BehaviorSubject<Product>(new ProductInit);
  public totalAmount :BehaviorSubject<number>= new BehaviorSubject<number>(0);
  private cartCollection: Array<Product> = [];

  constructor(private http: HttpClient) {

    this.addCartData.subscribe(data=>{
      var indx = this.cartCollection.findIndex(x => x.id==data.id);
      if(indx==-1) {
        this.cartCollection.push(data);
        this.totalCartAmount();
      }
    });

    this.removeCartData.subscribe(data=>{
      var indx = this.cartCollection.findIndex(x => x.id==data.id);
      if(indx!==-1) {
        this.cartCollection.splice(indx, 1);
        this.totalCartAmount();
      }
    });

  }

  totalCartAmount() {
    let amount = 0;
    this.cartCollection.forEach(element => {
      amount += element.amount;
    });
    this.totalAmount.next(amount);
  }

  getCartProducts():Observable<Array<Product>> {
    return of(this.cartCollection);
  }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>("./assets/Products.json");
  }
}
