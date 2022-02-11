if (session.getCookie('user_id').length == 0) {
    document.location.href = "/html/login.html";
}

class Cart {
    init = () => { // Function to initialize the carousel
        var json_str = session.getCookie('cart');
        var cart = {};
        if (json_str.length > 0) {
            cart = JSON.parse(json_str);
            $('.order').click(function () {
                let order = {};
                order.user_id = session.getCookie('user_id');
                order.products = [];
                Object.keys(cart).forEach(function (key) {
                    order.products.push({
                        product_id: key,
                        quantity: cart[key].quantity
                    });
                });
                $.ajax({
                    url: '/server/orders.php',
                    type: 'POST',
                    data: order,
                    success: (data) => {
                        session.setCookie('cart', '', -1);
                        $('.cart-list').html('<tr></tr>');
                        $('.totalAmount').text('0€');
                        $(this).attr('disabled', true).click(() => { return; });
                    },
                    error: (error) => {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            showCloseButton: true,
                        })
                        Toast.fire({
                            icon: 'error',
                            title: 'Server error'
                        })
                    }
                });
            });
        } else {
            $('.order').attr('disabled', true);
        }
        let totalAmount = 0;
        Object.keys(cart).forEach(function (key) {
            $('.cart-list').append(`
                <tr data-id="${key}">
                    <td><button class="text-danger shadow-none btn"><i class="bi bi-trash-fill"></i></button></td>
                    <td>${cart[key].name}</td>
                    <td>
                        <div class="form-group mb-0">
                            ${cart[key].quantity}
                        </div>
                    </td>
                    <td>${cart[key].price}€</td>
                    <td class="text-right">${Math.round(cart[key].quantity * cart[key].price)}€</td>
                </tr>
            `);
            totalAmount += Math.round(cart[key].quantity * cart[key].price);
        });
        $('.bi.bi-trash-fill').click(function () {
            let id = $(this).parent().parent().parent().attr('data-id');
            delete cart[id];
            session.setCookie('cart', JSON.stringify(cart));
            location.reload();
        });
        $('.totalAmount').text(totalAmount + '€');
    }

}

let cart = new Cart();
cart.init();
