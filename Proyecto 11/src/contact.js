Vue.component('contact', {
    template: `
    <div class="contact">
        <h3 class="h3">Contact form</h3>
        <div class="form-sec">
            <form @submit="checkForm">
                <div class="form-group">
                    <label>Name:</label>
                    <input type="text" v-model="name" class="form-control" id="name" placeholder="Enter Name" name="name" required>
                </div>
                <div class="form-group">
                    <label>Email:</label>
                    <input type="email" v-model="email" class="form-control" id="name" placeholder="Enter Email" name="email" required>
                </div>
                <div class="form-group">
                    <label>Message:</label>
                    <textarea name="issues" v-model="message" class="form-control" id="iq" placeholder="Enter your Message" required></textarea>
                </div>
                <button type="submit" class="btn btn-success">Submit</button>
            </form>
        </div>
    </div>
    `,
    data: function () {
        return {
            name: '',
            email: '',
            message: '',
        }
    },
    methods: {
        checkForm: function (e) {
            e.preventDefault();
            if (this.name && this.email && this.message) {
                $.ajax({
                    url: "server/contact.php",
                    type: "POST",
                    dataType: 'json',
                    data: {
                        name: this.name,
                        email: this.email,
                        message: this.message
                    },
                    success: (data) => {
                        toastr["success"]("Message sent successfully");
                        this.name = '';
                        this.email = '';
                        this.message = '';
                    },
                    error: (data) => {
                        toastr["error"]("Message not sent");
                    }
                });
            } else {
                toastr["info"]("Please fill all the fields");
            }
        }
    }
})