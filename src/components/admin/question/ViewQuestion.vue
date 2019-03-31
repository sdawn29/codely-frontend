<template>
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb"  style="background-color:#fafafa">
                <li class="breadcrumb-item"><router-link to="/app/admin" href="#">Admin Page</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">View Questions</li>
            </ol>
        </nav>
        <p class="lead">View Questions</p>
        <table class="table table-striped table-hover">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Sl no.</th>
                    <th scope="col">Title</th>
                    <th scope="col">Difficulty</th>
                    <th scope="col">Attempts</th>
                </tr>
            </thead>
            <tbody>
                <router-link v-for="(question,index) in questions" :key="index" :to="{ name: 'View', params: { qid: question._id }}" tag="tr">
                <!-- <tr v-for="(question,index) in questions" :key="index" @click="viewQuestion(question._id)"> -->
                    <th scope="row">{{ index+1 }}</th>
                    <td>{{ question.title }}</td>
                    <td v-if="question.difficulty === 0" class="text-success"><h6>Beginner</h6></td>
                    <td v-if="question.difficulty === 1" class="text-warning"><h6>Intermediate</h6></td>
                    <td v-if="question.difficulty === 2" class="text-danger"><h6>Expert</h6></td>
                    <td>{{ Math.floor(Math.random()*10) }}</td>
                <!-- </tr> -->
                </router-link>
            </tbody>
        </table>

        <p>{{question}}</p>
    </div>
</template>

<script>
export default {
    created(){
        this.getQuestions()
    },
    data() {
        return {
            token: this.token = this.$session.get('jwt'),
            questions: '',
            question: '',
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
                });
        },
        viewQuestion(id) {
            const uri = 'http://localhost:4000/api/questions/'+id;
            let h = new Headers();
            h.append('Content-Type', 'application/json');
            h.append('x-auth-token', localStorage.getItem("token"));

            let req = new Request(uri, {
                method: 'GET',
                headers: h,
            });
            fetch(req)
                .then(res => res.json())
                .then(res => {
                    if(res.status === 'success') {
                        this.question = res.data;
                        // console.log(res);
                    }
                })

            // console.log(this.$route.params.qid);
        },
    }
}
</script>

<style scoped>
tr:hover{
    cursor: pointer;
}
</style>


