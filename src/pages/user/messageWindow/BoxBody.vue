<template>
    <div id="boxBody">
        <div class="messages">
            <div class="message"></div>
        </div>
        <div class="messageEmpty"
             v-if="noMessage">
            <i v-if="showHint"></i>
            <p v-if="!showHint">暂时没有新消息</p>
            <p v-if="showHint">未选择聊天</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BoxBody',
        data () {
            return {
                noMessage: true, // 刚加载时显示空白页
                showHint: false
            }
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
    }
</style>
