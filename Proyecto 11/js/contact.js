if (session.getCookie('user_id').length == 0) {
    document.location.href = "/html/login.html";
}

class Contact {
    init = () => { // Function to initialize the carousel
        $('form').submit(function (e) {
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
                success: () => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Email has been sent!'
                    })
                    name.val('');
                    email.val('');
                    message.val('');
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

let contact = new Contact();
contact.init();
