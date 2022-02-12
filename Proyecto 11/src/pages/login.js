Vue.component('login', {
    template: `
    <div class="login-container animated fadeInDown bootstrap snippets bootdeys">
        <h3 class="h3">Login</h3>
        <div class="loginbox bg-white pt-2">
            <i class="bi bi-person-fill"></i>
            <form @submit="checkForm">
                <div class="loginbox-textbox">
                    <input type="email" class="form-control" v-model="email" placeholder="Email" required>
                </div>
                <div class="loginbox-textbox">
                    <input type="password" class="form-control" v-model="password" placeholder="Password"
                        required>
                </div>
                <div class="loginbox-submit">
                    <input type="submit" class="btn btn-primary btn-block" value="Login">
                </div>
                <div class="loginbox-register">
                    <button class="btn btn-link text-reset shadow-none" v-on:click="() => {this.pageChanger(5)}">Register</button>
                </div>
            </form>
        </div>
    </div>
    `,
    props: ['pageChanger', 'getCookie', 'setCookie'],
    data: function () {
        return {
            email: '',
            password: '',
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
            $.ajax({
                url: "/server/users.php",
                type: "POST",
                dataType: 'json',
                data: {
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