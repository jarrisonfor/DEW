Vue.component('product-list', {
    template: `
    <div>
        <h3 class="h3">Product List </h3>
        <div class="row">
            <select v-model="category" class="form-select mb-4 mt-4">
                <option value="" selected>Select a category</option>
                <option value="kitchen">Kitchen</option>
                <option value="laundry">Laundry Room</option>
            </select>
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
    data: function () {
        return {
            productList: [],
            category: '',
        }
    },
    watch: {
        category: function (val) {
            $.ajax({
                method: 'GET',
                url: 'server/products.php?category=' + val,
                success: (data) => {
                    this.productList = data;
                }
            });
        }
    },
    mounted: function () {
        $.ajax({
            method: 'GET',
            url: 'server/products.php',
            success: (data) => {
                this.productList = data;
            }
        });
    }
})