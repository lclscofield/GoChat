<template>
    <div id="group">
        <div class="groupList">
            <div class="groupItemWrap"
                 v-if="groups.length">
                <h3>群组</h3>
                <div class="groupItem"
                     v-for="(item, index) in groups"
                     :key="index"
                     @dblclick="emitSession(item)">
                    <div class="avatar">
                        <img src="//res.wx.qq.com/a/wx_fed/webwx/res/static/img/2KriyDK.png"
                             alt="avatar">
                    </div>
                    <div class="info">
                        <h4>{{ item.name }}</h4>
                    </div>
                </div>
            </div>
            <div class="groupItemWrap"
                 v-if="friends.length">
                <h3>好友</h3>
                <div class="groupItem"
                     v-for="(item, index) in friends"
                     :key="index"
                     @dblclick="emitSession(item)">
                    <div class="avatar">
                        <img src="//res.wx.qq.com/a/wx_fed/webwx/res/static/img/2KriyDK.png"
                             alt="avatar">
                    </div>
                    <div class="info">
                        <h4>{{ item.name }}</h4>
                    </div>
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
        name: 'Group',
        props: {
            friends: {
                type: Array
            },
            groups: {
                type: Array
            }
        },
        computed: {
            ...mapGetters([
                'getUserInfo'
            ])
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
    #group {
      position: absolute;
      top: 154px;
      right: 0;
      bottom: 0;
      left: 0;

      > .groupList {
        position: relative;
        height: 100%;
        overflow: auto;

        > .groupItemWrap {
          > h3 {
            padding: 1px 18px;
            font-weight: 400;
            color: #333;
            background: #4a9fd3;
            font-size: 14px;
          }

          > .groupItem {
            overflow: hidden;
            padding: 10px 18px 9px;
            border-bottom: 1px solid #9bb8ee;
            cursor: pointer;

            > .avatar {
              float: left;
              margin-right: 10px;
              position: relative;

              > img {
                display: block;
                width: 30px;
                height: 30px;
                border-radius: 2px;
              }
            }

            > .info {
              overflow: hidden;
              line-height: 30px;

              > h4 {
                color: #333;
                font-weight: 400;
                font-size: 13px;
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
