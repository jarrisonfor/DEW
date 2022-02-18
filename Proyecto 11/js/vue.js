var vueClass = new Vue({
    el: '#app',
    data: {
        page: 1,
        forceUpdate: 0,
        forceUpdateNav: 0,
        isUserLogged: false,
    },
    watch: {
        page: function () {
            this.checkUserIsLogged();
        },
        isUserLogged: function () {
            this.forceUpdateNav = Math.random();
        }
    },
    mounted: function () {
        this.checkUserIsLogged();
    },
    methods: {
        checkUserIsLogged: function () {
            if (this.getCookie('user_id').length > 0) {
                this.isUserLogged = true;
            } else {
                this.isUserLogged = false;
            }
        },
        changePage: function (page) {
            this.page = page;
            this.forceUpdate = Math.random();
        },
        setCookie: function (cname, cvalue, exdays) {
            const d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        },
        getCookie: function (cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        createSession: function (id) {
            this.setCookie('user_id', id, 1);
            this.isUserLogged = true;
            Toast.fire({
                icon: 'success',
                title: 'User logged!'
            })
            this.changePage(1);
        },
        closeSession: function () {
            this.setCookie('user_id', '', -1);
            this.isUserLogged = false;
            this.changePage(1);
        }
    }
});