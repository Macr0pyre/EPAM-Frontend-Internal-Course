import { ProductTableViewModel } from './viewModels/productTableViewModel';
import { ProductTableModel } from './models/productTableModel';
import { Modal } from './modules/modalWindowModule'

export class ProductTableController {
    constructor(serverAPI) {
        this.dataModel = new ProductTableModel(serverAPI);
        this.view = new ProductTableViewModel({
            openDeleteModal: this.openDeleteModal.bind(this),
        }, this.dataModel);
    }

    onSubmit(product) {
        product.count = +product.count;
        product.price = +product.price;
        product.delivery.city = [product.delivery.city];
        this.dataModel.deleteProduct(product).then(response => this.deleteProduct(response.Data));
    }

    deleteProduct(product) {
        const productIndex = this.dataModel.products.findIndex(product.id);
        this.dataModel.products.splice(productIndex, 1);
        this.veiw.render();
    }

    openDeleteModal(id) {
        const product = this.dataModel.products.find((item) => (item.id === id));
        const modal = new Modal(product, null, this.onSubmit.bind(this));
        modal.showDelete();
    }

}