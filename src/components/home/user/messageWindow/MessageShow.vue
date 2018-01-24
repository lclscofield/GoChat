<template>
    <div id="messageShow">
        <!-- begin head -->
        <div class="boxHead">
            <div class="chatRoomMembersWrap">
                <div class="membersWrap"
                     v-if="seen">
                    <div class="members"></div>
                </div>
            </div>
            <div class="titleWrap">
                <div class="title"
                     :class="{ active: seen }"
                     @click="showMembers()">
                    <a class="titleName">haha</a>
                    <i></i>
                </div>
            </div>
        </div>
        <!-- end head -->
    </div>
</template>

<script>
    import {
        mapGetters,
        mapMutations
    } from 'vuex'
    export default {
        name: 'MessageShow',
        data () {
            return {
                seen: false
            }
        },
        watch: {
            isActive () {
                if (!this.isActive) {
                    this.seen = this.isActive
                }
            }
        },
        computed: {
            ...mapGetters([
                'isActive'
            ])
        },
        methods: {
            ...mapMutations([
                'setIsActive'
            ]),
            showMembers () {
                this.setIsActive(true)
                this.seen = true
            }
        }
    }
</script>

<style lang="scss" scoped>
    #messageShow {
      > .boxHead {
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        line-height: 30px;

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
            transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);

            > .members {
            }
          }
        }
      }
    }
</style>
