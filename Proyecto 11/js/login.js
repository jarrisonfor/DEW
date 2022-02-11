if (session.getCookie('user_id').length > 0) {
    document.location.href = "/";
}

class Login {
    init = () => { // Function to initialize the carousel
        $('form').submit(function (e) {
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
                        Toast.fire({
                            icon: 'error',
                            title: data.message
                        })
                    } else {
                        session.setCookie('user_id', data.id, 1);
                        document.location.href = "/";
                    }
                },
                error: () => {
                    Toast.fire({
                        icon: 'error',
                        title: 'Server error'
                    })
                }
            });
        });
    }

}

let login = new Login();
login.init();
