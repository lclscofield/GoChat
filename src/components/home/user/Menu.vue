<template>
    <div id="menu">
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
</template>

<script>
    export default {
        name: 'Menu'
    }
</script>

<style lang="scss" scoped>
    #menu {
      position: absolute;
      top: 60px;
      left: 85px;
      width: 180px;
      z-index: 99;

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
        }

        li:last-child a {
          border: none;
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
</style>
