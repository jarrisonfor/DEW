Vue.component('cart', {
    template: `
    <div class="cart">
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
                                <tbody>
                                    <tr>
                                        <td><a href="#" class="text-danger"><i class="ri-delete-bin-3-line"></i></a></td>
                                        <td>Apple Watch</td>
                                        <td>
                                            <div class="form-group mb-0">
                                                <input type="number" class="form-control cart-qty" name="cartQty1"
                                                    id="cartQty1" value="1">
                                            </div>
                                        </td>
                                        <td>$10</td>
                                        <td class="text-right">$500</td>
                                    </tr>
                                    <tr>
                                        <td><a href="#" class="text-danger"><i class="ri-delete-bin-3-line"></i></a></td>
                                        <td>Apple iPhone</td>
                                        <td>
                                            <div class="form-group mb-0">
                                                <input type="number" class="form-control cart-qty" name="cartQty2"
                                                    id="cartQty2" value="1">
                                            </div>
                                        </td>
                                        <td>$20</td>
                                        <td class="text-right">$200</td>
                                    </tr>
                                    <tr>
                                        <td><a href="#" class="text-danger"><i class="ri-delete-bin-3-line"></i></a></td>
                                        <td>Apple iPad</td>
                                        <td>
                                            <div class="form-group mb-0">
                                                <input type="number" class="form-control cart-qty" name="cartQty3"
                                                    id="cartQty3" value="1">
                                            </div>
                                        </td>
                                        <td>$30</td>
                                        <td class="text-right">$300</td>
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
                                            <!-- <tr>
                                                <td>Sub Total :</td>
                                                <td>$1000.00</td>
                                            </tr>
                                            <tr>
                                                <td>Shipping :</td>
                                                <td>$0.00</td>
                                            </tr>
                                            <tr>
                                                <td>Tax(18%) :</td>
                                                <td>$180.00</td>
                                            </tr> -->
                                            <tr>
                                                <td class="f-w-7 font-18">
                                                    <h4>Amount :</h4>
                                                </td>
                                                <td class="f-w-7 font-18">
                                                    <h4>$1180.00</h4>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cart-footer text-right">
                        <a href="page-checkout.html" class="btn btn-success my-1">Proceed to Checkout<i
                                class="ri-arrow-right-line ml-2"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})