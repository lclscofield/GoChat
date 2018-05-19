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
        <message-list v-if="isActive"
                      :messageList="userInfo.chatHistory"
                      @emitChat="emitMessage" />
        <!-- end message-list -->
        <!-- begin group -->
        <group v-if="!isActive"
               :friends="userInfo.friends"
               :groups="userInfo.groups"
               @emitChat="emitMessage" />
        <!-- end group -->
    </div>
</template>

<script>
    import MessageList from './MessageList'
    import Group from './Group'
    import {
        mapMutations,
        mapActions
    } from 'vuex'

    export default {
        name: 'Tab',
        components: { MessageList, Group },
        props: {
            userInfo: {
                type: Object
            },
            chatHistories: {
                type: Array
            }
        },
        data () {
            return {
                isActive: true
            }
        },
        methods: {
            ...mapMutations([
                'setNowChat'
            ]),
            ...mapActions([
                'getMessage'
            ]),
            show (bool) {
                this.isActive = bool
            },
            emitMessage (obj) {
                this.show(obj.bool)
                if (!this.chatHistories.length || !this.chatHistories.some(someone => someone._id === obj.item.chatId)) {
                    this.getMessage(obj.item)
                }
                this.setNowChat(obj.item)
                sessionStorage.setItem('nowChat', JSON.stringify(obj.item))
            }
        }
    }
</script>

<style lang="scss" scoped>
    #tab {
      > .tab {
        overflow: hidden;
        padding-bottom: 4px;
        position: relative;

        &::after {
          content: "";
          display: block;
          clear: both;
          position: absolute;
          border-bottom: 1px solid #9bb8ee;
          height: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }

        > .message {
          float: left;
          width: 50%;
          position: relative;

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

          &::after {
            content: "";
            position: absolute;
            top: 7px;
            right: 0;
            width: 0;
            height: 20px;
            border-right: 1px solid #869bc1;
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
