<template>
    <div id="user">
        <div class="main animated"
             :class="[ leaveUser ? 'fadeOutDown' : 'fadeInRight' ]">
            <!-- begin panel -->
            <div class="panel">
                <Info @showMenu="switchOver(true)" />
                <Search />
                <Tab />
                <Menu v-if="menuSeen" />
            </div>
            <div class="shade"
                 v-if="isActive"
                 @click="switchOver(false)"></div>
            <!-- end panel -->
            <!-- begin messageWindow -->
            <Box />
            <!-- end messageWindow -->
        </div>
    </div>
</template>

<script>
    import Info from './panel/Info'
    import Search from './panel/Search'
    import Menu from './panel/Menu'
    import Tab from './panel/tab/Tab'
    import Box from './messageWindow/Box'
    import {
        mapGetters,
        mapMutations
    } from 'vuex'

    export default {
        name: 'User',
        components: { Info, Search, Tab, Box, Menu },
        data () {
            return {
                menuSeen: false,
                leaveUser: false
            }
        },
        computed: {
            ...mapGetters([
                'isActive'
            ])
        },
        methods: {
            ...mapMutations([
                'setIsActive'
            ]),
            switchOver (bool) {
                this.menuSeen = bool
                this.setIsActive(bool)
            }
        }
    }
</script>

<style lang="scss" scoped>
    #user {
      height: 90%;
      min-height: 600px;
      padding-top: 100px;
      transition: margin 0.3s linear;
      backface-visibility: hidden;

      > .main {
        max-width: 1000px;
        min-width: 800px;
        height: 100%;
        margin: 0 auto;
        border-radius: 3px;
        overflow: hidden;

        &.fadeInRight {
          animation-duration: 0.5s;
        }

        &:after {
          content: ".";
          display: block;
          height: 0;
          clear: both;
          visibility: hidden;
        }

        > .panel {
          position: relative;
          width: 280px;
          height: 100%;
          float: left;
          background: #9bc9e5;
        }

        > .shade {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 98;
        }
      }
    }
</style>
