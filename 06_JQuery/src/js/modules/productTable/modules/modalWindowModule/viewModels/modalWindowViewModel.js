import $ from 'jquery';

export class ModalWindowViewModel {
    constructor(props) {
        this.$modal = $('.popup');
        this.$document = $('body');
        this.handlers = props.handlers;
        this.titleTemplate = '<div class="popup__title">Are you sure?</div>';
        this.actionsTemplate = '<button class="btn btn-outline-success" data-action="submit">Yes</button> <button class="btn btn-outline-danger" data-action="close">No</button>';
        this.bodyTemplate = (product) => (
            `<div class="popup__text">
                Smth
            </div>`);

        this.template = (product) => (
            `<div class="popup__body">
                <div class="popup__content">
                    ${this.titleTemplate}
                    ${this.bodyTemplate(product)}
                    <div class="popup__btn">
                        ${this.actionsTemplate}
                    </div>
                </div>
            </div>`
        );
    }

    render(product) {
        this.$modal.addClass('open');
        this.$modal.append(this.template(product));
        this.initHandlers();
    }

    initHandlers() {
        this.$modal.on('click', '[data-action="submit"]', this.handlers.onSubmit);
        this.$modal.on('click', '[data-action="close"]', this.handlers.onClose);
    }

    showModal(product) {
        this.render(product);
    }

    closeModal() {
        this.$modal.empty();
        this.$modal.removeClass('open');
        this.deleteListeners();
    }
}