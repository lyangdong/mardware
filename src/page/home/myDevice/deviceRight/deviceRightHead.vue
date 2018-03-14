<!--Author wangsheng-->
<template>
    <div class="device_activation_head_container">
        <div 
            class="device_router_btn"
            :key="item.menuRouter"
            @click="switchRouter(index,item)"
            v-for="(item,index) in menuList" 
            :class="{active:index===routerIndex}">
            <i class="iconfont" :class="item.menuIcon"></i>
            <span>{{item.menuText}}</span>       
        </div>        
    </div>
</template>

<script>
    export default {
        name : 'DeviceRightHead',
        data(){
            return {
                routerIndex: 0,
                menuList: [
                    {
                        menuText: '独立设备',
                        menuIcon: 'icon-independent',
                        menuRouter: '/home/mydevice/right/independent'
                    },{
                        menuText: '设备组',
                        menuIcon: 'icon-group',
                        menuRouter: '/home/mydevice/right/group'
                    }
                ]
            }
        },
        methods : {
            switchRouter(index,value){
                this.routerIndex = index;
                this.$router.push(value.menuRouter);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../../style/mixin.scss";
    .device_activation_head_container{
        min-height: 100px;
        display: flex;
        overflow: hidden;     
        background-color: #fff;        
        .device_router_btn{
            flex: 1;
            height: 100px;
            user-select: none;
            cursor: pointer;                  
            text-align: center;
            @include flex(row);
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #e2e2e2;
            @include font(22px,99px,#939393);
            .iconfont{
                font-size:22px;
                margin-right: 20px;             
            }
            &.active{                
                color: #42ac89;
                position: relative;
                &:after{
                    content: '';
                    z-index: 1;
                    @include wh(25px,25px);                    
                    border: 1px solid #e2e2e2;
                    position: absolute;
                    left: 50%;
                    bottom: -18px;                    
                    transform: rotate(45deg);
                    background-color: #f9f9f9;
                }
            }
            &:last-child{
                .iconfont{
                    font-size: 24px;
                }
            }
            &:hover{
                color: #42ac89;
            }
        }         
    }
</style>
