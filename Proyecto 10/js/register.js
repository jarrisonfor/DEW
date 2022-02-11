if (getCookie('user_id').length > 0) {
    document.location.href = "/";
}

function checkForm(e) {
    e.preventDefault();
    let name = $('#name');
    let email = $('#email');
    let password = $('#password');
    let repeatPassword = $('#repeatPassword');

    if (name.val().match(/^[a-zA-Z0-9]{3,20}$/)) {
        name.removeClass('is-invalid');
        name.addClass('is-valid');
    } else {
        name.removeClass('is-valid');
        name.addClass('is-invalid');
    }

    if (email.val().match(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/)) {
        email.removeClass('is-invalid');
        email.addClass('is-valid');
    } else {
        email.removeClass('is-valid');
        email.addClass('is-invalid');
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/;

    if (password.val().match(passwordRegex)) {
        password.removeClass('is-invalid');
        password.addClass('is-valid');
    } else {
        password.removeClass('is-valid');
        password.addClass('is-invalid');
    }

    if (password.val().match(passwordRegex) && repeatPassword.val() == password.val()) {
        repeatPassword.removeClass('is-invalid');
        repeatPassword.addClass('is-valid');
    } else {
        repeatPassword.removeClass('is-valid');
        repeatPassword.addClass('is-invalid');
    }

    if (name.hasClass('is-invalid') || email.hasClass('is-invalid') || password.hasClass('is-invalid') || repeatPassword.hasClass('is-invalid')) {
        return false;
    }

    $.ajax({
        url: "/server/users.php",
        type: "POST",
        dataType: 'json',
        data: {
            name: name.val(),
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
                    showCloseButton: true,
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
                showCloseButton: true,
            })
            Toast.fire({
                icon: 'error',
                title: 'Server error'
            })
        }
    });

}

$('form').submit(checkForm);
