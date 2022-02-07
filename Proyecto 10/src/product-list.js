Vue.component('product-list', {
    template: `
    <div>
        <h3 class="h3">Product List </h3>
        <div class="row">
            <div class="col-md-3 col-sm-6 product" v-for="(product, index) in productList" >
                <div class="product-grid">
                    <div class="product-image">
                        <img class="pic-1" v-bind:src="product.picture">
                    </div>
                    <div class="product-content">
                        <h3 class="title">{{product.name}}</h3>
                        <div class="price">
                            {{product.price}}€
                        </div>
                        <span class="add-to-cart">ADD TO CART</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data: function() {
        return {
            productList: [],
        }
    },
    mounted: function() {
        $.ajax({
            method: 'GET',
            url: 'server/productos.php',
            success: (data) => {
                this.productList = data;
            }
        });
    }
})