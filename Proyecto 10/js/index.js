function loadProductList(data) {
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
            setCookie('product_id', product.id, 1);
            document.location.href = '/html/product.html';
        });
        productList.append(productJquery);
    });
}

$.ajax({
    method: 'GET',
    url: '/server/products.php',
    success: loadProductList
});

$('#category').on('change', function () {
    let category = $(this).val();
    $.ajax({
        method: 'GET',
        url: '/server/products.php',
        data: {
            category: category
        },
        success: loadProductList
    });
});