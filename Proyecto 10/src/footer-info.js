Vue.component('footer-info', {
    template: `
    <footer class="text-center text-lg-start bg-light text-muted fixed-bottom">
        <section>
            <div class="container text-center text-md-start mt-2">
                <div class="row mt-3">
                    <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                        <h6 class="text-uppercase fw-bold mb-4">
                            <i class="fas fa-gem me-3"></i>
                            Random Opinion
                        </h6>
                        <p>
                            {{ randomOpinion }}
                        </p>
                    </div>
                    <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-2">
                        <h6 class="text-uppercase fw-bold mb-4">
                            Products
                        </h6>
                        <div>
                            <button class="btn btn-link text-reset shadow-none" v-on:click="() => {this.pageChanger(0)}">Home</button>
                        </div>
                        <div>
                            <button class="btn btn-link text-reset shadow-none" v-on:click="() => {this.pageChanger(1)}">Products</button>
                        </div>
                        <div>
                            <button class="btn btn-link text-reset shadow-none" v-on:click="() => {this.pageChanger(2)}">Contact</button>
                        </div>
                        <div>
                            <button class="btn btn-link text-reset shadow-none" v-on:click="() => {this.pageChanger(3)}">About</button>
                        </div>
                    </div>
                    <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                        <h6 class="text-uppercase fw-bold mb-4">
                            Contact
                        </h6>
                        <div><i class="fas fa-home me-3"></i> New York, NY 10012, US</div>
                        <div>
                            <i class="fas fa-envelope me-3"></i>
                            info@example.com
                        </div>
                        <div><i class="fas fa-phone me-3"></i> + 01 234 567 88</div>
                        <div><i class="fas fa-print me-3"></i> + 01 234 567 89</div>
                    </div>
                </div>
            </div>
        </section>
        <div class="text-center p-1" style="background-color: rgba(0, 0, 0, 0.05);">
            © 2021 Copyright: My mega shop!
        </div>
    </footer>
    `,
    data() {
        return {
            randomOpinion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, quisquam.'
        }
    },
    props: ['pageChanger'],
    mounted: function () {
    },
})