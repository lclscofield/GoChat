<template>
    <div id="signUp">
        <div class="signUp-box"></div>
    </div>
</template>

<script>
    export default {
        name: 'SignUp'
    }
</script>

<style lang="scss" scoped>
    #signUp {
      height: 100%;
      min-width: 860px;
      min-height: 700px;
      overflow: auto;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 98;

      > .register-box {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -190px;
        margin-top: -270px;
        border-radius: 4px;
        background-color: #9bc9e5;
        width: 380px;
        height: 540px;
        box-shadow: 0 2px 10px #999;
      }
    }
</style>
