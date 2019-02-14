<template>
    <div>

        <div class="container">
            <p class="display-4" style="font-weight:400;margin-top:25px">Join Codely</p>
            <h2 class="lead" style="font-size:28px">Your one stop place for practicing and learning competetive coding</h2>
            <hr>
            <div class="row">
                <div class="col-12">
                    <h2 class="lead text-muted" style="font-size:28px; margin-top:35px">Create your personal account.</h2>
                </div>
                <div class="col-6">
                    <div v-if="showError" class="alert alert-danger" role="alert">
                        {{error}}
                    </div>
                    <form @submit.prevent="Register">
                        <div class="form-group">
                            <label for="name" style="font-weight:500;">Full name <span style="color:red;">*</span> </label>
                            <input type="text" class="form-control" required v-model="user.name">
                        </div>
                        <div class="form-group">
                            <label for="email" style="font-weight:500;">Email address <span style="color:red;">*</span> </label>
                            <input type="email" class="form-control" required v-model="user.email">
                            <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="password" style="font-weight:500;">Password <span style="color:red;">*</span></label>
                            <input type="password" class="form-control" required v-model="user.password">
                            <small class="form-text text-muted">Make sure it's more than 15 characters OR at least 8 characters including a number and a lowercase letter.</small> 
                        </div>
                        <div class="form-group">
                            <label for="confirmpassword" style="font-weight:500;">Confirm password <span style="color:red;">*</span></label>
                            <input type="password" class="form-control" required v-model="cnfpass"> 
                        </div>
                        <hr>
                        <button type="submit" class="btn btn-success">Create an account</button>
                    </form>
                </div>

                <div class="col-4 ml-auto">
                    <div class="card">
                        <div class="card-header" style="font-weight:500;">
                            Why codely?
                        </div>
                        <div class="card-body">
                            <p><i class="fas fa-check text-success"></i> Excelent Questions</p>
                            <p><i class="fas fa-check text-success"></i> Learn about lead cases</p>
                            <p><i class="fas fa-check text-success"></i> Tutorial on how to solve questions</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer">
            <div class="container">
                <span class="text-muted">&copy;2019 Codely</span>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {

            loading:false,

            error: '',
            showError: false,

            cnfpass: '',
            
            user: {
                name: '',
                email: '',
                password: ''
            },
        }
    },

    methods: {
        Register() {
            this.loading=true;

            if(this.user.password === this.cnfpass) {

                const uri = 'http://localhost:4000/api/users';
                let h = new Headers();
                h.append('Content-Type', 'application/json')
    
                let req = new Request(uri, {
                    method: 'POST',
                    headers: h,
                    body: JSON.stringify(this.user)
                });
                fetch(req)
                    .then(res => res.json())
                    .then(res => {
                        if(res.status === 'success') {
                            this.loading=false;
                            this.$session.start();
                            this.$session.set('jwt', res.data.token);
                            this.$router.push('/app/dashboard');
                            localStorage.setItem("token", res.data.token);
                        } else if(res.status === 'error') {
                            this.loading= false;
                            this.error = res.msg;
                            this.showError = true;
                        }
                        // console.log(res)
                    })
            } else {
                this.error = "Passwords do not match";
                this.showError = true;
            }


        }
    }
}
</script>

.<style>
.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #f5f5f5;
}
</style>
