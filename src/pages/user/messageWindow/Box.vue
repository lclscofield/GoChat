<template>
    <div id="box">
        <!-- begin head -->
        <BoxHead v-if="Object.keys(getNowChat).length"
                 :nowChat="getNowChat" />
        <!-- end head -->
        <!-- begin body -->
        <BoxBody :chatHistory="chatHistory" />
        <!-- end body -->
        <!-- begin input -->
        <BoxInput />
        <!-- end input -->
    </div>
</template>

<script>
    import BoxHead from './BoxHead'
    import BoxBody from './BoxBody'
    import BoxInput from './BoxInput'
    import {
        mapGetters
    } from 'vuex'

    export default {
        name: 'Box',
        components: { BoxHead, BoxBody, BoxInput },
        props: {
            chatHistories: {
                type: Array
            }
        },
        computed: {
            ...mapGetters([
                'getNowChat'
            ]),
            chatHistory () {
                this.chatHistories.forEach(item => {
                    if (this.getNowChat.chatId === item.chatId) {
                        return item
                    }
                })
            }
        },
        created () {
            console.log(this.getNowChat, this.chatHistories)
        }
    }
</script>

<style lang="scss" scoped>
    #box {
      position: relative;
      background-color: #eee;
      height: 100%;
      overflow: hidden;
    }
</style>
