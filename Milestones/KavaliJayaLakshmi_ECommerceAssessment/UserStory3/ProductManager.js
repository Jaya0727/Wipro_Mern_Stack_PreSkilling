var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Category;
(function (Category) {
    Category["Electronics"] = "Electronics";
    Category["Clothing"] = "Clothing";
    Category["Books"] = "Books";
})(Category || (Category = {}));
function logChange(target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("Change detected in ".concat(propertyKey));
        return originalMethod.apply(this, args);
    };
}
var Product = /** @class */ (function () {
    function Product(id, name, category, price, stock) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
    }
    Product.prototype.updatePrice = function (newPrice) {
        this.price = newPrice;
    };
    Product.prototype.updateStock = function (newStock) {
        this.stock = newStock;
    };
    __decorate([
        logChange
    ], Product.prototype, "updatePrice", null);
    __decorate([
        logChange
    ], Product.prototype, "updateStock", null);
    return Product;
}());
var products = [];
products.push([1, new Product(1, "SmartPhone", Category.Electronics, 55000, 10)]);
products.push([2, new Product(2, "HeadPhones", Category.Books, 2500, 30)]);
products.push([3, new Product(3, "Backpack", Category.Clothing, 1200, 20)]);
products.push([4, new Product(4, "Book", Category.Books, 500, 20)]);
for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
    var _a = products_1[_i], id = _a[0], product = _a[1];
    console.log("ID: ".concat(id, ", Name: ").concat(product.name, ", Category: ").concat(product.category, ", Price: \u20B9").concat(product.price, ", Stock: ").concat(product.stock));
}
products[0][1].updatePrice(52000);
products[0][1].updateStock(8);
