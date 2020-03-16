export interface Product {
    id : number,
    productName : string,
    descShort : string,
    amount : number,
    category : string,
    makeYear : string,
    picture1 : string,
}

export class ProductInit {
    id : number;
    productName : string;
    descShort : string;
    amount : number;
    category : string;
    makeYear : string;
    picture1 : string;

    constructor() {
        this.id = 0;
        this.productName = "";
        this.descShort = "";
        this.amount = 0;
        this.category = "";
        this.makeYear = "";
        this.picture1 = "";
    }
}