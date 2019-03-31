<template>
    <div>

        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="height:80px;">
            <div class="container">
                <h2 class="navbar-brand">Codely</h2>
                <div class="navbar-nav">
                    <router-link to="/app/dashboard" class="nav-item nav-link active" href="#">Dashboard</router-link>
                    <router-link to="/app/admin" class="nav-item nav-link" href="#" v-if="user.isAdmin">Admin Panel</router-link>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{user.name}}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="#">View Profile</a>
                        <a class="dropdown-item" href="#">Submissions</a>
                        <div class="dropdown-divider"></div>
                        <router-link to="/signout" class="dropdown-item" href="#">Sign Out</router-link>
                        </div>
                    </li>
                </div>
            </div>
        </nav>
        <div class="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb"  style="background-color:#fafafa">
                    <li class="breadcrumb-item"><router-link to="dashboard" href="#">Dashboard</router-link></li>
                    <li class="breadcrumb-item active" aria-current="page">Intermediate Questions</li>
                </ol>
            </nav>

            <p class="lead">Intermediate Questions</p>
            <div v-for="question in questions" :key="question._is">
                <div class="card card-custom card-body" v-if="question.difficulty==1">

                    <div class="row">
                        <div class="col-10">
                            <h5 class="text-muted">
                                {{question.title}}
                            </h5>
                            <p>
                                {{question.body}}
                            </p>
                            <span class="badge badge-success" style="padding:7px;" v-if="question.difficulty==0">
                                Beginner
                            </span>
                            <span class="badge badge-warning" style="padding:7px;" v-if="question.difficulty==1">
                                Intermediate
                            </span>
                            <span class="badge badge-danger" style="padding:7px;" v-if="question.difficulty==2">
                                Expert
                            </span>
                        </div>
                        <div class="col">
                            <router-link :to="{ name: 'Solve', params: { qid: question._id }}" class="btn btn-outline-success " style="margin-top:30px;">Solve question</router-link>
                        </div>
                    </div>
                        
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.getters.USER
        },
    },
    created(){
        this.getQuestions()
    },

    data() {
        return {
            token: this.token = this.$session.get('jwt'),
            questions: '',

        }
    },
    methods: {
        getQuestions() {
            const uri = 'http://localhost:4000/api/questions/';
            let h = new Headers();
            h.append('Content-Type', 'application/json');
            h.append('x-auth-token', this.token);

            let req = new Request(uri, {
                method: 'GET',
                headers: h,
            });
            fetch(req)
                .then(res => res.json())
                .then(res => {
                    if(res.status === 'success') {
                        // console.log(res);
                        this.questions = res.data.questions;
                    } 
                    // console.log(res)
                });
        },
    }
}
</script>

<style scoped>
.card-custom:hover {
    border: 1px solid grey;
    /* background-color: #f5f5f5; */

}
</style>
