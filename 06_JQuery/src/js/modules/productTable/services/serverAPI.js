import $ from 'jquery';

export class ServerAPI {
    constructor(pathUrl) {
        this.host = pathUrl.host;

        this.getUrl = this.host + pathUrl.getUrl;
        this.addUrl = this.host + pathUrl.postUrl;
        this.deleteUrl = this.host + pathUrl.deleteUrl;
        this.updateUrl = this.host + pathUrl.putUrl;
    }

    GET() {
        return new Promise(resolve => {
            fetch(this.getUrl).then(response => {
                if (response.ok) {
                    response = response.json();
                    return resolve(response);
                } else {
                    console.log(`Server Error. Error status: ${response.status}.`);
                }
            }).catch(error => console.log(error));
        });
    }

    POST(addedProduct) {
        new Promise((resolve, reject) => {
            $.ajax({
                url: this.addUrl,
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(addedProduct),
                success: data => resolve(data),
                error: error => reject(error),
            });
        });
    }

    PUT(productId, newProduct) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.updateUrl + productId,
                method: 'PUT',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(newProduct),
                success: data => resolve(data),
                error: error => reject(error),
            });
        });
    }

    DELETE(productId) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.deleteUrl + productId,
                method: 'DELETE',
                success: data => resolve(data),
                error: error => reject(error),
            });
        });
    }
}