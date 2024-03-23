export class ProductHolder {
    productName!: string;
    productQuantity!:number;
    subProduct!:SubProductHolder[];
}

export class SubProductHolder {
    subProductQuantity!:number;
    subproductName!:string;
}

export class NewProductHolder {
    selectedproduct !: string;
    selectedsubProduct !: string;
    toAddProductName !: string;
    toAddProductQuantity !: number;
}

export class ProductSubCategory{
	 productSubCategoryId !: number;
	 productSubCategoryName !: string;
	 productCategoryId !: number;
	 productCategoryName !: string;
	 productSubCategoryQuantity !: number;
}

export class ProductCategory {
    productCategoryId !: number;
	productCategoryName !: string;
	productCategoryQuantity !: number;
}

export class Product {
	productId !: number;
	productName !: string;
	productSubCategoryId !: number;
	productSubCategoryName !: string;
	productCategoryId !: number;
	productCategoryName !: string;
	productActive !: boolean;
	skucode !: string;
	productQuantity !: number;
}


export class ProductPageResult {
    content !: Product[];
    pageable !: any;
    last !: boolean
    totalPages !: number;
    totalElements !: number;
    size !: number;
    number !: number;
    sort !: any;
    first !: boolean;
    numberOfElements !: number;
    empty !: boolean;
}