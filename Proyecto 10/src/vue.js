var app = new Vue({
    el: '#app',
    data: {
        page: 0,
    },
    methods: {
        changePage: function(page) {
            this.page = page;
        }
    }
})
