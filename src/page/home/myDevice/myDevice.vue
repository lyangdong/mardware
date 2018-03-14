<!--Author wangsheng 我的设备——页面-->
<template>
    <div class="my_device_container">
        <DeviceMenu/>
        <div class="my_device_router_container">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import DeviceMenu from './myDeviceMenu'
    export default {
        name : 'MyDevice',
        data(){
            return {

            }
        },
        components : {
            DeviceMenu,
        }
    }
</script>

<style lang="scss" scoped>
    .my_device_container{
        width: 100%;
        display: flex;
        overflow-x: auto;
        .my_device_router_container{
            flex: 1;
            display: flex;
            overflow-y: hidden;
        }
    }
</style>
