<template>
    <div id="home">
        <router-view />
        <Register v-if="show" />
    </div>
</template>

<script>
    import Register from './home/Register'
    export default {
        name: 'Home',
        components: { Register },
        data () {
            return {
                show: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    #home {
      height: 100%;
    }
</style>