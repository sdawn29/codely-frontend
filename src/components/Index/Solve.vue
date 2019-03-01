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
                    <li class="breadcrumb-item"><router-link to="/app/beginner" href="#">Beginner Question</router-link></li>
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
                            <div class="card" style="width:15em; background-color:#eceff1">
                                <div class="card-body">  
                                    <p>{{question.testcases[0].stdin}}</p>
                                </div>
                            </div>

                            <br>

                            <p class="text-muted" style="font-weight:500;">Output</p>
                            
                            <div class="card" style="width:15em; background-color:#eceff1">
                                <div class="card-body">     
                                    <p>{{question.testcases[0].body}}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                

                <div class="col-3">
                    <div class="card card-body">
                        <div class="">
                            <h5>Difficulty</h5>
                            <p class="text-warning">Intermediate</p>
                        </div>
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
                    <h5>Output</h5>
                    
                    <div class="card">
                        <div class="card-body" style="white-space: pre-line; background-color:#eceff1">
                            {{output.stdout || output.stderr}}
                        </div>
                    </div>
                    <br>
                    <h5>
                        Compiling with all test cases
                    </h5>
                    
                    <div class="row">
                        <div class="col-4" v-for="(testcase, index) in question.testcases" :key="testcase._id">
                            <div class="card card border-success" style="margin-bottom:15px;">
                                    <div class="card-header">
                                    Testcase {{index+1}}
                                    </div>
                                <div class="card-body text-success">
                                    solved
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

        <div v-for="data in solvedTestcase" :key="data.memoryUsage">
            <h5>
                {{data}}
            </h5>
        </div>
    </div>
</template>

<script>
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
            isloading: true,
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
        }
    },
    components: {
        editor: require('vue2-ace-editor'),
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
            this.solvedTestcase = [];
            for(var index in this.question.testcases){

                this.code.stdin = this.question.testcases[index].stdin
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
                        this.solvedTestcase.push(res.data);
                        console.log(res.data);
                    })
            }
        }
    }
}
</script>

<style>
</style>

