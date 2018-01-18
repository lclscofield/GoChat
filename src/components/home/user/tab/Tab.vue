<template>
    <div id="tab">
        <div class="tab">
            <div class="message"
                 :class="{ active: isActive }"
                 @click="show(true)">
                <a href="javascript:;">
                    <i></i>
                </a>
            </div>
            <div class="group"
                 :class="{ active: !isActive }"
                 @click="show(false)">
                <a href="javascript:;">
                    <i></i>
                </a>
            </div>
        </div>
        <!-- begin message-list -->
        <message-list v-if="seen" />
        <!-- end message-list -->
        <!-- begin group -->
        <group v-if="!seen" />
        <!-- end group -->
    </div>
</template>

<script>
    import MessageList from './MessageList'
    import Group from './Group'
    export default {
        name: 'Tab',
        components: { MessageList, Group },
        data () {
            return {
                seen: true,
                isActive: true
            }
        },
        methods: {
            show (bool) {
                this.isActive = bool
                this.seen = bool
            }
        }
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
