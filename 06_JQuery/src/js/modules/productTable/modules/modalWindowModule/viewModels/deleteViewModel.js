import { ModalWindowViewModel } from './modalWindowViewModel';

export class DeleteViewModel extends ModalWindowViewModel {
    constructor(props) {
        super(props);
        this.bodyTemplate = (product) => (`
        <div class="popup__text">
        Are you sure you want to delete ${product.name}?
        </div>
    `);
    }

    initHandlers() {
        this.$modal.on('click', '[data-action="submit"]', this.handlers.onSubmit);
        this.$modal.on('click', '[data-action="close"]', this.handlers.onClose);
    }
}