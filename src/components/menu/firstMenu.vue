<!--Author wangsheng 一级菜单-->
<template>
    <div class="menu_container">
        <div class="global_container">
            <el-menu
            id="firstMenu"
            mode="horizontal"             
            menu-trigger="click"
            :router="menuUseRouter"
            :default-active="activeRouter">
                <el-menu-item
                    :key="item.switchRouter" 
                    :index="item.switchRouter" 
                    v-for="item in menuList">
                    {{item.menuText}}
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
    export default {
        name : 'FirstMenu',
        data(){
            return {
                activeRouter : null,
                menuUseRouter : true,                
                menuList : [
                    {
                        menuText : '首页',
                        switchRouter : '/home/index'                        
                    },{
                        menuText : '我的设备',
                        switchRouter : '/home/mydevice'                        
                    },{
                        menuText : '运维管理',
                        switchRouter : '/home/MochaITOM'
                    },{
                        menuText : '应用服务',
                        switchRouter : '/home/application'
                    },{
                        menuText : '系统管理',
                        switchRouter : '/home/manage'
                    }
                ]
            }
        },
        methods : {
           
        },
        mounted(){

            let nowPaths = window.location.pathname.split('/');

            if(nowPaths.length > 3){
                nowPaths = nowPaths.slice(0,3);
            }

            this.activeRouter = nowPaths.join('/');
        }
    }
</script>

<style lang="scss" scoped>
    .menu_container{
        height: 60px;
        background-color: #22252a;
        #firstMenu{
            border: none;
            background-color: transparent;
            .el-menu-item{
                color: #fff;
                font-size: 16px;
                padding: 0px 30px;
                letter-spacing: .5px;
                &:hover{                    
                    color: #42ac89;                    
                    background-color: transparent;
                }
                &.is-active{
                    color: #42ac89;
                    border-bottom-width: 3px;
                    border-bottom-color: #42ac89;
                    background-color: rgba($color: #fff, $alpha: .2);
                }
            }            
        }
    }
</style>
