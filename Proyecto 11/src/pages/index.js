Vue.component('index', {
    template: `
    <div>
        <h3 class="h3">Product List </h3>
        <select v-model="category" class="form-select mb-4 mt-4">
            <option value="" selected>Select a category</option>
            <option value="kitchen">Kitchen</option>
            <option value="laundry">Laundry Room</option>
        </select>
        <div class="row" id="product-list">
            <div class="col-md-3 col-sm-6 product" v-for="(product, index) in productList" v-on:click="() => {selectProduct(product.id)}">
                <div class="product-grid">
                    <div class="product-image">
                        <img class="pic-1" v-bind:src="product.picture">
                    </div>
                    <div class="product-content">
                        <h3 class="title">{{product.name}}</h3>
                        <div class="price">
                            {{product.price}}€
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    props: ['changePage', 'setCookie'],
    data: function () {
        return {
            productList: [],
            category: '',
        }
    },
    methods: {
        selectProduct: function (product_id) {
            this.setCookie('product_id', product_id, 1);
            this.changePage(7);
        }
    },
    watch: {
        category: function (val) {
            $.ajax({
                method: 'GET',
                url: '/server/products.php?category=' + val,
                success: (data) => {
                    this.productList = data;
                },
                error: () => {
                    Toast.fire({
                        icon: 'error',
                        title: 'Server error'
                    })
                }
            });
        }
    },
    mounted: function () {
        $.ajax({
            method: 'GET',
            url: '/server/products.php',
            success: (data) => {
                this.productList = data;
            },
            error: () => {
                Toast.fire({
                    icon: 'error',
                    title: 'Server error'
                })
            }
        });
    }
})