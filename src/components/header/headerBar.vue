<!--Author wangsheng 主页头部-->
<template>
    <header>
        <div class="global_container clear">
            <div class="home_logo">            
                <router-link to="/home/index">
                    <img src="../../assets/images/home_logo.png" alt="logo">
                </router-link>
            </div>
            <div class="sign_out" @click="signOut">
                <i class="iconfont icon-signout" title="安全退出"></i>
            </div>
            <div class="account_info">
                <i class="iconfont icon-account"></i>
                <el-dropdown size="medium">
                    <span class="el-dropdown-link">
                        用户姓名
                        <i class="el-icon-caret-bottom icon"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            个人中心
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="online">
                <i class="iconfont icon-online"></i>
                <el-dropdown 
                    size="medium"
                    :show-timeout="100">
                    <span class="el-dropdown-link">
                        在线咨询
                        <i class="el-icon-caret-bottom icon"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            QQ咨询
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>            
        </div>
    </header>
</template>

<script>
    export default {
        name : 'HeaderBar',
        data(){
            return {
                time: 10
            }
        },
        methods : {
            signOut(){
                this.$confirm('继续此操作将退出系统登录','提示',{
                    'type':'warning',
                    'center': 'true',
                    'showClose': false,
                    'closeOnClickModal': false,
                    'confirmButtonText':'退出登录',
                    'cancelButtonText' : '继续浏览'
                }).then(() => {
                    this.$router.push('/login/signin');
                });              
            }
        }
    }
</script>

<style lang="scss" scoped>
    header{
        height: 40px;        
        position: relative;
        background-color: #22252a;
        &::after{
            width: 100%;
            height: 1px;
            content: '';
            background-color: rgba(255,255,255,.5);
            position: absolute;
            bottom: 0px;
        }
        .home_logo{
            width: 170px;
            float: left;
        }
        .sign_out{
            color: #fff;
            float: right;
            height: 40px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            .iconfont{
                font-size: 20px;
            }
        }
        .account_info{
            float: right;
            height: 40px;
            color: #fff;                       
            display: flex;
            align-items: center;
            padding: 0px 25px;
            cursor: pointer;
            justify-content: center;
            .iconfont{               
                font-size: 19px;
            }
            .el-dropdown{
                color: #fff;
                padding-left: 5px;
                .el-dropdown-link{
                    font-size: 14px;
                    .icon{
                        font-size: 16px;
                        padding-left: 3px;
                    }
                }
            }
        }
        .online{
            height: 40px;
            color: #fff;
            font-size: 19px;
            float: right;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
            padding-right: 15px;
            &:after{
                width: 2px;
                content: "";
                position: absolute;               
                top: 13px;
                right: 0px;
                bottom: 13px;
                background-color: #fff;
            }
            .iconfont{
                font-size: 20px;
            }
            .el-dropdown{
                color: #fff;
                padding-left: 5px;
                .el-dropdown-link{
                    font-size: 14px;
                    .icon{
                        font-size: 16px;
                        padding-left: 3px;
                    }
                }
            }            
        }
    }
</style>
