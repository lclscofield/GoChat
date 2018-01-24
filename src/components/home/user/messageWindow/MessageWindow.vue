<template>
    <div id="messageWindow">
        <div class="box">
            <MessageShow />
            <MessageInput />
        </div>
    </div>
</template>

<script>
    import MessageShow from './MessageShow'
    import MessageInput from './MessageInput'
    export default {
        name: 'MessageWindow',
        components: { MessageShow, MessageInput }
    }
</script>

<style lang="scss" scoped>
    #messageWindow {
      height: 100%;

      > .box {
        position: relative;
        background-color: #eee;
        height: 100%;
        overflow: hidden;
      }
    }
</style>
