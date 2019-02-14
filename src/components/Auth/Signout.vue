<template>
<div></div>
</template>

<script>
export default {
    created() {
        this.logout();
    },
    methods: {
        logout() {
            this.$session.destroy();
            localStorage.clear();
            this.$router.push('/');

        },
    }
}
</script>
