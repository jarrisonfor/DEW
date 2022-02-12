Vue.component('contact', {
    template: `
    <div class="contact">
        <h3 class="h3">Contact form</h3>
        <div class="form-sec">
            <form @submit="checkForm">
                <div class="form-group">
                    <label>Name:</label>
                    <input type="text" v-model="name" class="form-control" placeholder="Enter Name" name="name" required>
                </div>
                <div class="form-group">
                    <label>Email:</label>
                    <input type="email" v-model="email" class="form-control" placeholder="Enter Email" name="email" required>
                </div>
                <div class="form-group">
                    <label>Message:</label>
                    <textarea v-model="message" class="form-control" placeholder="Enter your Message" required></textarea>
                </div>
                <button type="submit" class="btn btn-success">Submit</button>
            </form>
        </div>
    </div>
    `,
    props: ['pageChanger', 'getCookie'],
    data: function () {
        return {
            name: '',
            email: '',
            message: '',
        }
    },
    mounted: function () {
        if (this.getCookie('user_id').length == 0) {
            this.pageChanger(4);
        }
    },
    methods: {
        checkForm: function (e) {
            e.preventDefault();
            $.ajax({
                url: "/server/contact.php",
                type: "POST",
                dataType: 'json',
                data: {
                    name: this.name,
                    email: this.email,
                    message: this.message
                },
                success: () => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Email has been sent!'
                    });
                    this.name = '';
                    this.email = '';
                    this.message = '';
                },
                error: () => {
                    Toast.fire({
                        icon: 'error',
                        title: 'Server error'
                    })
                }
            });
        }
    }
})