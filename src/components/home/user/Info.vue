<template>
    <div id="info">
        <div class="avatar">
            <img src="//res.wx.qq.com/a/wx_fed/webwx/res/static/img/2KriyDK.png"
                 alt="avatar">
        </div>
        <div class="info">
            <h3 class="nickname">
                <span>hahaha</span>
                <a href="javascript:;"
                   @click="() => {this.$emit('showMenu')}">
                    <i></i>
                </a>
            </h3>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Info',
        methods: {}
    }
</script>

<style lang="scss" scoped>
    #info {
      padding: 18px;
      position: relative;

      > .avatar {
        display: table-cell;
        vertical-align: middle;
        word-wrap: break-word;
        word-break: break-all;
        white-space: nowrap;
        padding-right: 10.625px;

        > img {
          width: 40px;
          height: 40px;
          border-radius: 2px;
          display: block;
          cursor: pointer;
        }
      }

      > .info {
        display: table-cell;
        vertical-align: middle;
        word-wrap: break-word;
        word-break: break-all;
        width: 2000px;

        span {
          display: inline-block;
          font-weight: 400;
          width: 156px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          color: #fff;
          font-size: 18px;
          vertical-align: top;
          line-height: 31px;
          text-decoration: none;
        }

        a {
          display: inline-block;
          vertical-align: top;

          > i {
            display: inline-block;
            vertical-align: middle;
            width: 30px;
            height: 30px;
            background: url("//res.wx.qq.com/a/wx_fed/webwx/res/static/css/5af37c4a880a95586cd41c5b251d5562@1x.png")
              no-repeat;
            background-position: -434px -398px;
            background-size: 487px 462px;
          }
        }
      }
    }
</style>
