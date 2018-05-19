<template>
    <div id="boxBody"
         ref="boxBody">
        <div class="messages"
             v-if="chatHistory">
            <div class="message"
                 v-for="(item, index) in chatHistory.chat"
                 :key="index"
                 :class="{me : item.myId === getUserInfo._id}">
                <div class="messageTime"
                     v-if="!now">{{ item.date }}</div>
                <img src="//res.wx.qq.com/a/wx_fed/webwx/res/static/img/2KriyDK.png"
                     alt="avatar">
                <div class="content">
                    <div class="bubble">{{ item.msg }}</div>
                </div>
            </div>
        </div>
        <div class="messageEmpty"
             v-if="chatHistory ? !chatHistory.chat.length : true">
            <i v-if="!chatHistory"></i>
            <p v-if="chatHistory ? !chatHistory.chat.length : false">暂时没有新消息</p>
            <p v-if="!chatHistory">未选择聊天</p>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'

    export default {
        name: 'BoxBody',
        props: ['nowChat', 'chatHistory', 'socket'],
        data () {
            return {
                now: true
            }
        },
        computed: {
            ...mapGetters([
                'getUserInfo'
            ])
        },
        watch: {
            nowChat () {
                let time = setInterval(() => {
                    this.$refs.boxBody.scrollTop = this.$refs.boxBody.scrollHeight - this.$refs.boxBody.clientHeight
                    if (this.$refs.boxBody.scrollTop !== 0) {
                        clearInterval(time)
                    }
                }, 100)
                // let timer = setTimeout(() => {
                //     this.now = false
                // }, 60000)
                // 接收消息
                this.socket.on(`${this.nowChat.chatId}`, data => {
                    console.log('on', data)
                    if (this.chatHistory.chat.length >= 50) {
                        this.chatHistory.chat.shift()
                        this.chatHistory.chat.push(data)
                    } else {
                        this.chatHistory.chat.push(data)
                    }
                    // this.now = true
                    // clearTimeout(timer)
                    // timer = setTimeout(() => {
                    //     this.now = false
                    // }, 60000)
                    setTimeout(() => {
                        this.$refs.boxBody.scrollTop = this.$refs.boxBody.scrollHeight
                    })
                })
            }
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    #boxBody {
      position: absolute;
      padding: 0 19px;
      bottom: 180px;
      top: 51px;
      left: 0;
      right: 0;
      overflow-y: auto;
      overflow-x: hidden;

      > .messageEmpty {
        text-align: center;
        margin-top: 130px;
        color: #ccc;
        font-size: 13px;

        > i {
          display: inline-block;
          vertical-align: middle;
          width: 100px;
          height: 90px;
          background: url("//res.wx.qq.com/a/wx_fed/webwx/res/static/img/1OvE4o2.png")
            0 -1332px;
        }
      }

      > .messages {
        > .message {
          margin-bottom: 16px;
          float: left;
          width: 100%;

          &.me {
            float: right;
            text-align: right;
            > img {
              float: right;
            }
            > .content {
              > .bubble {
                &::before {
                  border-left-color: #b2e281;
                  border-right-color: transparent;
                  left: 100%;
                }
              }
            }
          }

          > .messageTime {
            text-align: center;
            margin: 10px auto;
            font-size: 12px;
            color: #b2b2b2;
          }

          > img {
            width: 40px;
            height: 40px;
            border-radius: 2px;
            float: left;
            cursor: pointer;
          }

          > .content {
            overflow: hidden;

            > .bubble {
              background-color: #b2e281;
              max-width: 500px;
              min-height: 1em;
              display: inline-block;
              vertical-align: top;
              position: relative;
              text-align: left;
              font-size: 14px;
              border-radius: 3px;
              margin: 0 10px;
              word-wrap: break-word;
              word-break: break-all;
              min-height: 25px;
              padding: 9px 13px;

              &::before {
                position: absolute;
                top: 14px;
                border: 6px solid transparent;
                border-right-color: #b2e281;
                content: " ";
                right: 100%;
              }
            }
          }
        }
      }
    }
</style>
