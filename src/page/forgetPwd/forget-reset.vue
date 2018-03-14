/*选择找回方式*/
<template>
  <div class="forget-nav">
    <ul class="nav">
      <li class="">1、选择找回方式 <span class="triangle-right"></span></li>
      <li class="marginLeft-4">2、身份验证<span class="triangle-left"></span><span class="triangle-right"></span></li>
      <li class="marginLeft-4 active">3、重置密码<span class="triangle-left"></span><span class="triangle-right"></span></li>
      <li class="marginLeft-4 ">4、完成<span class="triangle-left"></span></li>
    </ul>
    <div class="content">
      <div class="content-header">{{msg}}</div>
      <div class="content-box">
        <div class="reset">
          <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" class="reset-ruleForm" >
            <el-form-item prop="pass">
              <el-input placeholder="请输入您的新密码" type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input placeholder="请再输入一次" type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
            </el-form-item>
            <el-form-item>
              <el-button class="btn-next" type="primary" @click="submitForm('ruleForm')">下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {resetPwd} from '@/service/getInfo'

  export default {
    name : 'forget-reset',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        msg:'密码重置',
        resetInfo:{},
        ruleForm: {
          pass: '',
          checkPass: '',
        },
        ruleFormCode:{
          phone: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' },
            { min: 6,message: '验证码长度要大于 6 位', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.resetInfo.code= this.$route.params.code;
            this.resetInfo.accountNo = this.$route.params.accountNo;
            this.resetInfo.password = this.ruleForm.pass;
            this.resetInfo.type = this.$route.params.type;
            resetPwd(this.resetInfo)
              .then(res => {
                if(res.data.code == 0){
                  this.$router.push({ name: 'forget-success'});
                }else{
                  this.$message({
                    type : 'error',
                    center : true,
                    message : res.data.msg
                  });
                  if( this.resetInfo.type=='email'){
                    this.$router.push({ name: 'email-validate'});
                  }else {
                    this.$router.push({ name: 'phone-validate'});
                  }
                }
              })
              .catch(() => {

              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitFormCode(){
        console.log(this.ruleForm.phone)
      }
    }
  }
</script>

<style lang='scss' scoped>
  .forget-nav{
    .nav{
      display: block;
      padding: 25px 20px;
      width: 1200px;
      height: 96px;
      text-align: center;
      margin: 0 auto;
      li{
        display: block;
        float: left;
        width: 22%;
        font-size: 20px;
        background-color: #F5F5F5;
        line-height: 46px;
        height: 46px;
        color: #717171;
        position: relative;
      }
      .marginLeft-4{
        margin-left: 4%;
      }
      .active{
        color: white!important;
        background-color: #164789!important;
      }
      .active .triangle-right{
        border-left: 18px solid #164789;
      }
      .triangle-left{
        display: block;
        position: absolute;
        width: 0;
        height: 0;
        border-top: 23px solid transparent;
        border-bottom: 23px solid transparent;
        border-left: 18px solid white;
        z-index: 100;
        top: 0;
      }
      .triangle-right{
        display: block;
        position: absolute;
        width: 0;
        height: 0;
        border-top: 23px solid transparent;
        border-bottom: 23px solid transparent;
        border-left: 18px solid #f5f5f5;
        z-index: 2000;
        top: 0;
        right: -18px;
      }
    }
    .content{
      width: 900px;
      margin: 0 auto;
      .content-header{
        border: 1px solid #a4a4a4;
        text-align: center;
        height: 64px;
        line-height: 62px;
        font-size: 24px;
        color: #404040;
        box-shadow:0 2px 2px #dadada,4px 4px 3px #e8e8e8,5px 5px 5px #f8f8f8,-1px -1px 1px #f4f4f4,-2px -2px 1px #f8f8f8,-3px -3px 1px #fbfbfb;
      }
      .content-box{
        width: 100%;
        height: 460px;
        border: 1px #a4a4a4 solid;
        margin-top: 20px;
        padding: 20px 10%;
        box-shadow:0 2px 2px #dadada,4px 4px 3px #e8e8e8,5px 5px 5px #f8f8f8,-1px -1px 1px #f4f4f4,-2px -2px 1px #f8f8f8,-3px -3px 1px #fbfbfb;
        .reset{
          margin-top: 65px;
          .reset-ruleForm{
            width: 55%;
            margin: 0 auto;
          }
          .btn-next{
            width: 100%;
            font-size: 22px;
            background-color: #164888!important;
          }

        }
      }
    }
  }

</style>
