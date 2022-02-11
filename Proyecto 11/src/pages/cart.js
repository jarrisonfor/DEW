Vue.component('cart', {
    template: `
    <div class="cart">
        <h3 class="h3">Cart</h3>
        <div class="row justify-content-center">
            <div class="col-lg-10 col-xl-8">
                <div class="cart-container">
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
                                                    <h4 class="totalAmount"></h4>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cart-footer text-right">
                        <button class="btn btn-success my-1 order">Proceed to Checkout<i
                                class="ri-arrow-right-line ml-2"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})