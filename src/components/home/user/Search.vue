<template>
    <div id="search">
        <i class="searchIcon"></i>
        <input type="text"
               placeholder="搜索">
    </div>
</template>

<script>
    export default {
        name: 'Search'
    }
</script>

<style lang="scss" scoped>
    #search {
      position: relative;
      width: 244px;
      margin: 0 auto 6px;

      > .searchIcon {
        position: absolute;
        display: inline-block;
        vertical-align: middle;
        width: 30px;
        height: 30px;
        z-index: 100;
        top: 1px;
        background: url("//res.wx.qq.com/a/wx_fed/webwx/res/static/img/1OvE4o2.png")
          0 -1946px;
      }

      > input {
        width: 214px;
        height: 32px;
        line-height: 32px;
        border: 0;
        border-radius: 2px;
        background-color: #4a9fd3;
        color: #333;
        padding-left: 30px;
        font-size: 14px;
        outline: none;
      }

      > input::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #333;
      }
      > input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #333;
      }
      > input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #333;
      }
      > input:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #333;
      }
    }
</style>
