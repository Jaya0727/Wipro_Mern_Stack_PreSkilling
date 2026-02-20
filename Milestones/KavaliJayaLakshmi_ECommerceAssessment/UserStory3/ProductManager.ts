enum Category {
    Electronics = "Electronics",
    Clothing = "Clothing",
    Books = "Books"
}
interface IProduct {
    id: number;
    name: string;
    category: Category;
    price: number;
    stock: number;
}
function logChange(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`Change detected in ${propertyKey}`);
        return originalMethod.apply(this, args);
    };
}
class Product implements IProduct {
    constructor(
        public id: number,
        public name: string,
        public category: Category,
        public price: number,
        public stock: number
    ) {}
    @logChange
    updatePrice(newPrice: number): void {
        this.price = newPrice;
    }
    @logChange
    updateStock(newStock: number): void {
        this.stock = newStock;
    }
}

const products: [number, Product][] = [];
products.push([1, new Product(1, "SmartPhone", Category.Electronics, 55000, 10)]);
products.push([2, new Product(2, "HeadPhones", Category.Books, 2500, 30)]);
products.push([3, new Product(3, "Backpack", Category.Clothing, 1200, 20)]);
products.push([4, new Product(4, "Book", Category.Books, 500, 20)]);

for (const [id, product] of products) {
    console.log(
        `ID: ${id}, Name: ${product.name}, Category: ${product.category}, Price: ₹${product.price}, Stock: ${product.stock}`
    );
}
products[0][1].updatePrice(52000);
products[0][1].updateStock(8);
