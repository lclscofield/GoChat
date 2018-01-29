<template>
    <div id="messageList">
        <div class="chatList">
            <div class="chatItem">
                <div class="avatar">
                    <img src="//res.wx.qq.com/a/wx_fed/webwx/res/static/img/2KriyDK.png"
                         alt="avatar">
                </div>
                <div class="info">
                    <h3 class="nickname">
                        <span>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</span>
                    </h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MessageList'
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
