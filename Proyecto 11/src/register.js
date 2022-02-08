Vue.component('register', {
    template: `
    <div class="login-container animated fadeInDown bootstrap snippets bootdeys">
        <h3 class="h3">Register</h3>
        <div class="loginbox bg-white pt-2">
            <i class="bi bi-person-fill"></i>
            <div class="loginbox-textbox">
                <input type="text" v-model="name" class="form-control" placeholder="Name">
            </div>
            <div class="loginbox-textbox">
                <input type="text" v-model="email" class="form-control" placeholder="Email">
            </div>
            <div class="loginbox-textbox">
                <input type="password" v-model="password" class="form-control" placeholder="Password">
            </div>
            <div class="loginbox-textbox">
                <input type="password" v-model="repeatPassword" class="form-control" placeholder="Repeat Password">
            </div>
            <div class="loginbox-submit">
                <input type="button" class="btn btn-primary btn-block" v-on:click="checkForm" value="Register">
            </div>
            <div class="loginbox-register">
                <button class="btn btn-link text-reset shadow-none" v-on:click="() => {this.pageChanger(4)}">Login</button>
            </div>
        </div>
    </div>
    `,
    props: ['pageChanger'],
    data: function () {
        return {
            name: '',
            email: '',
            password: '',
            repeatPassword: '',
        }
    },
    mounted: function () {
        /* si el usuario ya esta logeado cookie (user_id), redirigir a pagina princial */
        if (this.getCookie('user_id')) {
            this.pageChanger(1);
        }
    },
    methods: {
        setCookie: function (cname, cvalue, exdays) {
            const d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        },
        getCookie: function (cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        checkForm: function (e) {
            if (this.name.match(/^[a-zA-Z0-9]{3,20}$/) && this.email.match(/^[a-zA-Z0-9]{3,20}@[a-zA-Z0-9]{3,20}.[a-zA-Z0-9]{3,20}$/) && this.password.match(/^[a-zA-Z0-9]{3,20}$/) && this.repeatPassword.match(/^[a-zA-Z0-9]{3,20}$/)) {
                if (this.password === this.repeatPassword) {
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
                            /* si el usuario ya existe en el sistema, dar error, si no inicializar cookie y redirigir a pagina principal*/
                            if (data.status == 'error') {
                                alert(data.message);
                            } else {
                                this.setCookie('user_id', data.user_id, 1);
                                this.pageChanger(1);
                            }
                        },
                        error: (data) => {
                            alert('Error in server');
                        }
                    });
                } else {
                    alert('Password and Repeat Password are not the same');
                }
            } else {
                alert('Invalid data');
            }
        }
    }
})