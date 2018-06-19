<template>
    <div id="messageList">
        <div class="chatList">
            <div class="chatItem"
                 v-for="(item, index) in messageList"
                 :key="index"
                 :class="{ me: item.chatId === getNowChat.chatId }"
                 @click="$emit('emitChat', { item, bool: true })">
                <div class="avatar">
                    <img :src="`https://source.unsplash.com/user/${item.name}`"
                         alt="avatar">
                </div>
                <div class="info">
                    <h3 class="nickname">
                        <span>{{ item.name }}</span>
                    </h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'

    export default {
        name: 'MessageList',
        props: {
            messageList: {
                type: Array
            }
        },
        computed: {
            ...mapGetters([
                'getNowChat',
                'getUserInfo',
                'searchHint',
                'searchSwitch'
            ])
        },
        watch: {
            searchSwitch () {
                console.log(123)
                this.emitSession(this.searchHint)
            }
        },
        methods: {
            ...mapActions([
                'addSession',
                'getMessage'
            ]),
            emitSession (item) {
                if (!this.getUserInfo.chatHistory.length || !this.getUserInfo.chatHistory.some(someone => someone.chatId === item.chatId)) {
                    this.addSession(item)
                }
                this.$emit('emitChat', { item, bool: true })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #messageList {
      position: absolute;
      top: 154px;
      right: 0;
      bottom: 0;
      left: 0;

      > .chatList {
        position: relative;
        height: 100%;
        overflow: auto;

        > .chatItem {
          overflow: hidden;
          padding: 12px 18px 11px;
          border-bottom: 1px solid #9bb8ee;
          cursor: pointer;

          &.me {
            background: #4681f0;
            &:hover {
              background: #4681f0;
            }
          }

          &:hover {
            background: #7fa7f1;
          }

          > .avatar {
            float: left;
            margin-right: 10px;
            position: relative;

            > img {
              display: block;
              width: 40px;
              height: 40px;
              border-radius: 2px;
            }
          }

          > .info {
            overflow: hidden;

            > .nickname {
              font-weight: 400;
              font-size: 13px;
              color: #333;
              line-height: 20px;

              > span {
                display: inline-block;
                vertical-align: top;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-wrap: normal;
              }
            }
          }
        }
      }
    }
</style>
