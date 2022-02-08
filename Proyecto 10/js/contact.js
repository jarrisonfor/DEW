function checkForm(e) {
    e.preventDefault();
    let name = $('#name');
    let email = $('#email');
    let message = $('#message');
    if (name && email && message) {
        $.ajax({
            url: "http://localhost/server/contact.php",
            type: "POST",
            dataType: 'json',
            data: {
                name: name.val(),
                email: email.val(),
                message: message.val()
            },
            success: (data) => {
                toastr["success"]("Message sent successfully");
                name.val('');
                email.val('');
                message.val('');
            },
            error: (data) => {
                toastr["error"]("Message not sent");
            }
        });
    } else {
        toastr["info"]("Please fill all the fields");
    }
}
$('form').submit(checkForm);