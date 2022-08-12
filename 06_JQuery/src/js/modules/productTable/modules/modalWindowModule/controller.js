// Действия на модальном окне создаем здесь дату модель 
import { ModalWindowModel } from "./models/modalWindowModel";
import { ModalWindowViewModel } from "./viewModels/modalWindowViewModel";
import { DeleteViewModel } from "./viewModels/deleteViewModel";


export class ModalController {
    constructor(initialState, onClose, onSubmit) {
        this.onSubmitAction = onSubmit;
        this.onCloseAction = onClose;
        this.dataModel = new ModalWindowModel(initialState);
        this.view = new ModalWindowViewModel({
            handlers: {
                onClose: this.onClose.bind(this),
                onSubmit: this.onSubmit.bind(this),
            },
        });
        this.deleteView = new DeleteViewModel({
            handlers: {
                onClose: this.onClose.bind(this),
                onSubmit: this.onSubmit.bind(this),
            },
        });
    }

    show() {
        this.view.showModal(this.dataModel);
    }

    showDelete() {
        this.deleteView.showModal(this.dataModel);
    }

    onSubmit() {
        this.onSubmitAction(this.dataModel);
        this.view.closeModal();
    }

    onClose() {
        this.onCloseAction && this.onCloseAction();
        this.view.closeModal();
    }
}