<template>
    <div id="home">
        <router-view />
        <Register v-if="show" />
    </div>
</template>

<script>
    import Register from './login/Register'
    export default {
        name: 'Home',
        components: { Register },
        data () {
            return {
                show: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    #home {
      height: 100%;
    }
</style>