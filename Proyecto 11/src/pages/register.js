Vue.component('register', {
    template: `
    <div class="login-container animated fadeInDown bootstrap snippets bootdeys">
        <h3 class="h3">Register</h3>
        <div class="loginbox bg-white pt-2">
            <i class="bi bi-person-fill"></i>
            <form @submit="checkForm">
                <div class="loginbox-textbox">
                    <input type="text" v-model="name" class="form-control" placeholder="Name">
                    <div class="invalid-feedback">
                        The name need has 3 letters or more.
                    </div>
                </div>
                <div class="loginbox-textbox">
                    <input type="email" v-model="email" class="form-control" placeholder="Email">
                    <div class="invalid-feedback">
                        The email need to be a valid email
                    </div>
                </div>
                <div class="loginbox-textbox">
                    <input type="password" v-model="password" class="form-control" placeholder="Password">
                    <div class="invalid-feedback">
                        Need contain at least 12 digits with letters, numbers and one symbol.
                    </div>
                </div>
                <div class="loginbox-textbox">
                    <input type="password" v-model="repeatPassword" class="form-control"
                        placeholder="Repeat Password">
                    <div class="invalid-feedback">
                        Dont match the password field.
                    </div>
                </div>
                <div class="loginbox-submit">
                    <input type="submit" class="btn btn-primary btn-block" value="Register">
                </div>
                <div class="loginbox-register">
                    <button class="btn btn-link text-reset shadow-none" v-on:click="() => {this.pageChanger(4)}">Login</button>
                </div>
            </form>
        </div>
    </div>
    `,
    props: ['pageChanger', 'getCookie', 'setCookie'],
    data: function () {
        return {
            name: '',
            email: '',
            password: '',
            repeatPassword: '',
        }
    },
    mounted: function () {
        if (this.getCookie('user_id').length > 0) {
            this.pageChanger(1);
        }
    },
    methods: {
        checkForm: function (e) {
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
                        Toast.fire({
                            icon: 'error',
                            title: data.message
                        })
                    } else {
                        console.log(data);
                        this.setCookie('user_id', data.id, 1);
                        this.pageChanger(1);
                    }
                },
                error: () => {
                    Toast.fire({
                        icon: 'error',
                        title: 'Server error'
                    })
                }
            });
        }
    }
})