Vue.component('cart', {
    template: `
    <div class="cart">
        <h3 class="h3">Cart</h3>
        <div class="row justify-content-center">
            <div class="col-lg-10 col-xl-8">
                <div class="cart-container"  v-if="this.cart.length > 0">
                    <div class="cart-head">
                        <div class="table-responsive">
                            <table class="table table-borderless">
                                <thead>
                                    <tr>
                                        <th scope="col">Action</th>
                                        <th scope="col">Product</th>
                                        <th scope="col">Qty</th>
                                        <th scope="col">Price</th>
                                        <th scope="col" class="text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody class="cart-list">
                                    <tr v-for="(product, index) in cart">
                                        <td><button class="text-danger shadow-none btn" v-on:click="() => {deleteRow(index)}"><i class="bi bi-trash-fill"></i></button></td>
                                        <td>{{product.name}}</td>
                                        <td>
                                            <div class="form-group mb-0">
                                                {{product.quantity}}
                                            </div>
                                        </td>
                                        <td>{{product.price}}€</td>
                                        <td class="text-right">{{Math.round(product.quantity * product.price)}}€</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="cart-body">
                        <div class="row">
                            <div class="col-md-12 order-2 order-lg-1 col-lg-5 col-xl-6">
                            </div>
                            <div class="col-md-12 order-1 order-lg-2 col-lg-7 col-xl-6">
                                <div class="order-total table-responsive ">
                                    <table class="table table-borderless text-right">
                                        <tbody>
                                            <tr>
                                                <td class="f-w-7 font-18">
                                                    <h4>Total Amount :</h4>
                                                </td>
                                                <td class="f-w-7 font-18">
                                                    <h4 class="totalAmount">{{totalAmount}}€</h4>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cart-footer text-right">
                        <button class="btn btn-success my-1 order" v-on:click="() => {this.checkout()}">Proceed to Checkout<i
                                class="ri-arrow-right-line ml-2"></i></button>
                    </div>
                </div>
                <div class="cart-container" v-else>
                    <div class="cart-body">
                        <div class="row">
                            <div class="col-md-12 order-2 order-lg-1 col-lg-5 col-xl-6">
                                <h4 class="text-center">Your cart is empty :( add some products!</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    props: ['changePage', 'getCookie', 'setCookie', 'isUserLogged'],
    data: function () {
        return {
            totalAmount: 0,
            cart: [],
        }
    },
    mounted: function () {
        if (!this.isUserLogged) {
            Toast.fire({
                icon: 'error',
                title: 'You need to be logged in to see de cart'
            })
            this.changePage(4);
        }
        this.cart = this.cartArray;
    },
    computed: {
        getCartObject: function () {
            let json_str = this.getCookie('cart');
            if (json_str.length > 0) {
                return JSON.parse(json_str);
            }
            return {};
        },
        cartArray: function () {
            let cart = [];
            let cartObject = this.getCartObject;
            Object.keys(cartObject).forEach((key) => {
                cartObject[key].id = key;
                cart.push(cartObject[key]);
                this.totalAmount += Math.round(cartObject[key].quantity * cartObject[key].price);
            });
            return cart;
        },

    },
    methods: {
        cartArrayToObject: function () {
            let cartObject = {};
            this.cart.forEach((product) => {
                cartObject[product.id] = product;
            });
            return cartObject;
        },
        deleteRow: function (index) {
            this.cart.splice(index, 1);
            this.totalAmount = 0;
            this.cart.forEach((product) => {
                this.totalAmount += Math.round(product.quantity * product.price);
            });
            this.setCookie('cart', JSON.stringify(this.cartArrayToObject()));
        },
        checkout: function () {
            if (this.cart.length <= 0) {
                return;
            }
            let order = {};
            order.user_id = this.getCookie('user_id');
            order.products = [];
            let cart = this.cartArrayToObject();
            Object.keys(cart).forEach(function (key) {
                order.products.push({
                    product_id: key,
                    quantity: cart[key].quantity
                });
            });
            $.ajax({
                url: '/server/orders.php',
                type: 'POST',
                data: order,
                success: () => {
                    this.setCookie('cart', '', -1);
                    this.cart = [];
                    this.totalAmount = 0;
                    Toast.fire({
                        icon: 'success',
                        title: 'Ordered successfully!'
                    });
                    this.changePage(4);
                },
                error: (error) => {
                    Toast.fire({
                        icon: 'error',
                        title: 'Server error'
                    })
                }
            });
        }
    }
})