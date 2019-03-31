<template>
    <div>
        <br>
        <div class="row">
            <div class="col-4">
                <div class="card">
                    <div class="card-header">
                        <h6>
                            Questions info.
                        </h6>
                    </div>
                    <div class="card-body">
                        <h5 class="text-secondary">
                            Total Questions:
                        </h5>
                        <h6 class="text-success">
                            Beginer:
                        </h6>
                        <h6 class="text-warning">
                            Intermediate:
                        </h6>
                        <h6 class="text-danger">
                            Expert:
                        </h6>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <div class="alert alert-primary" role="alert">
                    This is the <strong>Admin page</strong>. this page is only visible to the users who have been granted the admin right., <strong>Admins</strong> can add, view and delete questions and also can view and see other users.
                </div>
                <div class="alert alert-info" role="alert">
                    Press the below buttons to either add a question or view the already added questions.
                </div>
                <div class="row">
                    <div class="col-6">
                        <!-- <button type="button" class="btn btn-secondary btn-lg btn-block">Add Question</button> -->
                        <router-link to="/app/admin/addquestion" class="btn btn-secondary btn-lg btn-block">Add Questions</router-link>
                    </div>
                    <div class="col-6">
                        <router-link to="/app/admin/viewquestion" class="btn btn-info btn-lg btn-block">View Questions</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
