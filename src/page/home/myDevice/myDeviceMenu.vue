<!--Author wangsheng 我的设备————菜单-->
<template>
    <div class="device_menu">        
        <div class="my_device_menu_list">
            <div class="my_device_menu_tree">
                <div class="my_device_menu_title">
                    <i class="iconfont icon-device"></i>
                    <span>我的设备</span>
                </div>
                <el-menu
                    @open="openMenu"
                    @close="closeMenu"
                    @select="selectMenu"
                    :default-active="defaultActive"
                    class="my_device_menu"
                    background-color="#eee"
                    active-text-color="#303133">
                    <el-submenu index="1">                        
                        <template slot="title">
                            <a href="javascript:void 0;" :class="{active:!firstMenuOpen && !isFixedMenu}">
                                <i :class="{'el-icon-caret-bottom':firstMenuOpen,'el-icon-caret-right':!firstMenuOpen}"/>
                                <span slot="title">物联网主控</span>
                            </a>
                        </template>                        
                        <el-submenu index="1-1">
                            <template slot="title">
                                <a href="javascript:void 0;" :class="{active:!secondMenuOpen && !isFixedMenu}">                              
                                    <i :class="{'el-icon-caret-bottom':secondMenuOpen,'el-icon-caret-right':!secondMenuOpen}"></i>
                                    <span slot="title">智能蓝牙路由器</span>
                                </a>
                            </template>                            
                            <el-menu-item index="1-1-1">
                                <a href="javascript:void 0;">智能定位系统</a>                                
                            </el-menu-item>
                            <el-menu-item index="1-1-2">
                                <a href="javascript:void 0;" 
                                    @click="jumpRouter('/home/mydevice/bracelet',false)">智能手环</a>
                            </el-menu-item>
                        </el-submenu>
                    </el-submenu>                    
                </el-menu>
            </div>
            <div class="my_device_menu_fixed">
                <div class="my_device_menu_title">
                    <i class="iconfont icon-product"></i>
                    <span>新增设备</span>
                </div>                
                <div class="my_device_menu_fixed_list">                        
                    <div                            
                        class="menu_fixed_item" 
                        v-for="item in menuFixed" 
                        :key="item.menuRouter"
                        @click="jumpRouter(item.menuRouter,true)"
                        :class="{active:item.menuRouter === activeRouter}">                            
                        {{item.menuText}}                                                       
                    </div>                   
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name : 'DeviceMenu',
        data(){
            return {
                isOpen: true,
                isFixedMenu:false,
                firstMenuOpen: true,
                secondMenuOpen: true,
                defaultActive: '1-1-2',
                activeRouter: '/home/mydevice/bracelet',//选中路由                
                menuFixed:[//固定菜单项
                    {
                        menuText : '授权设备',
                        menuRouter : '/home/mydevice/right'
                    },{
                        menuText : '设备激活',
                        menuRouter : '/home/mydevice/activation'
                    }
                ],
                defaultProps : {
                    label : 'label',
                    children : 'children'
                }
            }
        },        
        methods : {
            switchMenu(evt){//切换菜单
                
            },
            openMenu(index,path){
                if(index == '1'){
                    this.firstMenuOpen = true;
                }else if(index == '1-1'){
                    this.secondMenuOpen = true;
                }
            },
            closeMenu(index,path){
                if(index == '1'){
                    this.firstMenuOpen = false;
                }else if(index == '1-1'){
                    this.secondMenuOpen = false;
                }
            },
            selectMenu(index,path){
                this.defaultActive = index;
            },
            jumpRouter(val,isFixed){
                this.$router.push(val);
                this.activeRouter = val;
                this.isFixedMenu = isFixed;
                if(isFixed){
                    this.defaultActive = null;
                }
            }
        }
    }
</script>

<style lang="scss">   
    .device_menu{
        width: 180px;
        display: flex;
        flex-direction: column;
        background-color: #eee;
        border-right: 2px solid #e2e2e2;
        .my_device_menu_title{
            color: #42ac89;
            height: 70px;
            font-size: 20px;
            display: flex;            
            align-items: center;
            justify-content: center;
            .iconfont{
                font-size: 25px;
                margin-right: 15px;
            }            
        }
        .my_device_menu_list{
            flex: 1;
            display: flex;
            flex-direction: column;
            .my_device_menu_tree{
                flex: 1;
                font-size: 16px;
                .my_device_menu{
                    overflow: hidden;
                    .el-submenu{                        
                        &.is-active{
                            background-color: rgb(190,190,190);
                        }                        
                    }
                    .el-submenu__title{
                        &:hover{
                            &:after{
                                width: 3px;
                                content: '';
                                position: absolute;
                                right: 0px;
                                top: 0px;
                                bottom: 0px;
                                background-color: #42ac89;
                            }
                        }
                        a{
                            color: #303133;
                            display: block;
                            margin: 0px -40px;
                            padding: 0px 20px;
                            position: relative;
                            &.active{
                                background-color: rgb(190,190,190);
                                &:after{
                                    width: 3px;
                                    content: '';
                                    position: absolute;
                                    right: 0px;
                                    top: 0px;
                                    bottom: 0px;
                                    background-color: #42ac89;
                                }
                            }
                        }
                    }                    
                    .el-menu-item{                        
                        height: 43px;
                        line-height: 43px;
                        text-indent: 1em;
                        min-width: 177px;
                        padding-right: 0px;                                               
                        a{
                            color: #303133;
                            display: block;
                            margin-left: -60px;
                            padding-left: 60px;
                            &:hover{
                                background-color: rgb(190,190,190);
                                &:after{
                                    width: 3px;
                                    content: '';
                                    position: absolute;
                                    right: 0px;
                                    top: 0px;
                                    bottom: 0px;
                                    background-color: #42ac89;
                                }
                            }
                        }
                        &.is-active{
                            a{
                                position: relative;
                                background-color: rgb(190,190,190);
                                &:after{
                                    width: 3px;
                                    content: '';
                                    position: absolute;
                                    right: 0px;
                                    top: 0px;
                                    bottom: 0px;
                                    background-color: #42ac89;
                                }
                            }
                        }
                    }
                    .el-submenu__icon-arrow{
                        display: none;
                    }
                    .el-submenu [class^=el-icon-]{
                        margin-right: 0px;
                        width: 20px;
                        color: #303133;
                    }
                    .el-submenu__title{
                        height: 43px;
                        line-height: 43px;
                    }
                }
            }
            .my_device_menu_fixed{
                flex: 1;
                border-top: 2px solid #e2e2e2;
                .menu_fixed_item{
                    cursor: pointer;
                    font-size: 16px;
                    position: relative;
                    padding: 11px 0px 11px 30px;;
                    &.active{                        
                        background-color: rgb(190,190,190);
                        &:after{
                            width: 3px;
                            content: '';
                            position: absolute;
                            right: 0px;
                            top: 0px;
                            bottom: 0px;
                            background-color: #42ac89;
                        }
                    }
                    &:hover{
                        background-color: rgb(190,190,190);
                        &:after{
                            width: 3px;
                            content: '';
                            position: absolute;
                            right: 0px;
                            top: 0px;
                            bottom: 0px;
                            background-color: #42ac89;
                        }
                    }
                }
            } 
        }        
    }
</style>
