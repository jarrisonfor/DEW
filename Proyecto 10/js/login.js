if (getCookie('user_id').length > 0) {
    document.location.href = "/";
}

function checkForm(e) {
    e.preventDefault();
    let email = $('#email');
    let password = $('#password');
    $.ajax({
        url: "/server/users.php",
        type: "POST",
        dataType: 'json',
        data: {
            email: email.val(),
            password: password.val(),
        },
        success: (data) => {
            if (data.status == 'error') {
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
                    title: data.message
                })
            } else {
                console.log(data);
                setCookie('user_id', data.id, 1);
                document.location.href = "/";
            }
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
