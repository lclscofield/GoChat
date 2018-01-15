<template>
    <div id="user">
        <div class="main">
            <!-- begin panel -->
            <div class="panel">
                <router-view name="info" />
                <router-view name="search" />
                <router-view name="messageList" />
                <div class="menu">
                    <ul>
                        <li>
                            <a href="javascript:;"
                               title="发起聊天">
                                <i></i>发起聊天
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;"
                               title="关闭声音">
                                <i></i>关闭声音
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;"
                               title="退出">
                                <i></i>退出
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- end panel -->
            <!-- begin messageWindow -->
            <router-view name="messageWindow" />
            <!-- end messageWindow -->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'User',
        created () {
            console.log(123)
        }
    }
</script>

<style lang="scss" scoped>
    #user {
      height: 80%;
      min-height: 600px;
      margin-top: 100px;
      transition: margin 0.3s linear;
      backface-visibility: hidden;

      > .main {
        max-width: 1000px;
        min-width: 800px;
        height: 100%;
        margin: 0 auto;
        border-radius: 3px;
        overflow: hidden;

        &:after {
          content: ".";
          display: block;
          height: 0;
          clear: both;
          visibility: hidden;
        }

        > .panel {
          position: relative;
          width: 280px;
          height: 100%;
          float: left;
          background: #2e3238;

          > .menu {
            position: absolute;
            top: 60px;
            left: 85px;
            width: 180px;
            z-index: 99;

            > ul {
              background-color: #fff;
              border-radius: 4px;
              overflow: hidden;
              border: 1px solid #d6d6d6;
              box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.1);
              min-width: 125px;

              > li {
                > a {
                  display: block;
                  text-decoration: none;
                  color: #000;
                  font-size: 14px;
                  padding: 8px;
                  border-bottom: 1px solid #f1f1f1;
                  text-align: left;

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
              }

              li:nth-child(1) i {
                background: url("//res.wx.qq.com/a/wx_fed/webwx/res/static/img/1OvE4o2.png")
                  0 -66px;
              }
              li:nth-child(2) i {
                background: url("//res.wx.qq.com/a/wx_fed/webwx/res/static/img/1OvE4o2.png")
                  0 -338px;
              }
              li:nth-child(3) i {
                background: url("//res.wx.qq.com/a/wx_fed/webwx/res/static/img/1OvE4o2.png")
                  0 -270px;
              }
            }
          }
        }
      }
    }
</style>
