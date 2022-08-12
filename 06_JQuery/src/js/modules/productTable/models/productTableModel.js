export class ProductTableModel {
    constructor(serverAPI) {
        this.serverAPI = serverAPI;
        this.products = this.getProducts();
    }

    getProducts() {
        return this.serverAPI.GET();
    }

    addProduct(product) {
        this.products.serverAPI.POST(product);
    }

    deleteProduct(product) {
        return this.serverAPI.DELETE(product.id);
    }

    editProduct(product) {
        return this.serverAPI.PUT(product.id, product);
    }
}