Vue.component('login', {
    template: `
    <div class="login-container animated fadeInDown bootstrap snippets bootdeys">
        <h3 class="h3">Login</h3>
        <div class="loginbox bg-white pt-2">
            <i class="bi bi-person-fill"></i>
            <form>
                <div class="loginbox-textbox">
                    <input type="email" class="form-control" id="email" placeholder="Email" required>
                </div>
                <div class="loginbox-textbox">
                    <input type="password" class="form-control" id="password" placeholder="Password"
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
    props: ['pageChanger'],
})