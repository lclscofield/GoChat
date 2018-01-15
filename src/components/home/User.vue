<template>
    <div id="user">
        <div class="main">
            <!-- begin panel -->
            <div class="panel">
                <div class="panel-header">
                    <div class="avatar">
                        <img src="//res.wx.qq.com/a/wx_fed/webwx/res/static/img/2KriyDK.png"
                             alt="avatar">
                    </div>
                    <div class="info">
                        <h3 class="nickname">
                            <span></span>
                            <a href=""></a>
                        </h3>
                    </div>
                </div>
            </div>
            <!-- end panel -->
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

          > .panel-header {
            padding: 18px;
            position: relative;

            > .avatar {
              display: table-cell;
              vertical-align: middle;
              word-wrap: break-word;
              word-break: break-all;
              white-space: nowrap;
              padding-right: 10.625px;

              > img {
                width: 40px;
                height: 40px;
                border-radius: 2px;
                display: block;
                cursor: pointer;
              }
            }

            > .info {
              display: table-cell;
              vertical-align: middle;
              word-wrap: break-word;
              word-break: break-all;
              width: 2000px;
            }
          }
        }
      }
    }
</style>
