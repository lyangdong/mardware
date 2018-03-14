<!--Author: wang sheng 注册页面-->
<template>
    <div class="signup_container">
        <div class="signup_title">用户注册</div>
            <div class="form_container">
                <el-form clearable
                    ref="SignUpUserInfo"
                    status-icon
                    :model="SignUpUserInfo"
                    :rules="SignUpUserRules"
                    class="">
                    <el-form-item prop="UserName">
                        <el-input
                            type="text"
                            v-model.trim="SignUpUserInfo.UserName"
                            placeholder="手机号/邮箱"/>
                    </el-form-item>
                    <el-form-item prop="PassWord_0">
                        <el-input
                            type="password" 
                            v-model.trim="SignUpUserInfo.PassWord_0"
                            placeholder="密码"/>
                    </el-form-item>
                    <el-form-item prop="PassWord_1">
                        <el-input
                            type="password" 
                            v-model.trim="SignUpUserInfo.PassWord_1"
                            placeholder="确认密码"/>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span=10>
                            <el-form-item class="no_margin" prop="code">
                                <el-input v-model="SignUpUserInfo.code" 
                                    placeholder="验证码"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" class="codeImg">
                            <img :src="CodeImgUrl" alt="验证码">
                        </el-col>
                        <el-col :span="4">
                            <a href="javascript:void 0;" @click="refreshCode">换一张</a>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="no_margin">
                        <el-button 
                            type="primary"
                            size="medium"
                            @click.prevent="signUpUser"
                            style="width:100%;">立即注册</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="12" class="text_right" style="padding-right:7px;">
                            <a href="javascript:vode 0;">已有账号</a>
                        </el-col>
                        <el-col :span="12">
                            <router-link link to="/login/signin">
                                <a href="javascript:vode 0;" style="padding-left:7px;color:#164888;">直接登录</a>
                            </router-link>                            
                        </el-col>
                    </el-form-item>
                </el-form>
            </div>            
    </div>
</template>

