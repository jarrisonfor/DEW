Vue.component('menu-nav', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <button class="btn navbar-brand shadow-none" v-on:click="() => {this.pageChanger(1)}">{{name}}</button>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <button v-bind:class="[page === 1 ? 'active' : '', 'shadow-none', 'btn', 'nav-link']" v-on:click="() => {this.pageChanger(1)}">Products</button>
                    </li>
                    <li class="nav-item">
                        <button v-bind:class="[page === 2 ? 'active' : '', 'shadow-none', 'btn', 'nav-link']" v-on:click="() => {this.pageChanger(2)}">Contact</button>
                    </li>
                    <li class="nav-item">
                        <button v-bind:class="[page === 3 ? 'active' : '', 'shadow-none', 'btn', 'nav-link']" v-on:click="() => {this.pageChanger(3)}">About</button>
                    </li>
                </ul>
                <div class="d-flex">
                    <button class="shadow-none btn mr-1" v-on:click="() => {this.pageChanger(4)}"><i class="bi bi-person-fill"></i></button>
                    <button class="shadow-none btn ml-1" v-on:click="() => {this.pageChanger(6)}"><i class="bi bi-cart-fill"></i></button>
                </div>
            </div>
        </div>
    </nav>
    `,
    props: ['pageChanger', 'page', 'name'],
})