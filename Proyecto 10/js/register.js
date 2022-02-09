function checkForm() {
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

    if (email.val().match(/^[a-zA-Z0-9]{3,20}@[a-zA-Z0-9]{3,20}.[a-zA-Z0-9]{3,20}$/)) {
        email.removeClass('is-invalid');
        email.addClass('is-valid');
    } else {
        email.removeClass('is-valid');
        email.addClass('is-invalid');
    }

    if (password.val().match(/^[a-zA-Z0-9]{3,20}$/)) {
        password.removeClass('is-invalid');
        password.addClass('is-valid');
    } else {
        password.removeClass('is-valid');
        password.addClass('is-invalid');
    }

    if (repeatPassword.val().match(/^[a-zA-Z0-9]{3,20}$/) && repeatPassword.val() == password.val()) {
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
                toastr["error"](data.message);
            } else {
                setCookie('user_id', data.user_id, 1);
                document.location.href = "/";
            }
        },
        error: (data) => {
            toastr["error"]("Server error");
        }
    });

}

$('#formButton').click(checkForm);