<script>
    import {baseUrl} from '@/config/base'
    import {switchAccount,signUpAccount} from '@/service/getData'
    export default {
        data(){
            let _self = this;
            let valiUserNameFormat = function(rule,value,callback){               
                if(value === '' || !value){
                    _self.UserNameFormat = false;
                    callback(new Error('用户名不能为空'));
                }else if(value.match(/[a-zA-Z0-9_-]+\@[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+|^[1][3,4,5,6,7,8,9]\d{9}/)){
                    switchAccount(_self.SignUpUserInfo.UserName)
                    .then(res => {
                        if(res.data.code == 0){
                            callback();
                        }else if(res.data.code == 1007){
                            callback('用户名已存在');
                        }else{
                            callback();
                        }
                    })
                    .catch(() => {
                        callback();
                    })
                }else{
                    _self.UserNameFormat = false;                    
                    callback(new Error('用户名仅支持手机号、邮箱'));                                        
                }                
            };
            let valiUserNameExistence = function(rel,value,callback){
                console.log(value)    
                if(_self.UserNameFormat){
                    
                }else{
                    if(value === '' || !value){
                        _self.$refs.SignUpUserInfo.resetFields();
                    }else if(!value.match(/[a-zA-Z0-9_-]+\@[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+|^[1][3,4,5,6,7,8,9]\d{9}/)){
                        callback(new Error('用户名仅支持手机号、邮箱'));
                    }                    
                }
            };
            let valiPassWord_0 = function(rule,value,callback){
                if((value === '' || !value) && _self.SignUpUserInfo.UserName){
                    callback(new Error('密码不能为空'));
                }else if(value && !_self.SignUpUserInfo.UserName){
                    _self.$refs.SignUpUserInfo.validateField('UserName');
                    if(_self.SignUpUserInfo.PassWord_1){
                        _self.$refs.SignUpUserInfo.validateField('PassWord_1');
                    }
                }else if(value && _self.SignUpUserInfo.UserName){                   
                    if(value.length < 6){
                        callback(new Error('密码至少输入六位字符'));
                    }else{
                        callback();
                        if(_self.SignUpUserInfo.PassWord_1){
                            _self.$refs.SignUpUserInfo.validateField('PassWord_1');
                        }                        
                    }                    
                }else{
                   _self.$refs.SignUpUserInfo.clearValidate();
                }
            };
            let valiPassWord_1 = function(rule,value,callback){
                if((value == '' || !value) && _self.SignUpUserInfo.PassWord_0){
                    callback(new Error('请再次输入密码'));
                }else if(!value && !_self.SignUpUserInfo.UserName && !_self.SignUpUserInfo.PassWord_0){
                    _self.$refs.SignUpUserInfo.clearValidate();
                }else if(value){                   
                    if(!_self.SignUpUserInfo.UserName || !_self.SignUpUserInfo.PassWord_0){
                        if(!_self.SignUpUserInfo.PassWord_0){
                            _self.$refs.SignUpUserInfo.validateField('PassWord_0');
                        }else{
                            if(_self.SignUpUserInfo.PassWord_0 !== _self.SignUpUserInfo.PassWord_1){
                                callback(new Error('两次密码不一致'));                    
                            }
                        }
                    }else{                     
                        if(_self.SignUpUserInfo.PassWord_0 !== _self.SignUpUserInfo.PassWord_1){
                            callback(new Error('两次密码不一致'));                    
                        }else{
                            callback();
                        }                       
                    }
                }else{
                    callback();
                }                
            };
            let valiCode = function(rule,value,callback){
                if((value === '' || !value) && (_self.SignUpUserInfo.UserName || _self.SignUpUserInfo.PassWord_0 || _self.SignUpUserInfo.PassWord_1)){
                    callback(new Error('验证码不能为空'))
                }else if(!value && !_self.SignUpUserInfo.UserName && !_self.SignUpUserInfo.PassWord_0 && !_self.SignUpUserInfo.PassWord_1){
                    _self.$refs.SignUpUserInfo.clearValidate();
                }else{
                    callback();
                }
            };
            return{                
                SignUpUserInfo : {
                    code : null,
                    UserName: null,
                    PassWord_0: null,
                    PassWord1_: null
                },
                CodeImgUrl : null,
                UserNameFormat : false,//判断账户格式是否合法               
                SignUpUserRules: {
                    code : {validator: valiCode,torgger:'blur'},
                    UserName : [
                        {validator: valiUserNameFormat,trigger:'blur'}
                    ],
                    PassWord_0 : {validator: valiPassWord_0,trigger:'blur,change'},
                    PassWord_1 : {validator: valiPassWord_1,torgger:'blur' },                                        
                }
            }
        },
        mounted(){
            this.refreshCode();
        },
        methods: {
            signUpUser(){//注册用户                
                if(!this.SignUpUserInfo.UserName && (!this.SignUpUserInfo.PassWord_0 || !this.SignUpUserInfo.PassWord_1)){
                    this.$notify({
                        type : 'warning',
                        offset : 100,
                        showClose : false,
                        title : '用户注册提示：',
                        message : '请填写您的用户名、密码等信息。'
                    });
                }else{                    
                    this.$refs.SignUpUserInfo.validate((valid) => {
                        if(valid){
                            signUpAccount(this.SignUpUserInfo)
                            .then(res => {
                                if(res.data.code == 0){
                                    this.$message({
                                        type : 'success',
                                        center : true,
                                        message : '恭喜你注册成功'                                        
                                    })
                                    this.$router.push({path:'/login/signin'});
                                }else{

                                }
                            })
                            .catch(() => {

                            })
                        }
                    })
                }                
            },
            refreshCode(){                
                this.CodeImgUrl = baseUrl+'/captcha?'+new Date().getTime();
                console.log(this.CodeImgUrl)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .signup_container{
        width: 400px;
        z-index: 10;
        padding: 20px 38px;
        position: absolute;
        right: 0px;
        bottom: 2px;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.3);
        .signup_title{
            color: #164888;
            font-size: 24px;
            margin-bottom: 20px;
            letter-spacing: 3px;
        }
        .form_container{
            width: 100%;
            height: auto;
            .codeImg{
                height: 40px;
                text-align: center;
                img{
                    height: 40px;
                }
            }
            a{
                color: #717171;
                font-size: 14px;
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
