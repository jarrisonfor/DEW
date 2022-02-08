$.ajax({
    method: 'GET',
    url: 'server/products.php',
    success: (data) => {
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
                                <span class="add-to-cart">ADD TO CART</span>
                            </div>
                        </div>
                    </div>
            `);
            productList.append(productJquery);
        });
    }
});

$('#category').on('change', function () {
    let category = $(this).val();
    $.ajax({
        method: 'GET',
        url: 'server/products.php',
        data: {
            category: category
        },
        success: (data) => {
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
                                <span class="add-to-cart">ADD TO CART</span>
                            </div>
                        </div>
                    </div>
                `);
                productList.append(productJquery);
            });
        }
    });
});