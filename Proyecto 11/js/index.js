class Index {
    _loadProductList = (data) => {
        let productList = $('#product-list');
        productList.empty();
        data.forEach(product => {
            let productJquery = $(`
                <div class="col-md-3 col-sm-6 product">
                    <div class="product-grid">
                        <div class="product-image">
                            <img class="pic-1" src="${product.picture}">
                        </div>
                        <div class="product-content">
                            <h3 class="title">${product.name}</h3>
                            <div class="price">
                                ${product.price}€
                            </div>
                        </div>
                    </div>
                </div>
            `);
            productJquery.click(() => {
                this.setCookie('product_id', product.id, 1);
                this.pageChanger(7);
            });
            productList.append(productJquery);
        });
    }

    init = () => { // Function to initialize the carousel
        $.ajax({
            method: 'GET',
            url: '/server/products.php',
            success: this._loadProductList
        });

        $('#category').on('change', (e) => {
            let category = $(e.target).val();
            $.ajax({
                method: 'GET',
                url: '/server/products.php',
                data: {
                    category: category
                },
                success: this._loadProductList,
                error: () => {
                    Toast.fire({
                        icon: 'error',
                        title: 'Server error'
                    })
                }
            });
        });
    }

}

let index = new Index();
index.init();