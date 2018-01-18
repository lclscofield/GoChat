<template>
    <div id="tab">
        <div class="tab">
            <div class="message active">
                <a href="javascript:;">
                    <i></i>
                </a>
            </div>
            <div class="group">
                <a href="javascript:;">
                    <i></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Tab'
    }
</script>

<style lang="scss" scoped>
    #tab {
      > .tab {
        overflow: hidden;
        padding-bottom: 4px;

        &::after {
          content: "";
          display: block;
          clear: both;
        }

        > .message {
          float: left;
          width: 50%;

          > a {
            display: block;
            text-align: center;

            > i {
              display: inline-block;
              vertical-align: middle;
              width: 35px;
              height: 35px;
              background: url("//res.wx.qq.com/a/wx_fed/webwx/res/static/img/1OvE4o2.png")
                0 -2048px;
            }
          }

          &.active > a > i {
            background: url("//res.wx.qq.com/a/wx_fed/webwx/res/static/img/1OvE4o2.png")
              0 -2083px;
          }
        }

        > .group {
          float: left;
          width: 50%;

          > a {
            display: block;
            text-align: center;

            > i {
              display: inline-block;
              vertical-align: middle;
              width: 35px;
              height: 35px;
              background: url("//res.wx.qq.com/a/wx_fed/webwx/res/static/img/1OvE4o2.png")
                0 -2140px;
            }
          }

          &.active > a > i {
            background: url("//res.wx.qq.com/a/wx_fed/webwx/res/static/img/1OvE4o2.png")
              0 -2175px;
          }
        }
      }
    }
</style>
