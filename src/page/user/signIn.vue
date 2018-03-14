<!--Author: wang sheng 登录框-->
<template>
    <div class="login_container">
        <div class="login_title">用户登录</div>
        <div class="form_container">
            <el-form
                clearable="true"                
                ref="UserInfo"
                :model="UserInfo"
                class="user_info">
                <el-form-item>
                    <el-input
                        type="text"
                        @keyup="switchUserName" 
                        v-model.trim="UserInfo.UserName"
                        placeholder="用户名/手机号/邮箱地址"/>
                    <div class="el-form-item__error">{{UserNameError}}</div>
                </el-form-item>
                <el-form-item>
                    <el-input
                        type="password" 
                        v-model.trim="UserInfo.PassWord"
                        placeholder="密码"/>
                    <div class="el-form-item__error">{{PassWordError}}</div>
                </el-form-item>
                <el-form-item v-if="showCodeImg">
                    <el-col :span="10">
                        <el-form-item class="no_margin">
                            <el-input 
                                type="text" 
                                v-model.trim="UserInfo.code" 
                                placeholder="验证码"
                                style="width:100%;"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" class="codeImg">                    
                        <img :src="codeUrl" alt="验证码" srcset="">                        
                    </el-col>
                    <el-col :span="4">                            
                        <a href="javascript:void 0;" @click="refreshCode">换一张</a>                        
                    </el-col>
                    <div class="el-form-item__error">{{CodeError}}</div>
                </el-form-item>
                <el-form-item size="mini">
                    <el-col :span="14">
                        <el-checkbox label="记住密码" v-model="rememberPassWord"></el-checkbox>
                    </el-col>
                    <el-col :span="10" class="text_center">
                        <a href="javascript:void 0;" @click="forgetPassWord">忘记密码？</a>
                    </el-col>
                </el-form-item>
                <el-form-item class="no_margin">
                    <el-button
                        size="medium" 
                        type="primary"                       
                        @click.prevent="signInFn"
                        style="width:100%;">点击登录</el-button>
                </el-form-item>
                <el-form-item class="no_margin">
                    <el-col :span="12" class="text_right" style="padding-right:7px;">
                        <a href="javascript:void 0;">没有账号</a>
                    </el-col>
                    <el-col :span="12">
                        <router-link to="/login/signup">
                            <a href="javascript:void 0;" style="padding-left:7px;color:#164888;">立即注册</a>
                        </router-link>                        
                    </el-col>
                </el-form-item>    
            </el-form>
        </div>       
    </div>
</template>

<script>
    import {baseUrl} from '@/config/base'
    import {userSignIn} from '@/service/getData'
   

    export default {
        name : 'UserSignIn',
        data(){
            return {
                UserInfo : { 
                    code : null,                  
                    UserName : null,
                    PassWord : null                    
                },                
                codeUrl : null,//验证码地址
                showCodeImg : false,//是否显示验证码
                valiForm:false,//表单是否合法
                CodeError : null,
                UserNameError : null,
                PassWordError : null,//错误信息
                rememberPassWord : false,//记住密码            
            }
        },
        mounted(){
            this.refreshCode();
        },
        methods : {
            signInFn(){//登录
                let _self = this;
                if(this.UserInfo.UserName == '' || !this.UserInfo.UserName){                    
                    if(this.UserInfo.PassWord == '' || !this.UserInfo.PassWord){
                        this.UserNameError = '请输入您的账户信息';
                    }else{
                        this.UserNameError = '用户名不能为空';
                    }
                }else{
                    this.UserNameError = null;
                    if(this.UserInfo.PassWord == '' || !this.UserInfo.PassWord){
                        this.PassWordError = '密码不能为空';
                    }else{
                        this.PassWordError = null;
                        if(this.showCodeImg && (this.UserInfo.code == '' || !this.UserInfo.code)){
                            this.CodeError = '验证码不能为空';
                        }else{
                            this.CodeError = null;
                            userSignIn(this.UserInfo).then(res => {
                                console.log(res)
                                if(res.data.code == 0){
                                    _self.$router.push({path:'/home'});
                                }else if(res.data.code == 1001){//密码错误
                                    this.PassWordError = '密码错误';
                                    this.UserInfo.PassWord = '';
                                }else if(res.data.code == 1002){//验证码错误
                                    this.UserInfo.code = null;
                                    this.CodeError = '验证码错误';
                                    this.refreshCode();                                    
                                }else if(res.data.code == 1003){//密码错误次数过多
                                    this.showCodeImg = true;
                                }else if(res.data.code == 1006){
                                    this.UserInfo.code = null;
                                    this.UserInfo.UserName = null;
                                    this.UserInfo.PassWord = null;
                                    _self.$notify.error({
                                        title:'提示',
                                        message : '您输入的账户不存在'
                                    });
                                }
                            }).catch((res) => {
                                console.log(res)
                                _self.$message({
                                    type : 'error',
                                    center : true,
                                    message : '网络错误，请稍后再试！'
                                })
                            })
                        }
                    }
                }
            },
            switchUserName(){
                alert(123)
            },
            refreshCode(){//获取验证码
                this.codeUrl = baseUrl+'/captcha?'+new Date().getTime();
            },
            forgetPassWord(){
                this.$router.push('/forgetPwd');
            }
        }
    }
</script>

<style lang='scss' scoped>
    .login_container{
        width: 400px;
        z-index: 10;
        padding: 20px 38px;
        position: absolute;
        right: 0px;
        bottom: 2px;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.3);        
        .login_title{
            color: #717171;
            font-size: 24px;
            margin-bottom: 20px;
            letter-spacing: 3px;
        }
        .form_container{
            width: 100%;
            height: auto;
            a{
                color: #717171;
                font-size: 14px;
            }
            .codeImg{
                height: 40px;
                text-align: center;
                img{
                    height: 40px;
                }
            }            
            .el-button--primary{
                color: #fff;                    
                font-size: 18px;
                letter-spacing: 3px;
                border-radius: 0px;
                border-color: #164888;
                background-color: #164888;
            }
            .no_margin{
                margin: 0px;
            }
        }
    }
</style>
