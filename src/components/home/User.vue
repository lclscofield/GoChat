<template>
    <div id="user">
        <div class="main">
            <!-- begin panel -->
            <div class="panel">
                <Info @showMenu="switchOver(true)" />
                <Search />
                <MessageList />
                <Menu v-if="seen" />
            </div>
            <div class="shade"
                 v-if="seen"
                 @click="switchOver(false)"></div>
            <!-- end panel -->
            <!-- begin messageWindow -->
            <MessageWindow />
            <!-- end messageWindow -->
        </div>
    </div>
</template>

<script>
    import Info from './user/Info'
    import Search from './user/Search'
    import MessageList from './user/MessageList'
    import MessageWindow from './user/MessageWindow'
    import Menu from './user/Menu'

    export default {
        name: 'User',
        components: { Info, Search, MessageList, MessageWindow, Menu },
        data () {
            return {
                seen: false
            }
        },
        created () {
            console.log(123)
        },
        methods: {
            switchOver (bool) {
                this.seen = bool
            }
        }
    }
</script>

<style lang="scss" scoped>
    #user {
      height: 80%;
      min-height: 600px;
      margin-top: 100px;
      transition: margin 0.3s linear;
      backface-visibility: hidden;

      > .main {
        max-width: 1000px;
        min-width: 800px;
        height: 100%;
        margin: 0 auto;
        border-radius: 3px;
        overflow: hidden;

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
