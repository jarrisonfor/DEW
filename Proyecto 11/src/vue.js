var app = new Vue({
    el: '#app',
    data: {
        page: 1,
        user: {}
    },
    methods: {
        changePage: function(page) {
            this.page = page;
        }
    },
    mounted: function() {
        /* let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) {
            this.reservations = cart;
            this.reservations.forEach(row => row.forEach(column => {
                if (column) {
                    this.totalPrice += this.ticketPrice;
                }
            }));
        } else {
            for (var i = 0; i < this.numberSeatRows; i++) {
                this.reservations.push(new Array(this.numberSeatColumns).fill(0));
            }
        } */
    }
})
