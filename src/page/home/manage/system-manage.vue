<template>
  <div class="my_system_container">
    <SystemMenu/>
    <div class="my_system_router_container">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import SystemMenu from './system-menu.vue'

  export default {
    name: 'system-manage',
    data(){
      return {

      }
    },
    components: {
      SystemMenu,
    }
  }
</script>

<style lang="scss" scoped>
  .my_system_container {
    width: 100%;
    display: flex;
    overflow-x: auto;
    .my_system_router_container {
      flex: 1;
      display: flex;
      overflow-y: auto;
    }
  }
</style>
