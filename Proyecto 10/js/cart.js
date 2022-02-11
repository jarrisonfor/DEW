if (getCookie('user_id').length == 0) {
    document.location.href = "/html/login.html";
}

var json_str = getCookie('cart');
var cart = {};
if (json_str.length > 0) {
    cart = JSON.parse(json_str);
}
console.log(cart);

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

$('.totalAmount').text(totalAmount + '€');

function checkForm(e) {
    e.preventDefault();
    let name = $('#name');
    let email = $('#email');
    let message = $('#message');
    if (name && email && message) {
        $.ajax({
            url: "/server/orders.php",
            type: "POST",
            dataType: 'json',
            data: {
                name: name.val(),
                email: email.val(),
                message: message.val()
            },
            success: (data) => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'success',
                    title: 'Ordered!'
                })
                getCookie('cart', '', -1);
            },
            error: (data) => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'error',
                    title: 'Server error'
                })
            }
        });
    }
}
$('form').submit(checkForm);