Vue.component('register', {
    template: `
    <div class="login-container animated fadeInDown bootstrap snippets bootdeys">
        <h3 class="h3">Register</h3>
        <div class="loginbox bg-white pt-2">
            <i class="bi bi-person-fill"></i>
            <form @submit="checkForm">
                <div class="loginbox-textbox">
                    <input type="text" v-model="name" v-bind:class="[nameClass, 'form-control']" placeholder="Name" >
                    <div class="invalid-feedback">
                        The name need has 3 letters or more.
                    </div>
                </div>
                <div class="loginbox-textbox">
                    <input type="email" v-model="email" v-bind:class="[emailClass, 'form-control']" placeholder="Email">
                    <div class="invalid-feedback">
                        The email need to be a valid email
                    </div>
                </div>
                <div class="loginbox-textbox">
                    <input type="password" v-model="password" v-bind:class="[passwordClass, 'form-control']" placeholder="Password">
                    <div class="invalid-feedback">
                        Need contain at least 12 digits with letters, numbers and one symbol.
                    </div>
                </div>
                <div class="loginbox-textbox">
                    <input type="password" v-model="repeatPassword" v-bind:class="[repeatPasswordClass, 'form-control']"
                        placeholder="Repeat Password">
                    <div class="invalid-feedback">
                        Dont match the password field.
                    </div>
                </div>
                <div class="loginbox-submit">
                    <input type="submit" class="btn btn-primary btn-block" value="Register">
                </div>
                <div class="loginbox-register">
                    <button class="btn btn-link text-reset shadow-none" v-on:click="() => {this.changePage(4)}">Login</button>
                </div>
            </form>
        </div>
    </div>
    `,
    props: ['changePage', 'isUserLogged', 'createSession'],
    data: function () {
        return {
            name: '',
            nameRegex: /^[a-zA-Z0-9]{3,20}$/,
            nameClass: '',
            email: '',
            emailRegex: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
            emailClass: '',
            password: '',
            passwordRegex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/,
            passwordClass: '',
            repeatPassword: '',
            repeatPasswordClass: '',
        }
    },
    mounted: function () {
        if (this.isUserLogged) {
            this.changePage(1);
        }
    },
    methods: {
        checkForm: function (e) {
            e.preventDefault();
            if (this.name.match(this.nameRegex)) {
                this.nameClass = 'is-valid';
            } else {
                this.nameClass = 'is-invalid';
            }

            if (this.email.match(this.emailRegex)) {
                this.emailClass = 'is-valid';
            } else {
                this.emailClass = 'is-invalid';
            }

            if (this.password.match(this.passwordRegex)) {
                this.passwordClass = 'is-valid';
            } else {
                this.passwordClass = 'is-invalid';
            }

            if (this.password.match(this.passwordRegex) && this.repeatPassword == this.password) {
                this.repeatPasswordClass = 'is-valid';
            } else {
                this.repeatPasswordClass = 'is-invalid';
                return false;
            }

            if (!this.name.match(this.nameRegex) || !this.email.match(this.emailRegex) || !this.password.match(this.passwordRegex)) {
                return false;
            }

            $.ajax({
                url: "/server/users.php",
                type: "POST",
                dataType: 'json',
                data: {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                },
                success: (data) => {
                    if (data.status == 'error') {
                        Toast.fire({
                            icon: 'error',
                            title: data.message
                        })
                    } else {
                        this.createSession(data.id);
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