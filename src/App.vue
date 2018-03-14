<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang='scss'>
    @import "./style/common";
    @import url("//at.alicdn.com/t/font_558887_2xpy6lwbcaw0zfr.css");
    #app{
      width: 100%;
      height: 100%;
      display: flex;
    }
</style>
