export class ProductModel {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.count = props.count;
        this.price = props.price;
        this.email = props.email;
        this.delivery = { country: 'Russia', city: ['Saratov'] };
    }
}