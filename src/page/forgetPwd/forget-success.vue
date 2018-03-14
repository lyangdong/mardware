/*选择找回方式*/
<template>
  <div class="forget-nav">
    <ul class="nav">
      <li class="">1、选择找回方式 <span class="triangle-right"></span></li>
      <li class="marginLeft-4">2、身份验证<span class="triangle-left"></span><span class="triangle-right"></span></li>
      <li class="marginLeft-4">3、重置密码<span class="triangle-left"></span><span class="triangle-right"></span></li>
      <li class="marginLeft-4 active">4、完成<span class="triangle-left"></span></li>
    </ul>
    <div class="content">
      <div class="content-header">{{msg}}</div>
      <div class="content-box">
        <img :span="4" src="../../assets/images/forget-7.png" alt="">
        <span :span="10" class="success-art">您的新密码修改成功</span>
        <el-button class="finish-btn" @click="back">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";

  export default {
    components: {ElButton},
    name : 'forget-success',
    data() {
      return {
        msg:'修改密码成功'
      };
    },
    methods: {
      back(){
        this.$router.push({ path:'/'});
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
        position: relative;
        img{
          display: inline-block;
          width: 35px;
          height: 35px;
          position: absolute;
          top: 158px;
          left: 31%;
        }
        .success-art{
          display: inline-block;
          font-size:30px;
          position: absolute;
          padding: 0;
          overflow: hidden;
          top: 155px;
          left: 39%;
        }
        .finish-btn{
          position: absolute;
          bottom: 115px;
          left: 35%;
          width: 30%;
          font-size: 22px;
          background-color: #164888!important;
          color: white;
        }
      }
    }
  }

</style>
