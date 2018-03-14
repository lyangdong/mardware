<!--Author wangsheng-->
<template>
    <div class="my_device_right_container">
        <DeviceRightHead/>
        <div class="my_device_right_router_container">
            <transition>
                <router-view/>
            </transition>         
        </div>
    </div>    
</template>

<script>
    import DeviceRightHead from './deviceRightHead'
    export default {
        name : 'MyDeviceRight',
        data(){
            return {

            }
        },
        components : {
            DeviceRightHead,
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../../style/mixin";
    .my_device_right_container{
        flex: 1;       
        @include flex(column);   
        background-color: #f9f9f9;
        .my_device_right_router_container{
            flex: 1;
            overflow-y: auto;          
        }
    }
</style>
