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
        <div class="container">
            <div class="row" style="margin:25px 0">
                <div class="col-3">
                    <div class="card">
                        <!-- <img src="https://www.cobdoglaps.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile-sq.jpg" class="card-img-top" alt="..."> -->
                        <img src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Prescription02&hairColor=Black&facialHairType=BeardLight&facialHairColor=Brown&clotheType=BlazerShirt&eyeType=Happy&eyebrowType=UpDownNatural&mouthType=Smile&skinColor=Light'/>
                        <div class="card-body">
                            <h5 class="card-title">{{user.name}}</h5>
                            <p class="card-text text-muted"> Language <span class="text-primary"><strong>Java</strong></span></p>
                        </div>
                    </div>
                    <hr>
                    <button type="button" class="btn btn-secondary btn-block">View profile</button>
                </div>
                <div class="col-9">
                    <div class="alert alert-primary alert-dismissible fade show" role="alert">
                        Welcome to your <strong>Dashboard</strong> here you will choose difficulty and see your contribution.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <p class="lead">Difficulty Level</p>
                    <div class="row">
                        <div class="col-6">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title text-success">
                                        Beginner
                                    </h5>
                                    <div class="row">
                                        <div class="col-8">
                                            <p class="text-muted" style="margin:0;">
                                                <i class="fas fa-circle" style="color:green;"></i> Questions Solved: <strong>5</strong>
                                            </p>
                                            <p class="text-muted" style="margin:0;">
                                                <i class="fas fa-circle" style="color:orange; "></i> Attempted Questions: <strong>8</strong>
                                            </p>
                                            <p class="text-muted" style="margin:0;">
                                               <i class="fas fa-circle" style="color:lightgrey;"></i> Total Questions: <strong>20</strong>
                                            </p>
                                        </div>
                                        <div class="col">
                                            <vc-donut :sections="sectionsb" :size="size"><h4>25%</h4></vc-donut>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col-7"></div>
                                        <div class="col">
                                            <router-link to="/app/beginner" class="btn btn-info btn-sm btn-block ">Solve Questionss</router-link>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-6">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title text-warning">
                                        Intermediate
                                    </h5>
                                    <div class="row">
                                        <div class="col-8">
                                            <p class="text-muted" style="margin:0;">
                                                <i class="fas fa-circle" style="color:green;"></i> Questions Solved: <strong>5</strong>
                                            </p>
                                            <p class="text-muted" style="margin:0;">
                                                <i class="fas fa-circle" style="color:orange; "></i> Attempted Questions: <strong>8</strong>
                                            </p>
                                            <p class="text-muted" style="margin:0;">
                                               <i class="fas fa-circle" style="color:lightgrey;"></i> Total Questions: <strong>20</strong>
                                            </p>
                                        </div>
                                        <div class="col">
                                            <vc-donut :sections="sectionsi" :size="size"><h4>20%</h4></vc-donut>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col-7"></div>
                                        <div class="col">
                                            <button type="button" class="btn btn-info btn-sm btn-block">Solve questions</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row" style="margin-top:20px;">
                        <div class="col-6">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title text-danger">
                                        Expert
                                    </h5>
                                    <div class="row">
                                        <div class="col-8">
                                            <p class="text-muted" style="margin:0;">
                                                <i class="fas fa-circle" style="color:green;"></i> Questions Solved: <strong>5</strong>
                                            </p>
                                            <p class="text-muted" style="margin:0;">
                                                <i class="fas fa-circle" style="color:orange; "></i> Attempted Questions: <strong>8</strong>
                                            </p>
                                            <p class="text-muted" style="margin:0;">
                                               <i class="fas fa-circle" style="color:lightgrey;"></i> Total Questions: <strong>20</strong>
                                            </p>
                                        </div>
                                        <div class="col">
                                            <vc-donut :sections="sectionse" :size="size"><h4>90%</h4></vc-donut>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col-7"></div>
                                        <div class="col">
                                            <button type="button" class="btn btn-info btn-sm btn-block">Solve questions</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="text-info">
                                        Sandbox
                                    </h5>
                                    <p>This is the Sandbox area use this to practice different programs and different programing Languages and see their output in realtime.</p>
                                    <hr style="margin-top:28px;">
                                    <div class="row">
                                        <div class="col-7"></div>
                                        <div class="col">
                                            <router-link to="/app/sandbox" class="btn btn-info btn-sm btn-block ">Use Sandbox</router-link>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <p class="lead">Last Attempted Question</p>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="text-muted">
                                {{question.title}}
                            </h5>
                            <p>
                                {{question.body}}
                            </p>
                            <div class="row">
                                <div class="col-1">
                                    <p class="font-weight-bold text-primary">Java</p>
                                </div>
                                <div class="col">
                                    <span class="badge badge-success" style="padding:7px;" v-if="question.difficulty==0">
                                        Beginner
                                    </span>
                                    <span class="badge badge-warning" v-if="question.difficulty==1">
                                        Intermediate
                                    </span>
                                    <span class="badge badge-danger" v-if="question.difficulty==2">
                                        Expert
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <p class="lead">
                        Your contributiion
                    </p>
                    <div class="card">
                        <div class="card-body">
                            <calendar-heatmap :values="values" :end-date="endDate" :range-color="rangecolor"/>
                        </div>
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
        
        endDate:new Date(),
        rangecolor:['#eeeeee', '#a5d6a7', '#66bb6a', '#43a047'],
        values: [
            {date: '2019-2-1', count: 6 },
            {date: '2019-1-23', count: 4 },
            {date: '2019-2-2', count: 15 },
            {date: '2019-2-3', count: 2 },
            {date: '2019-2-9', count: 10 }
        ],

        size: 80,
        sectionsb: [
          { value: 25, color: 'green' },
          { value: 40, color: 'orange' },
        ],
        sectionsi: [
          { value: 20, color: 'green' },
          { value: 30, color: 'orange' },
        ],
        sectionse: [
          { value: 90, color: 'green' },
          { value: 0, color: 'orange' },
        ],

        
      }
    },

    computed: {
        user() {
            return this.$store.getters.USER
        },

        question() {
            return this.$store.getters.QUESTION
        }
    },

    // watch: {
    //     user()
    // },

    created() {
        // console.log(this.$store.getters.USER.solved[0]+ "hello")
        
    },

    methods: {
        
        getQuestionbyId(id) {
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
                        // console.log(res);
                        this.question = res.data; 
                    }
                })
        },
    }

}
</script>

