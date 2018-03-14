/*选择找回方式*/
<template>
  <div class="forget-nav">
    <ul class="nav">
      <li class="">1、选择找回方式 <span class="triangle-right"></span></li>
      <li class="marginLeft-4 active">2、身份验证<span class="triangle-left"></span><span class="triangle-right"></span></li>
      <li class="marginLeft-4 ">3、重置密码<span class="triangle-left"></span><span class="triangle-right"></span></li>
      <li class="marginLeft-4 ">4、完成<span class="triangle-left"></span></li>
    </ul>
    <div class="content">
      <div class="content-header">{{msg}}</div>
      <div class="content-box">
        <div class="phone-validate">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="phone-ruleForm" >
            <el-form-item prop="phone">
              <el-input v-model="ruleForm.phone" placeholder="请输入您的手机号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button :disabled="isDisabled" class="btn-code" @click="submitFormCode()">{{buttonName}}</el-button>
            </el-form-item>
            <el-form-item prop="code">
              <el-input v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
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
  import {getForgetCode} from '@/service/getInfo'
  export default {
    name : 'phone-validate',
    data() {
      return {
        msg:'身份验证',
        buttonName: "获取验证码",
        isDisabled:false,
        time:60,
        ruleForm: {
          phone: '',
          code: '',
        },
        ruleFormCode:{
          phone: '',
        },
        rules: {
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max:11, message: '手机号长度在 11 位', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入数字验证码', trigger: 'blur' },
            { min: 5, max:5, message: '验证码长度为 5 位', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push({ name: 'forget-reset', params: { accountNo: this.ruleForm.phone ,code:this.ruleForm.code,type:'phone'}});
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitFormCode() {
        let me = this;
        me.isDisabled = true;
        let interval = window.setInterval(function () {
          me.buttonName = '（' + me.time + '秒）后重新发送';
          --me.time;
          if (me.time < 0) {
            me.buttonName = "重新发送";
            me.time = 60;
            me.isDisabled = false;
            window.clearInterval(interval);
          }
        }, 1000);
        getForgetCode(this.ruleForm.phone)
          .then(res=>{
            if(res.data.code == 0){
              this.$message({
                type : 'success',
                center : true,
                message : '短信已经发送，请注意查收...'
              });
            }else{
              this.$message({
                type : 'error',
                center : true,
                message : res.data.msg
              });
            }
          })
          .catch(() => {

          })
      },
    }
  }
</script>

<style lang='scss' scoped>
  .forget-nav{
    .nav{
      display: block;
      padding: 25px 25px;
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
        .phone-validate{
          margin-top: 65px;
          .phone-ruleForm{
            width: 55%;
            margin: 0 auto;
          }
          .accountNo{
            height: 50px;
          }
          .btn-code{
            background: url("../../assets/images/forget-3.png")no-repeat;
            background-size: 100%;
            font-size: 14px;
            padding-top: 8px;
            padding-bottom: 8px;
            border-radius: 0!important;
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
