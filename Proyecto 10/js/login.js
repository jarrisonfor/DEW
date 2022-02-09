function checkForm() {
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
                alert(data.message);
            } else {
                setCookie('user_id', data.user_id, 1);
            }
        },
        error: (data) => {
            alert('Error in server');
        }
    });
}

$('#formButton').click(checkForm);
