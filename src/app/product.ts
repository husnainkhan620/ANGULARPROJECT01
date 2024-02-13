


export class Product {
    productName!: string;
    productQuantity!:number;
    subProduct!:SubProduct[];
}

export class SubProduct {
    subProductQuantity!:number;
    subproductName!:string;
}

export class NewProductHolder {
    selectedproduct !: string;
    selectedsubProduct !: string;
    toAddProductName !: string;
    toAddProductQuantity !: number;
}

