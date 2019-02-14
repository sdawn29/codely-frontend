<template>
<div>
    <router-view/>
    <br>
    <div class="container">
        <hr>
            <br>
            <h5 style="font-family: 'Staatliches', cursive; color:lightgrey; font-size:24px;">Codely</h5>
            <p style="color:lightgrey">
                <a href="" style="font-family: 'Staatliches', cursive;">
                    home    
                </a>
                |
                <a href="" style="font-family: 'Staatliches', cursive;">
                    blog    
                </a>
                |
                <a href="" style="font-family: 'Staatliches', cursive;">
                    feedback
                </a>
            </p>
    </div>
</div>
</template>

.<script>
export default {
    beforeCreate() {
        if(!this.$session.exists()) {
            this.$router.push('/');
        }
    },
    mounted() {
        this.$store.dispatch('GET_USER');
        this.$store.dispatch('GET_QUESTION');
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Staatliches');

</style>


