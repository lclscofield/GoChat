<template>
    <div id="home">
        <router-view />
        <SignUp v-if="showSignUp" />
    </div>
</template>

<script>
    import SignUp from './login/SignUp'
    import {
        mapGetters
    } from 'vuex'
    export default {
        name: 'Home',
        components: { SignUp },
        data () {
            return {
            }
        },
        computed: {
            ...mapGetters([
                'showSignUp'
            ])
        }
    }
</script>

<style lang="scss" scoped>
    #home {
      height: 100%;
      overflow: hidden;
    }
</style>