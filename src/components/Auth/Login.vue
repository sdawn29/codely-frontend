<template>
    <div class="container">
        <center>
            <p style="font-size:50px; font-weight:100;">Codely</p>
        </center>
        <div v-if="showError" class="alert alert-danger" role="alert" style="width:21em; margin:10px auto;">
            {{error}}
        </div>
        <div class="card"  style="width:21em; margin:5px auto;">
            <div class="card-body">
                <form @submit.prevent="Login">
                    <p class="text-muted">Sign in to continue</p>
                    <div class="form-group">
                        <label for="email" style="font-weight:500;">Email address</label>
                        <input type="email" class="form-control" required v-model="user.email">
                    </div>
                    <div class="form-group">
                        <label for="password" style="font-weight:500;">Password</label>
                        <input type="password" class="form-control" required v-model="user.password"> 
                    </div>
                    <button type="submit" class="btn btn-success btn-block">Sign in</button>
                </form>
            </div>
        </div>
        <div class="card" style="width:21em; margin:15px auto;">
            <div class="card-body">
                <center>
                    New to Codely? <router-link to="/signup">Create an account.</router-link>
                </center>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
        return {
            loading: false,
            error: '',
            showError: false,

            user:{
                email:'',
                password:'',
            }
        }
    },

    methods: {
        Login() {
            this.loading = true;
            const uri = 'http://localhost:4000/api/auth';
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
                        // this.loading=false;
                        this.$session.start();
                        this.$session.set('jwt', res.data.token);
                        localStorage.setItem("token", res.data.token);
                        // console.log(res.data.token);
                        this.$router.push('/app/dashboard');
                    } else if(res.status === 'error') {
                        // this.loading=false;      
                        this.showError = true;
                        this.error = res.msg;
                    }
                })
        },
    }
  }
</script>
