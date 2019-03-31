<template>
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb"  style="background-color:#fafafa">
                <li class="breadcrumb-item"><router-link to="/app/admin" href="#">Admin Page</router-link></li>
                <li class="breadcrumb-item"><router-link to="/app/admin/viewquestion" href="#">View Questions</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">{{question.title}}</li>
            </ol>
        </nav>
        <div class="row">
            <div class="col-8">
                <h2 class="text-muted">{{question.title}}</h2>
                <p class="lead">{{question.body}}</p>
                <h4 class="text-muted">All Testcases</h4>
                <div class="row">
                    <div class="col-4" v-for="(testcase,index) in question.testcases" :key="index">
                        <br>
                        <div class="card border-secondary">
                            <div class="card-header">
                                <div class="row">
                                    <div class="col-10">
                                        <h6>Testcase {{ index+1 }}</h6>
                                    </div>
                                    <popper
                                        trigger="hover"
                                        :options="{
                                        placement: 'top',
                                        modifiers: { offset: { offset: '0,10px' } }
                                        }">
                                        <div class="card card-body border-dark" style="z-index:20000">
                                            <h6>Additional Description</h6>
                                            <h6 class="text-muted">
                                                {{ testcase.desc }}
                                            </h6>
                                        </div>
                                        <i slot="reference" class="fas fa-info-circle text-primary"></i>
                                    </popper>
                                </div>
                            </div>
                            <div class="card-body">
                                <h6 class="text-info">
                                    Standard Input
                                </h6>
                                <div class="card bg-light text-dark" style="white-space: pre-line;padding:15px;">
                                    <h6>{{ testcase.stdin }}</h6>
                                </div>
                                <h6 class="text-info">
                                    Standard Output
                                </h6>
                                <div class="card bg-light text-dark" style="white-space: pre-line;padding:15px;">
                                    <h6>{{ testcase.body }}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="card">
                    <div class="card-header">
                        <h6>Additional info.</h6>
                    </div>
                    <div class="card-body">
                        <h5>Difficulty</h5>
                        <span class="badge badge-success" style="padding:7px;" v-if="question.difficulty==0">
                            Beginner
                        </span>
                        <span class="badge badge-warning" style="padding:7px;" v-if="question.difficulty==1">
                            Intermediate
                        </span>
                        <span class="badge badge-danger" style="padding:7px;" v-if="question.difficulty==2">
                            Expert
                        </span>
                        <br>
                        <br>
                        <h5>No. of Testcases</h5>
                        <h6 class="text-muted">{{ question.testcases.length }}</h6>
                    </div>
                </div>
                <br>
                <button type="button" class="btn btn-block btn-lg btn-danger" data-toggle="modal" data-target="#confirmationBox"><i class="fas fa-trash-alt"></i> Delete Question</button>
                <div class="modal fade" id="confirmationBox" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-warning" id="confirmationBox"><i class="fas fa-exclamation-triangle"></i> Warning</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <h6>Are you sure you want to delete this question?</h6>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteQuestion(question._id)">Delete</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';

export default {
    components: {
      'popper': Popper
    },

    created() {
        this.getQuestion(this.$route.params.qid);
    },
    data() {
        return {
            question:'',
        }
    },
    methods: {
        getQuestion(id) {
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
        deleteQuestion(id) {
            const uri = 'http://localhost:4000/api/questions/'+id;
            let h = new Headers();
            h.append('Content-Type', 'application/json');
            h.append('x-auth-token', localStorage.getItem("token"));

            let req = new Request(uri, {
                method: 'DELETE',
                headers: h,
            });
            fetch(req)
                .then(res => res.json())
                .then(res => {
                    if(res.status === 'success') {
            //             // console.log(res);
                        this.$router.go(-1);

                    } 
                    console.log(res)
                });
        },
    }
}
</script>

