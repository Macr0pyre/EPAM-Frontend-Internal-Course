import '../scss/index.scss';

import { ProductTable } from './modules/productTable';
import { ServerAPI } from './modules/productTable/services/serverAPI';

class App {
    static init() {
        this.pathUrl = {
            host: 'https://api-crud-mongo.herokuapp.com',
            getUrl: '/api/v1/products',
            postUrl: '/api/v1/products/add',
            deleteUrl: '/api/v1/products/delete/',
            putUrl: '/api/v1/products/update/',
        };

        this.serverAPI = new ServerAPI(this.pathUrl);
        this.productTable = new ProductTable(this.serverAPI);
    }
}

App.init();