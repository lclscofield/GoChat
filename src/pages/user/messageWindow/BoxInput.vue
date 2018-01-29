<template>
    <div id="boxInput">
        <!-- 工具栏 -->
        <div class="toolbar">
            <a href="javascript:;"
               title="表情"></a>
        </div>
        <!-- 输入框 -->
        <div class="content">
            <pre contenteditable="plaintext-only"></pre>
        </div>
        <!-- 发送键 -->
        <div class="action">
            <span>按下Cmd/Shift+Enter换行</span>
            <a href="javascript:;">发送</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BoxInput'
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
        height: 40px;
        padding: 5px 17px;

        > a {
          display: inline-block;
          vertical-align: middle;
          width: 30px;
          height: 30px;
          background: url("//res.wx.qq.com/a/wx_fed/webwx/res/static/img/1OvE4o2.png")
            0 -805px;
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
          user-modify: read-write-plaintext-only
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
