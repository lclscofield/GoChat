<template>
    <div id="boxInput">
        <!-- 工具栏 -->
        <div class="toolbar">
            <!-- <a href="javascript:;"
               title="表情"></a> -->
            <!-- <input type="file"
                   accept="image/*"
                   name="file"
                   id="file"
                   class="input-file">
            <label for="file"
                   class='btn-input-file'>Choose a image</label> -->
        </div>
        <!-- 输入框 -->
        <div class="content">
            <pre contenteditable="plaintext-only"
                 ref="input"
                 @keyup.shift.enter="sendMsg()"></pre>
        </div>
        <!-- 发送键 -->
        <div class="action">
            <span>按下Cmd/Shift+Enter发送</span>
            <a href="javascript:;"
               @click="sendMsg()">发送</a>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapMutations
    } from 'vuex'
    import io from 'socket.io-client'

    export default {
        name: 'BoxInput',
        props: ['nowChat', 'socket'],
        data () {
            return {
            }
        },
        computed: {
            ...mapGetters([
                'getUserInfo'
            ])
        },
        methods: {
            ...mapMutations([
                'setSocket'
            ]),
            sendMsg () { // 发送消息
                let data = {
                    msg: this.$refs.input.innerText.trim(),
                    id: this.nowChat.chatId,
                    myId: this.getUserInfo._id,
                    date: this.dateFormat('yyyy-MM-dd hh:mm:ss')
                }
                if (!this.socket) {
                    console.log(123)
                    this.setSocket(io.connect('http://localhost:3000'))
                }
                if (data.msg) {
                    console.log('send', data)
                    this.socket.emit('chat message', data)
                }
                this.$refs.input.innerText = ''
            },
            dateFormat (format) {
                let date = new Date()
                let args = {
                    'M+': date.getMonth() + 1,
                    'd+': date.getDate(),
                    'h+': date.getHours(),
                    'm+': date.getMinutes(),
                    's+': date.getSeconds(),
                    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
                    'S': date.getMilliseconds()
                }
                if (/(y+)/.test(format)) { format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
                for (let i in args) {
                    let n = args[i]
                    if (new RegExp('(' + i + ')').test(format)) { format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? n : ('00' + n).substr(('' + n).length)) }
                }
                return format
            }
        }
    }
</script>

<style lang="scss" scoped>
    #boxInput {
      height: 180px;
      margin-right: 19px;
      border-top: 1px solid #d6d6d6;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;

      > .toolbar {
        // height: 40px;
        height: 10px;
        padding: 5px 17px;

        > a {
          display: inline-block;
          vertical-align: middle;
          width: 30px;
          height: 30px;
          background: url("//res.wx.qq.com/a/wx_fed/webwx/res/static/img/1OvE4o2.png")
            0 -805px;
        }

        > .input-file {
          position:absolute;clip:rect(0 0 0 0);
        }

        > .btn-input-file {
            background: rgb(96, 186, 221);
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
        }
      }

      > .content {
        > pre {
          height: 6em;
          overflow-y: auto;
          overflow-x: hidden;
          padding-left: 20px;
          outline: none;
          border: 0;
          font-size: 14px;
          margin: 0;
          font-family: inherit;
          white-space: pre-wrap;
          word-break: normal;
          -webkit-user-modify: read-write-plaintext-only;
        }
      }

      > .action {
        text-align: right;
        margin-top: 5px;

        > span {
          color: #888;
          font-size: 12px;
          margin-left: 10px;
          margin-right: 7px;
        }

        > a {
          background-color: #fff;
          color: #222;
          display: inline-block;
          border: 1px solid #c1c1c1;
          border-radius: 4px;
          padding: 3px 30px;
          font-size: 14px;
        }
      }
    }
</style>
