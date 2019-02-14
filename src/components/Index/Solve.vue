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
                <ol class="breadcrumb"  style="background-color:white">
                    <li class="breadcrumb-item"><router-link to="/app/dashboard" href="#">Dashboard</router-link></li>
                    <li class="breadcrumb-item"><router-link to="/app/beginner" href="#">Beginner Question</router-link></li>
                    <li class="breadcrumb-item active" aria-current="page">{{question.title}}</li>
                </ol>
            </nav>

            <h4>{{question.title}}</h4>
            <p class="lead">
                {{question.body}}
            </p>

            <h5>Example</h5>

            <p class="text-muted" style="font-weight:500;">Input</p>
            <div class="card" style="width:15em; background-color:#fafafa">
                <div class="card-body">  
                    <p>{{question.testcases[0].stdin}}</p>
                </div>
            </div>

            <br>

            <p class="text-muted" style="font-weight:500;">Output</p>
            
            <div class="card" style="width:15em; background-color:#fafafa">
                <div class="card-body">     
                    <p>{{question.testcases[0].body}}</p>
                </div>
            </div>
            <br>
            <h5>Write your code down below.</h5>
            <br>
            <div class="row">
                <div class="col-9">
                    <div class="card">
                        <editor v-model="code.body" @init="editorInit" :lang="lang" theme="chrome" width="100%" height="608"></editor>
                    </div>
                    <br>
                    <p class="lead">Output</p>
                    
                    <div class="card">
                        <div class="card-body" style="white-space: pre-line; background-color:#fafafa">
                            {{output.stdout || output.stderr}}
                        </div>
                    </div>
                    <br>
                    <p class="lead">
                        Compiling with all test cases
                    </p>
                    
                    <div class="row">
                        <div class="col-3" v-for="(testcase, index) in question.testcases" :key="testcase._id">
                            <div class="card card border-secondary" style="margin-bottom:15px;">
                                <div class="card-body">
                                    Testcase {{index+1}}
                                </div>
                            </div>
                        </div>
                    </div>

   
                </div>
                <div class="col-3">
                     <form>
                        <div class="form-group">
                            <p class="lead">Language</p>
                            <select class="form-control" v-model="item" @change="selectLanguage(item)">
                                <option value="">Choose a language</option>
                                <option :value="choice" v-for="choice in items" :key="choice.lang">{{choice.lang}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <p class="lead">Standard Input</p>
                            <textarea style="background-color:#fafafa;" class="form-control" v-model="code.stdin" rows="5"></textarea>
                        </div>
                    </form>
                    <div class="card border-info">
                        <div class="card-body text-info">
                            <p>After completing the code click on <strong>Run code</strong> to check your code with the standard input. Click on <strong>Submit code</strong> to submit the code and check with other hidden testcases. </p>
                        </div>
                    </div>
                    <br>
                    <button type="button" @click="compile" class="btn btn-secondary btn-block">Run code</button>
                    <button type="button" @click="submission" class="btn btn-primary btn-block">Submit code</button>
                    
                    
                    
                    <br>
                    <p class="lead">Time taken (in s)</p>
                    <div class="card">
                        <div class="card-body">
                            {{output.cpuUsage * 0.000001}}
                        </div>
                    </div>
                    <br>
                    <p class="lead">Memory used (in KB)</p>
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
            this.code.stdin = this.question.testcases[0].stdin
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
        }
    }
}
</script>

<style>
</style>

