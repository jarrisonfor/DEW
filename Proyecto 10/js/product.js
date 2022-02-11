$.ajax({
    method: 'GET',
    url: '/server/product.php',
    dataType: 'json',
    data: {
        product_id: getCookie('product_id'),
    },
    success: (data) => {
        $('.card-title').text(data.name);
        $('.price').text(data.price);
        $('.product-image').css('background-image', `url(${data.picture})`);
        $('.description').text(data.description);
        if (data.availability != 1) {
            $('.out-of-stock').css('display', 'block');
            $('.add-to-cart-button').attr('disabled', true).text('Out of stock');
        } else {
            $('.add-to-cart-button').on('click', () => {
                var json_str = getCookie('cart');
                if (json_str.length > 0) {
                    var cart = JSON.parse(json_str);
                    if (cart[data.id]) {
                        cart[data.id].quantity++;
                    } else {
                        cart[data.id] = {
                            quantity: 1,
                            price: data.price,
                            name: data.name
                        };
                    }
                } else {
                    var cart = {};
                    cart[data.id] = {
                        quantity: 1,
                        price: data.price,
                        name: data.name
                    };
                }
                var json_str = JSON.stringify(cart);
                setCookie('cart', json_str, 1);
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    showCloseButton: true,
                })
                Toast.fire({
                    icon: 'success',
                    title: 'Added to cart'
                })
            });
        }
    }
});