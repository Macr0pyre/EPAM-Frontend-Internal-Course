import $ from 'jquery';
import { html } from '../templates/productTableHTML';

export class ProductTableViewModel {
    constructor(handlers, productTableModel) {
        this.$root = $('#product-table-root');
        this.$menu = $('#head-root');
        this.handlers = handlers;
        this.getProductRow = (product) => `
        <tr data-productId="${product.id}">
        <td><span><a href="#" class="text-primary" data-action="info" >${product.name}</a></span> <span class="badge rounded-pill bg-secondary">${product.count}</span></td>
        <td class="text-center">${product.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
        <td class="text-center">
            <button class="row-btn btn btn-warning" data-action="edit">Edit</button>
            <button class="row-btn btn btn-primary" data-action="delete">Delete</button>
        </td>
        </tr>`;
        this.productTableModel = productTableModel;
        this.productTableModel.products.then(response => {
            this.productTableModel.products = response.Data;
            this.render();
        });
    }

    render() {
        let rows = '';
        this.productTableModel.products.forEach((product) => {
            rows += this.getProductRow(product);
        });
        this.$menu.html(html.nav(this.productTableModel.products));
        this.$root.html(html.table(rows));
        this.deleteListners();
        this.initListeners();
    }

    renderNewProduct(product) {
        const $tbody = this.$root.find('tbody');
        $tbody.append(this.getProductRow(product));
    }

    openDeleteModal(event) {
        const id = $(event.target).closest('tr').attr('data-productId');
        this.handlers.openDeleteModal(id);
    }

    initListeners() {
        this.$root.on('click', '[data-action="delete"]', this.openDeleteModal.bind(this));
    }

    deleteListners() {
        this.$root.off('click');
    }
}