<template>
    <div id="box">
        <!-- begin head -->
        <BoxHead />
        <!-- end head -->
        <!-- begin body -->
        <BoxBody />
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
    export default {
        name: 'Box',
        components: { BoxHead, BoxBody, BoxInput }
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
