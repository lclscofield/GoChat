<template>
    <div id="boxHead">
        <div class="chatRoomMembersWrap">
            <div class="membersWrap"
                 v-if="seen">
                <div class="members">
                    <div class="membersInner">
                        <!-- <div class="addMember"
                             @click="showFriends()">
                            <i></i>
                        </div> -->
                        <div class="member"
                             v-for="(item, index) in chatHistory.member"
                             :key="index">
                            <img :src="`https://source.unsplash.com/user/${item.name}`"
                                 alt="avatar">
                            <p class="nickname">{{ item.name }}</p>
                        </div>
                    </div>
                </div>
                <div class="addFriend"
                     v-if="showOtherFriend">
                    <ul>
                        <li v-for="(item, index) in otherFriends"
                            :key="index"
                            @click="addMember(item)">{{ item.name }}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="titleWrap">
            <div class="title"
                 :class="{ active: seen }"
                 @click="showMembers()">
                <a class="titleName">{{ nowChat.name }}</a>
                <i></i>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapMutations,
        mapActions
    } from 'vuex'

    export default {
        name: 'BoxHead',
        props: ['nowChat', 'chatHistory'],
        data () {
            return {
                seen: false, // 显示成员列表
                showOtherFriend: false, // 显示其他好友
                otherFriends: [] // 其他好友
            }
        },
        created () {
            console.log(this.nowChat)
        },
        watch: {
            isActive () {
                if (!this.isActive) {
                    this.seen = this.isActive
                    this.showOtherFriend = this.isActive
                }
            }
        },
        computed: {
            ...mapGetters([
                'isActive',
                'getUserInfo'
            ])
        },
        methods: {
            ...mapMutations([
                'setIsActive'
            ]),
            ...mapActions([
                'setGroup'
            ]),
            showMembers () {
                this.setIsActive(true)
                this.seen = true
            },
            showFriends () {
                this.showOtherFriend = true
                this.otherFriends = this.getUserInfo.friends.filter(item => {
                    return !this.chatHistory.member.some(item2 => {
                        return item.userId === item2.userId
                    })
                })
            },
            addMember (item) {
                let str = ''
                let nowChat
                this.chatHistory.member.length > 2 ? str = 'add' : str = 'set'
                if (str === 'set') {
                    this.getUserInfo.friends.forEach(item => {
                        if (item.chatId === this.nowChat.chatId) {
                            nowChat = this.nowChat
                            nowChat.userId = item.userId
                        }
                    })
                }
                this.setGroup({
                    str,
                    item,
                    nowChat
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #boxHead {
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      line-height: 30px;

      > .chatRoomMembersWrap {
        > .membersWrap {
          position: absolute;
          top: 50px;
          left: 0;
          margin-top: 1px;
          box-shadow: 1px 1px 1px #e0e0e0;
          width: 100%;
          background-color: #fff;
          z-index: 100;

          > .members {
            padding: 10px 4px 8px 17px;
            background-color: #eee;
            border-bottom: 1px solid #dedede;

            > .membersInner {
              margin-right: -4px;
              max-height: 300px;
              overflow-y: auto;
              overflow-x: hidden;

              &::after {
                content: "";
                display: block;
                clear: both;
              }

              > .addMember {
                cursor: pointer;
                float: left;
                position: relative;
                height: 85px;
                margin-right: 15px;
                margin-left: 7px;
                margin-top: 10px;

                > i {
                  display: inline-block;
                  vertical-align: middle;
                  width: 55px;
                  height: 55px;
                  background: url("//res.wx.qq.com/a/wx_fed/webwx/res/static/img/1OvE4o2.png")
                    0 -466px;
                }
              }

              > .member {
                float: left;
                position: relative;
                height: 85px;
                margin-right: 7px;
                margin-left: 7px;
                margin-top: 10px;

                > img {
                  display: block;
                  cursor: pointer;
                  width: 55px;
                  height: 55px;
                  background-color: #ccc;
                }

                > .nickname {
                  color: #888;
                  width: 72px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  word-wrap: normal;
                  font-size: 12px;
                  margin-left: -8px;
                  vertical-align: middle;
                }
              }
            }
          }

          > .addFriend {
            > ul {
              > li {
                cursor: pointer;
                background-color: #ddd;
                &:hover {
                  background-color: #aaa;
                }
              }
            }
          }
        }
      }

      > .titleWrap {
        position: relative;
        padding: 10px 0;
        margin: 0 19px;
        border-bottom: 1px solid #d6d6d6;
        background-color: #eee;

        > .title {
          position: relative;
          height: 25px;
          display: inline-block;
          font-size: 14px;
          cursor: pointer;

          > a.titleName {
            display: inline-block;
            vertical-align: middle;
            max-width: 300px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
            color: #000;
            font-weight: 400;
          }

          > i {
            display: inline-block;
            vertical-align: middle;
            width: 10px;
            height: 10px;
            background: url("//res.wx.qq.com/a/wx_fed/webwx/res/static/img/1OvE4o2.png")
              0 -795px;
          }

          &.active > i {
            background: url("//res.wx.qq.com/a/wx_fed/webwx/res/static/img/1OvE4o2.png")
              0 -2362px;
          }
        }
      }
    }
</style>
