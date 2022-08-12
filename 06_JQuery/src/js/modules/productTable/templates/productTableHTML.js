const html = {
    nav: function(product) {
        return `
        <nav class="navbar-light bg-light">
        <input id="search-input" type="text" placeholder="Search" class="form-control mr-sm-2">
        <button class="btn btn-outline-success my-2 my-sm-0" data-action="search" data-productId="${product.name}">Искать</button>
        <button class="add-new btn btn-info" data-action="add" data-productId="${product.id}">Add New</button>
        </nav>`;
    },

    table: function(rows) {
        return `
    <table class="table table-bordered table-hover">
        <thead class="table-warning">
            <tr>
                <th class="text-center" data-sort="up">Name</th>
                <th class="text-center" data-sort="up">Price</th>
                <th class="text-center">Actions</th>
            </tr>
        </thead>
        <tbody>
            ${rows}
        </tbody>
    </table>`;
    },
};

export { html };