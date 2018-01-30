<template>
    <div id="home">
        <router-view />
        <SignUp v-if="show" />
    </div>
</template>

<script>
    import SignUp from './login/SignUp'
    export default {
        name: 'Home',
        components: { SignUp },
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