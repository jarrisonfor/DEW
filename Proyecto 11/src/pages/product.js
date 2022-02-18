Vue.component('product', {
    template: `
    <div class="product-card card">
        <div class="card-body">
            <h3 class="card-title">{{name}}</h3>
            <div class="row">
                <div class="col-lg-5 col-md-5 col-sm-6 images">
                    <div class="white-box text-center product-image" v-bind:style="{ 'background-image': 'url(' + picture + ')' }">
                    </div>
                    <div class="text-center product-image out-of-stock" v-if="!availability">
                    </div>
                </div>
                <div class="col-lg-7 col-md-7 col-sm-6">
                    <h4 class="box-title mt-5">Product description</h4>
                    <p class="description">{{description}}</p>
                    <table>
                        <tr>
                            <td>
                                <button class="btn btn-dark btn-rounded mr-1 add-to-cart-button" data-toggle="tooltip" title="" data-original-title="Add to cart" :disabled="!availability" v-on:click="() => {this.addToCart()}">
                                    <i class="fa fa-shopping-cart"></i>
                                    <span v-if="!availability"> Out of stock</span>
                                </button>
                            </td>
                            <td><span class="price">{{price}}</span>€</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    `,
    props: ['getCookie', 'setCookie'],
    data: function () {
        return {
            name: '',
            price: 0,
            picture: '',
            description: '',
            availability: true,
            id: 0,
        }
    },
    mounted: function () {
        $.ajax({
            method: 'GET',
            url: '/server/product.php',
            dataType: 'json',
            data: {
                product_id: this.getCookie('product_id'),
            },
            success: (data) => {
                this.name = data.name;
                this.price = data.price;
                this.picture = data.picture;
                this.description = data.description;
                this.availability = data.availability == 1 ? true : false;
                this.id = data.id;
            }
        });
    },
    methods: {
        addToCart: function () {
            if (!this.availability) {
                return;
            }
            var json_str = this.getCookie('cart');
            if (json_str.length > 0) {
                var cart = JSON.parse(json_str);
                if (cart[this.id]) {
                    cart[this.id].quantity++;
                } else {
                    cart[this.id] = {
                        quantity: 1,
                        price: this.price,
                        name: this.name
                    };
                }
            } else {
                var cart = {};
                cart[this.id] = {
                    quantity: 1,
                    price: this.price,
                    name: this.name
                };
            }
            var json_str = JSON.stringify(cart);
            this.setCookie('cart', json_str, 1);
            Toast.fire({
                icon: 'success',
                title: 'Added to cart'
            })
        }
    }
})