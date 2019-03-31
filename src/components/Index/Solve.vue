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
                    <li class="breadcrumb-item"><router-link to="/app/dashboard" href="#">Dashboard</router-link></li>
                    <li class="breadcrumb-item" v-if="question.difficulty == 0"><router-link to="/app/beginner" href="#">Beginner Question</router-link></li>
                    <li class="breadcrumb-item" v-if="question.difficulty == 1"><router-link to="/app/intermediate" href="#">Intermediate Question</router-link></li>
                    <li class="breadcrumb-item" v-if="question.difficulty == 2"><router-link to="/app/expert" href="#">Expert Question</router-link></li>
                    <li class="breadcrumb-item active" aria-current="page">{{question.title}}</li>
                </ol>
            </nav>
            <div class="row">
                
                <div class="col-9">

                    <div class="card">
                        <div class="card-body">

                            <h3>{{question.title}}</h3>
                            <p class="lead">
                                {{question.body}}
                            </p>

                            <h5>Example</h5>

                            <p class="text-muted" style="font-weight:500;">Input</p>
                            <div class="card" style="width:15em; background-color:#eceff1;white-space: pre-line">
                                <div class="card-body codeFont">  
                                    <p>{{question.testcases[0].stdin}}</p>
                                </div>
                            </div>

                            <br>

                            <p class="text-muted" style="font-weight:500;">Output</p>
                            
                            <div class="card" style="width:15em; background-color:#eceff1;white-space: pre-line">
                                <div class="card-body codeFont">     
                                    <p>{{question.testcases[0].body}}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                

                <div class="col-3">
                    <div class="card card-body">
                        <div>
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
                        </div>
                        <br>
                        <button type="button" class="btn btn-block btn-secondary">Discussions</button>
                    </div>
                </div>
            </div>

            <br>
            <h5>Write your code down below.</h5>
            <br>
            <div class="row">
                <div class="col-9">
                    <div class="card">
                        <editor v-model="code.body" @init="editorInit" :lang="lang" theme="chrome" width="100%" height="578"></editor>
                    </div>
                    <br>
                    <div v-if="!submitClicked">
                        <h5>Output</h5>
                        
                        <div class="card bg-secondary text-white">
                            <div class="card-body" style="white-space: pre;">
                                <h6 class="codeFont">{{output.stdout || output.stderr}}</h6>
                            </div>
                        </div>
                    </div>
                    <div v-if="submitClicked">
                        <h5>
                            Compiling with all test cases
                        </h5>
                        
                        <div class="row">
                            <div class="col-4" v-for="(data,index) in solvedTestcase" :key="data.sNo">
                                <div class="card card border-success" style="margin-bottom:15px;" v-if="data.status === 'solved'">
                                        <div class="card-header">
                                        <h6>Testcase {{index+1}}</h6>
                                        </div>
                                    <div class="card-body text-success row">
                                        <span class="col-10">
                                            Solved. 
                                        </span>
                                        <span class="col-2">
                                            <i class="fas fa-check"></i>
                                        </span>
                                    </div>
                                </div>

                                <div class="card card border-danger" style="margin-bottom:15px;" v-if="data.status === 'failed'"> 
                                        <div class="card-header">
                                        <h6>Testcase {{index+1}}</h6>
                                        </div>
                                    <div class="card-body text-danger row">
                                        <span class="col-10">
                                            Failed.
                                        </span>
                                        <span class="col-2">
                                            <popper
                                                trigger="hover"
                                                :options="{
                                                placement: 'top',
                                                modifiers: { offset: { offset: '0, 10px' } }
                                                }">
                                                <div class="card border-secondary" style="z-index:20000;">
                                                    <div class="card-header">
                                                        <h6 class="text-dark">Info.</h6>
                                                    </div>
                                                    <div class="card-body">
                                                        <h6 class="text-muted">Standard Input</h6>
                                                        <div class="card text-white bg-secondary codeFont" style="width:200px;padding:10px;white-space: pre-line">{{ data.expected.stdin }}</div>
                                                        <h6 class="text-muted">Expected Output</h6>
                                                        <div class="card text-white bg-secondary codeFont" style="width:200px;padding:10px;white-space: pre-line">{{ data.expected.body }}</div>
                                                        <h6 class="text-muted">Hint.</h6>
                                                        <div class="card text-white bg-info" style="width:200px;padding:10px;">{{ data.expected.desc }}</div>
                                                    </div>
                                                    
                                                </div>
                                                <i slot="reference" class="fas fa-exclamation-triangle"></i>
                                            </popper>
                                        </span>
                                    </div>
                                </div>    
                            </div>
                            <div class="col-4" v-if="solvedTestcaseCount != question.testcases.length && solvedTestcaseCount != 0">
                                <div class="card text-white bg-danger" >
                                    <div class="card-header">{{  solvedTestcaseCount }}/{{ question.testcases.length }} correct</div>
                                    <div class="card-body">
                                        <h6>Please Try again</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4"  v-if="solvedTestcaseCount == question.testcases.length">
                                <div class="card text-white bg-success">
                                    <div class="card-header">All testcases passed</div>
                                    <div class="card-body">
                                        <button class="btn btn-block btn-lg btn-success">Continue <i class="fas fa-arrow-circle-right"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
   
                </div>
                <div class="col-3">
                     <form>
                        <div class="form-group">
                            <h5>Language</h5>
                            <select class="form-control" v-model="item" @change="selectLanguage(item)">
                                <option value="">Choose a language</option>
                                <option :value="choice" v-for="choice in items" :key="choice.lang">{{choice.lang}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <h5>Standard Input</h5>
                            <textarea style="background-color:#eceff1;" class="form-control" v-model="code.stdin" rows="5"></textarea>
                        </div>
                    </form>
                    <div class="card border-info">
                        <div class="card-body text-info">
                            <p>After completing the code click on <strong>Run code</strong> to check your code with the standard input. Click on <strong>Submit code</strong> to submit the code and check with other hidden testcases. </p>
                        </div>
                    </div>
                    <br>
                    <button type="button" @click="compile" class="btn btn-secondary btn-block">Run code</button>
                    <button type="button" @click="submission" class="btn btn-success btn-block">Submit code</button>
                    
                    
                    
                    <br>
                    <h5>Time taken (in s)</h5>
                    <div class="card">
                        <div class="card-body">
                            {{output.cpuUsage * 0.000001}}
                        </div>
                    </div>
                    <br>
                    <h5>Memory used (in KB)</h5>
                    <div class="card">
                        <div class="card-body">
                            {{output.memoryUsage * 0.001}}
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
      
    
    created() {
        this.getQuestion(this.$route.params.qid);
    },
    computed: {
        user() {
            return this.$store.getters.USER
        },
    },
    data() {
        return {
            submitClicked: false,
            height: '5',
            width: '5',
            count: 0,
            question:'',
            item:'',
            lang: '',
            // items: ["Java", "c++", "c", "Python", "JavaScript" ],
            dataOPtion:{value:"Java", theme:"java"},
            items: [
                {lang: "Java", data: {value:"Java", theme:"java"}},
                {lang: "c++", data: {value:"c++", theme:"c_cpp"}},
                {lang: "c", data: {value:"c", theme:"c_cpp"}},
                {lang: "Python", data: {value:"Python", theme:"python"}},
                {lang: "JavaScript", data: {value:"node", theme:"javascript"}},
            ],
            code:{
                lang: '',
                body: '',    
                stdin:'',
            },

            output: '',
            theme:'',

            solvedTestcase: [],
            solvedTestcaseCount: 0,
        }
    },
    components: {
        editor: require('vue2-ace-editor'),
        'popper': Popper,
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
        editorInit() {
            require('brace/ext/language_tools') //language extension prerequsite...
            require('brace/mode/c_cpp')                
            require('brace/mode/java')    //language
            require('brace/mode/python')
            require('brace/mode/javascript')
            require('brace/theme/chrome')
            require('brace/snippets/javascript') //snippet
        },

        selectLanguage(item) {
            this.code.lang = item.data.value;
            this.lang = item.data.theme;

        },

        compile() {
            this.submitClicked = false
            this.loading=true;
            const uri = 'http://localhost:4000/api/prog';
            let h = new Headers();
            h.append('Content-Type', 'application/json')
            // h.append('x-auth-token', this.token);

            let req = new Request(uri, {
                method: 'POST',
                headers: h,
                body: JSON.stringify(this.code)
            });
            fetch(req)
                .then(res => res.json())
                .then(res => {
                    this.output = res.data;
                })
        },

        submission() {
            this.solvedTestcaseCount = 0
            this.submitClicked = true
            this.solvedTestcase = [];
            for(const index in this.question.testcases){

                this.code.stdin = this.question.testcases[index].stdin
                const expectedResult = this.question.testcases[index]
                const uri = 'http://localhost:4000/api/prog';
                let h = new Headers();
                h.append('Content-Type', 'application/json')
                // h.append('x-auth-token', this.token);
    
                let req = new Request(uri, {
                    method: 'POST',
                    headers: h,
                    body: JSON.stringify(this.code)
                });
                fetch(req)
                    .then(res => res.json())
                    .then(res => {
                        
                        var result = res.data.stdout;
                        if( result === expectedResult.body) {
                            this.solvedTestcaseCount++;
                            this.solvedTestcase.push({sNo : index , status: "solved", result: result, expected: expectedResult });
                        } else {
                            this.solvedTestcase.push({sNo : index , status: "failed", result: result, expected: expectedResult });
                        }
                    })
            }
        },
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono:700');

.codeFont {
    font-family: 'IBM Plex Mono', monospace;
}
</style>

