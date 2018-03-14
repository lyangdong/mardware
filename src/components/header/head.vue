<!--Author wangsheng 登录页面头部-->
<template>
    <div class="header_container">
        <div class="header_main global_container clear">
            <div class="log_img">
                <a href="javascript:void 0;">
                    <img src="@/assets/images/login_logo.png" alt="log">
                </a>
            </div>
            <div class="title">
                <img src="../../assets/images/title.png" alt="标题">
            </div>
            <div class="online">
                <i class="iconfont icon-online"></i>
                <el-dropdown 
                    size="medium"
                    :show-timeout="100"
                    @command="onlineMethod">
                    <span class="el-dropdown-link">
                        在线咨询
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item 
                            v-for="item in onlineMethods" 
                            :key="item.value"
                            :command="item">
                            {{item.value}}
                        </el-dropdown-item>                       
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name : 'headTop',
        data(){
            return {
                onlineMethods : [{
                    type:'0',
                    value:'QQ咨询'
                },{
                    type:'1',
                    value:'微信咨询'
                }]
            }
        },
        methods : {
            onlineMethod(item){
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header_container{
        width: 100%;
        height: 60px;
        background-color: #fff;
        box-shadow: 1px 0px 15px 1px rgba(0,0,0,.2);
        .header_main{
            margin: 0 auto;
            position: relative;            
            .log_img{
                width: 200px;
                height: 60px;
                float: left;
                text-align: center;
                a{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
            .title{
                width: 116px;
                height: 60px;
                float: left;
                display: flex;
                align-items: center;
                justify-content: center;              
                margin-left: 40px;
               img{
                   width: 100%;
                   height: 26px;
               }
            }
            .online{
                width: 130px;
                height: 60px;
                display: flex;
                align-items: center;
                float: right;
                outline: none;
                .iconfont{
                    color: #606266;
                    font-size: 18px;
                    font-weight: 600;
                    margin-right: 10px;
                }
                .el-dropdown-link{
                    color: #606266;
                    font-size: 15px;
                    cursor: pointer;
                }
            }
        }
    }
</style>