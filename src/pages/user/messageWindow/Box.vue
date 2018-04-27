<template>
    <div id="box">
        <!-- begin head -->
        <BoxHead v-if="Object.keys(getNowChat).length"
                 :nowChat="getNowChat"
                 :chatHistory="chatHistory" />
        <!-- end head -->
        <!-- begin body -->
        <BoxBody :chatHistory="chatHistory"
                 :nowChat="getNowChat" />
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
                for (let i = 0; i < this.chatHistories.length; i++) {
                    if (this.getNowChat.chatId === this.chatHistories[i]._id) {
                        return this.chatHistories[i]
                    }
                }
            }
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
