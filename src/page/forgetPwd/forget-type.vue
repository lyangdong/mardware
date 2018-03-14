/*选择找回方式*/
<template>
  <div class="forget-nav">
      <ul class="nav">
        <li class="active">1、选择找回方式 <span class="triangle-right"></span></li>
        <li class="marginLeft-4 ">2、身份验证<span class="triangle-left"></span><span class="triangle-right"></span></li>
        <li class="marginLeft-4 ">3、重置密码<span class="triangle-left"></span><span class="triangle-right"></span></li>
        <li class="marginLeft-4 ">4、完成<span class="triangle-left"></span></li>
      </ul>
      <div class="content">
        <div class="content-header">{{msg}}</div>
        <div class="content-box">
          <el-row :gutter="20" class="type-phone type">
            <el-col :span="4"><img src="../../assets/images/forget-1.png" alt=""></el-col>
            <el-col :span="15" class="type-content">
              <span style="font-size: 24px;color: #404040">通过绑定的手机找回</span><br/>
              <span style="font-size: 16px;color: #717171">验证您的手机并输入验证码之后，可重置您的密码</span>
            </el-col>
            <el-col :span="5">
              <router-link :to="{ name: 'phone-validate'}" class="btn">立即找回</router-link>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="type-email type">
            <el-col :span="4"><img src="../../assets/images/forget-2.png" alt=""></el-col>
            <el-col :span="15" class="type-content">
              <span style="font-size: 24px;color: #404040">通过绑定的邮箱找回</span><br/>
              <span style="font-size: 16px;color: #717171">我们回向您的绑定邮箱发送一个验证码，请注意查收</span>
            </el-col>
            <el-col :span="5">
              <router-link :to="{ name: 'email-validate'}" class="btn">立即找回</router-link>
            </el-col>
          </el-row>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name : 'forget-type',
    data(){
      return{
        msg:'请选择找回方式'
      }
    },
    methods : {

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
          .type{
            padding-bottom: 68px;
            padding-top: 45px;
            img{
              display: inline-block;
              width: 71px;
              height: 71px;
            }
            .type-content{
              height: 40px;
              line-height: 38px;
            }
            .btn{
              display: inline-block;
              line-height: 33px;
              text-align: center;
              width: 127px;
              height: 33px;
              font-size: 16px;
              margin-top: 23px;
              background: url("../../assets/images/personal-1.png")no-repeat;
              background-size: 100%;
              color: white;
              cursor: pointer;
            }
          }
          .type-phone{
            border-bottom: 1px solid #cfcfcf;
          }
          .type-email{
            margin-top: 32px;
          }
        }
      }
    }
</style>
