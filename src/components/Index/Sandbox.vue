<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="height:80px;">
            <div class="container">
                <h2 class="navbar-brand">Codely</h2>
                <div class="navbar-nav">
                    <a class="nav-item nav-link active" href="#">Dashboard</a>
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
        <div class="container" style="margin-top:10px">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb"  style="background-color:#fafafa">
                    <li class="breadcrumb-item"><router-link to="dashboard" href="#">Dashboard</router-link></li>
                    <li class="breadcrumb-item active" aria-current="page">Sandbox</li>
                </ol>
            </nav>

            <div class="alert alert-primary alert-dismissible fade show" role="alert">
                Welcome to your <strong>Sandbox!</strong> Select your programing language and run any program you want.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

           
            <div class="row">
                <div class="col-9">
                    <div class="card">
                        <editor v-model="code.body" @init="editorInit" :lang="lang" theme="chrome" width="100%" height="560"></editor>
                    </div>
                    <br>
                    <p class="lead">Output</p>
                    
                    <div class="card">
                        <div class="card-body" style="white-space: pre-line;">
                            {{output.stdout || output.stderr}}
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
                            <textarea class="form-control" v-model="code.stdin" rows="5"></textarea>
                        </div>
                    </form>
                    <div class="card border-info">
                        <div class="card-body text-info">
                            <p>Choose any programing language and write a code ont the editor provided then click on compile to see the output in below provided box.</p>
                        </div>
                    </div>
                    <br>
                    <button type="button" @click="compile" class="btn btn-secondary btn-block">Compile</button>
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
    computed: {
        user() {
            return this.$store.getters.USER
        },
    },
    data() {
        return {
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
                    this.loading = false;
                    this.output = res.data;
                    console.log(res)
                })
        }
    }
}
</script>

