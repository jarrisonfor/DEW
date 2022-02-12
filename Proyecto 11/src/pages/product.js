Vue.component('product', {
    template: `
    <div class="product-card card">
        <div class="card-body">
            <h3 class="card-title"></h3>
            <div class="row">
                <div class="col-lg-5 col-md-5 col-sm-6 images">
                    <div class="white-box text-center product-image">
                    </div>
                    <div class="text-center product-image out-of-stock">
                    </div>
                </div>
                <div class="col-lg-7 col-md-7 col-sm-6">
                    <h4 class="box-title mt-5">Product description</h4>
                    <p class="description"></p>
                    <table>
                        <tr>
                            <td><button class="btn btn-dark btn-rounded mr-1 add-to-cart-button"
                                    data-toggle="tooltip" title="" data-original-title="Add to cart">
                                    <i class="fa fa-shopping-cart"></i>
                                </button></td>
                            <td><span class="price"></span>€</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    `
})