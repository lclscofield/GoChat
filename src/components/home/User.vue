<template>
    <div id="user">
        <div class="main">
            <!-- begin panel -->
            <div class="panel">
                <div class="panel-header">
                    <router-view name="info" />
                </div>
                <router-view name="search" />
                <router-view name="messageList" />
            </div>
            <!-- end panel -->
            <!-- begin messageWindow -->
            <router-view name="messageWindow" />
            <!-- end messageWindow -->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'User',
        created () {
            console.log(123)
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
          background: #2e3238;
        }
      }
    }
</style>
