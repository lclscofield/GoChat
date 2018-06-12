<template>
    <div id="menu">
        <ul>
            <li>
                <a href="javascript:;"
                   title="添加好友"
                   @click="show()">
                    <i></i>添加好友
                </a>
            </li>
            <!-- <li>
                <a href="javascript:;"
                   title="关闭声音">
                    <i></i>关闭声音
                </a>
            </li> -->
            <li>
                <a href="javascript:;"
                   title="退出"
                   @click="$emit('exit', true)">
                    <i></i>退出
                </a>
            </li>
            <li v-if="showAdd">
                <input type="text"
                       placeholder="用户名或手机号"
                       ref="focus"
                       v-model.trim="value"
                       @keyup.enter="add()">
            </li>
        </ul>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex'

    export default {
        name: 'Menu',
        data () {
            return {
                showAdd: false,
                value: ''
            }
        },
        methods: {
            ...mapActions([
                'addFriend'
            ]),
            show () {
                this.showAdd = true
                setTimeout(() => {
                    this.$refs.focus.focus()
                })
            },
            add () {
                console.log(123)
                this.addFriend({ account: this.value }).then(data => {
                    if (data.errType === 'account') {
                        alert('未找到指定用户')
                    } else if (data.errType === 'added') {
                        alert('已添加此用户')
                    } else {
                        alert('添加成功')
                    }
                }).catch(() => {
                    alert('添加失败')
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #menu {
      position: absolute;
      top: 60px;
      left: 85px;
      width: 180px;
      z-index: 100;

      > ul {
        background-color: #eee;
        border-radius: 4px;
        overflow: hidden;
        border: 1px solid #e8e4e4;
        box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.1);
        min-width: 125px;

        > li {
          > a {
            display: block;
            text-decoration: none;
            color: #000;
            font-size: 14px;
            padding: 8px;
            border-bottom: 1px solid #a5a3a3;
            text-align: left;

            &:hover {
              background-color: #ddd;
            }

            > i {
              display: inline-block;
              vertical-align: middle;
              width: 34px;
              height: 34px;
              margin-right: 8px;
              background-position: -238px -398px;
              background-size: 487px 462px;
            }
          }

          > input {
            max-width: 150px;
            height: 32px;
            line-height: 32px;
            border: 0;
            border-radius: 2px;
            padding: 3px;
            margin: 10px;
            font-size: 14px;
            outline: none;
          }
        }

        li:last-child a {
          border: none;
        }
        li:nth-child(1) i {
          background: url("//res.wx.qq.com/a/wx_fed/webwx/res/static/img/1OvE4o2.png")
            0 -66px;
        }
        // li:nth-child(2) i {
        //   background: url("//res.wx.qq.com/a/wx_fed/webwx/res/static/img/1OvE4o2.png")
        //     0 -338px;
        // }
        li:nth-child(2) i {
          background: url("//res.wx.qq.com/a/wx_fed/webwx/res/static/img/1OvE4o2.png")
            0 -270px;
        }
      }
    }
</style>
