Vue.component('login', {
    template: `
        <div class="login-container animated fadeInDown bootstrap snippets bootdeys">
            <h3 class="h3">Login</h3>
            <div class="loginbox bg-white pt-2">
                <i class="bi bi-person-fill"></i>
                <div class="loginbox-textbox">
                    <input type="text" class="form-control" placeholder="Email">
                </div>
                <div class="loginbox-textbox">
                    <input type="text" class="form-control" placeholder="Password">
                </div>
                <div class="loginbox-submit">
                    <input type="button" class="btn btn-primary btn-block" value="Login">
                </div>
                <div class="loginbox-register">
                    <button class="btn btn-link text-reset shadow-none" v-on:click="() => {this.pageChanger(5)}">Register</button>
                </div>
            </div>
        </div>
    `,
    props: ['pageChanger'],
})