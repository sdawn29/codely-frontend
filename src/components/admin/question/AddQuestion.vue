<template>
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb"  style="background-color:#fafafa">
                <li class="breadcrumb-item"><router-link to="/app/admin" href="#">Admin Page</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">Add Question</li>
            </ol>
        </nav>
        <p class="lead">Add Question</p>
        <div class="row">
            <div class="col-8">
                <form @submit.prevent="addQuestion">
                    <div class="form-group">
                        <label for="title"><h6>Title <span style="color:red;">*</span></h6></label>
                        <input type="text" class="form-control" v-model="question.title">
                        <small class="form-text text-muted">Enter the Title of the question.</small>
                    </div>
                    <div class="form-group">
                        <label for="body"><h6>Body <span style="color:red;">*</span></h6></label>
                        <textarea class="form-control" rows="6" v-model="question.body"></textarea>
                        <small class="form-text text-muted">Enter the body of the question.</small>
                    </div>
                    <div class="form-group">
                        <label for="difficulty"><h6>Choose Dificulty <span style="color:red;">*</span></h6></label>
                        <select class="form-control" v-model="choiceDificulty" @change="selectDificulty">
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Expert</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Add Question</button>
                </form>
                <div v-if="questionCounter!=0" class="alert alert-success" role="alert" style="margin:20px 0">
                    {{ questionCounter }} Questions added.
                </div>
            </div>

            <div class="col-4">
                <div class="card">
                    <div class="card-header">
                        <h6>Testcase {{ counter + 1}}</h6>
                    </div>
                    <div class="card-body">
                
                        <div class="alert alert-success" role="alert" v-if="counter!=0">
                            {{ counter }} testcases added
                        </div>
                        
                        <form @submit.prevent="addTestcase">
                            <div class="form-group">
                                <label for="Name"><h6 class="text-secondary">Standard Output</h6></label>
                                <textarea class="form-control" rows="1" v-model="testcase.body"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="body"><h6 class="text-secondary">Standard Input</h6></label>
                                <textarea class="form-control" rows="1" v-model="testcase.stdin"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="body"><h6 class="text-secondary">Description</h6></label>
                                <textarea class="form-control" rows="2" v-model="testcase.desc"></textarea>
                            </div>
                            <button type="submit" class="btn btn-info">Add</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>    
</template>

<script>
export default {
    data() {
        return {
            counter:0,
            questionCounter:0,
            choiceDificulty:'',
            question: {
                title: '',
                body: '',
                testcases: [],
                difficulty:''  
            },
            testcase:{
                body: '',
                stdin: '',
                desc: ''
            }
        }
    },
    methods: {
        addTestcase() {
            this.question.testcases.push({body: this.testcase.body, stdin: this.testcase.stdin, desc: this.testcase.desc});
            this.counter++;
            this.testcase.body = '';
            this.testcase.stdin = '';
            this.testcase.desc = '';
        },

        selectDificulty() {
            if (this.choiceDificulty === 'Beginner') {
                this.question.difficulty = 0;
            } else if (this.choiceDificulty === 'Intermediate') {
                this.question.difficulty = 1;
            } else if (this.choiceDificulty === 'Expert') {
                this.question.difficulty = 2;
            }
        },

        addQuestion() {
            const uri = 'http://localhost:4000/api/questions';
            let h = new Headers();
            h.append('Content-Type', 'application/json')
            h.append('x-auth-token', localStorage.getItem("token"));
            let req = new Request(uri, {
                method: 'POST',
                headers: h,
                body: JSON.stringify(this.question)
            });
            fetch(req)
                .then(res => res.json())
                .then(res => {
                    if(res.status === 'success') {
                        console.log(res);
                        this.question='';
                        this.testcase='';
                        this.counter = 0;
                        this.questionCounter++;
                    }
                })
        }
    }
}
</script>
