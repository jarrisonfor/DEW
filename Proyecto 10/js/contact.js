if (getCookie('user_id').length == 0) {
    document.location.href = "/html/login.html";
}

function checkForm(e) {
    e.preventDefault();
    let name = $('#name');
    let email = $('#email');
    let message = $('#message');
    $.ajax({
        url: "/server/contact.php",
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
                title: 'Email has been sent!'
            })
            name.val('');
            email.val('');
            message.val('');
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
$('form').submit(checkForm);