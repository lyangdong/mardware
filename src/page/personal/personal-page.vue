<template>
  <el-container>
    <el-header>
      <headTop/>
    </el-header>
    <el-main class="global_container">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="el-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="last-time">最后更新于 {{lastTime}}</div>
      <div class="personal-box">
        <ul class="personal-info">
          <li class="box-info">
            <span class="info-img el-col-1"><i class="phone"></i></span>
            <span class="info-type el-col-4" style="font-size: 20px">手机号</span>
            <span v-if="info.phone" class="info-msg el-col-13" style="font-size: 18px">{{info.phone}}</span>
            <span v-if="!info.phone" class="info-msg el-col-13" style="font-size: 18px">无</span>
            <span class="info-revise el-col-6" style="font-size: 18px;text-align: right"><i class="info-revise-img el-col-1"></i>修改</span>
          </li>
          <li class="box-info">
            <span class="info-img el-col-1"><i class="email"></i></span>
            <span class="info-type el-col-4" style="font-size: 20px">邮箱</span>
            <span v-if="info.email" class="info-msg el-col-13" style="font-size: 18px">{{info.email}}</span>
            <span v-if="!info.email" class="info-msg el-col-13" style="font-size: 18px">无</span>
            <span class="info-revise el-col-6" style="font-size: 18px;text-align: right"><i class="info-revise-img el-col-1"></i>修改</span>
          </li>
          <li class="box-info info-computer">
            <span class="info-img el-col-1"><i class="computer"></i></span>
            <span class="info-type el-col-14" style="font-size: 20px">
              公司信息
              <span style="font-size: 14px;margin-left: 10px">(*需要重新提交认证才能修改公司信息)</span>
            </span>
            <span class="info-type el-col-9">
              <el-button style="margin-right: 15px" class="attestation-btn right" @click="attestation">前往认证</el-button>
            </span>
          </li>
        </ul>
        <ol class="box-computer">
          <li class="box-info box-info-computer">
            <span class="el-col-8" style="font-size: 20px">公司名称</span>
            <span v-if="info.companyName" class="el-col-16" style="font-size: 18px;text-align: right">{{info.companyName}}</span>
            <span v-if="!info.companyName" class="el-col-16" style="font-size: 18px;text-align: right">无</span>
          </li>
          <li class="box-info box-info-computer">
            <span class="el-col-8" style="font-size: 20px">公司行业</span>
            <span v-if="info.companyType" class="el-col-16" style="font-size: 18px;text-align: right">{{info.companyType}}</span>
            <span v-if="!info.companyType" class="el-col-16" style="font-size: 18px;text-align: right">无</span>
          </li>
          <li class="box-info box-info-computer">
            <span class="el-col-8" style="font-size: 20px">联系人</span>
            <span v-if="info.linkman" class="el-col-16" style="font-size: 18px;text-align: right">{{info.linkman}}</span>
            <span v-if="!info.linkman" class="el-col-16" style="font-size: 18px;text-align: right">无</span>
          </li>
          <li class="box-info box-info-computer">
            <span class="el-col-8" style="font-size: 20px">联系电话</span>
            <span v-if="info.telephone" class="el-col-16" style="font-size: 18px;text-align: right">{{info.telephone}}</span>
            <span v-if="!info.telephone" class="el-col-16" style="font-size: 18px;text-align: right">无</span>
          </li>
          <li class="box-info box-info-computer">
            <span class="el-col-8" style="font-size: 20px">公司地址</span>
            <span v-if="info.companyAddress" class="el-col-16" style="font-size: 18px;text-align: right">{{info.companyAddress}}</span>
            <span v-if="!info.companyAddress" class="el-col-16" style="font-size: 18px;text-align: right">无</span>
          </li>
          <li class="box-info box-info-computer attestation-box noBorder">
            <span class="el-col-8" style="font-size: 20px">认证情况</span>
            <span class="el-col-16" style="font-size: 18px;text-align: right">
              {{info.isAttestation}}
              <span v-if="this.info.auth==1" class="valid">( 有效期：{{info.valid}} )</span>
            </span>
          </li>
        </ol>
      </div>
    </el-main>
    <el-footer style="margin-top: -34px">
      <Footer/>
    </el-footer>
  </el-container>
</template>

<script>
import headTop from "@/components/header/head";
import Footer from '@/components/footer/footer';
import {getPersonal} from '@/service/getInfo'

export default {
  name: "personal-page",
  data() {
    return {
      lastTime: "2018-02-10",
      info: {
        isAttestation:'无',
        companyName: "",
        companyAddress: "无",
        companyType: "无",
        email: "无",
        linkman: "无",
        phone: "",
        telephone: "",
        updateTime: "无",
        auth: "",
        valid: "2018.1.20-2020.1.20"
      }
    };
  },
  components: {
    headTop,
    Footer
  },
  methods: {
    attestation() {
      this.$router.push({ name: "computer-attestation",params:{lastTime:this.lastTime}})
    },
    getPersonalInfo(){
      getPersonal().then(res=>{
        if(res.data.code==0){
          this.info =res.data.data;
          this.lastTime = this.info.updateTime;
          this.info.valid='2018.1.20-2020.1.20'
          console.log(this.info.valid)
          if(this.info.auth==-1){
            this.info.isAttestation='未认证'
          }else if(this.info.auth==0){
            this.info.isAttestation='待审核'
          }else {
            this.info.isAttestation='已认证'
          }
        }
      }).catch(() => {

      })
    }
  },
  mounted: function () {
    this.getPersonalInfo()
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin";

.el-header{
  padding: 0!important;
}
  .el-breadcrumb {
    font-size: 18px;
    padding: 15px 0;
    margin: 0 auto;
  }
  .noBorder {
    border: none !important;
  }
  .global_container {
    color: #717171;
    margin: 0 auto;
    .last-time {
      padding: 15px 0;
      font-size: 18px;
    }
    .personal-box {
      margin-top: 15px;
      margin-bottom: 15px;
      padding: 15px 5% 15px 3%;
      height: 635px;
      border: 1px #a4a4a4 solid;
      box-shadow: 0 2px 2px #dadada, 4px 4px 3px #e8e8e8, 5px 5px 5px #f8f8f8,
        -1px -1px 1px #f4f4f4, -2px -2px 1px #f8f8f8, -3px -3px 1px #fbfbfb;
      .box-info {
        height: 68px;
        border-bottom: 1px #a4a4a4 solid;
        padding: 20px 0;
        .info-img {
          padding-left: 2%;
          i {
            display: block;
            width: 24px;
            height: 22px;
          }
          i.phone {
            background: url("../../assets/images/personal-3.png") no-repeat
              center;
          }
          i.email {
            background: url("../../assets/images/personal-4.png") no-repeat
              center;
          }
          i.computer {
            background: url("../../assets/images/personal-2.png") no-repeat
              center;
          }
        }
        .info-type {
          padding-left: 25px;
        }
        .info-revise {
          position: relative;
          padding-right: 25px;
          cursor: pointer;
          .info-revise-img {
            position: absolute;
            right: 60px;
            display: block;
            width: 24px;
            height: 24px;
            margin-right: 10px;
            background: url("../../assets/images/personal-5.png") no-repeat center;
          }
        }
        .attestation-btn {
          height: 36px;
          width: 137px;
          line-height: 13px;
          font-size: 16px;
          border-radius: 0;
          background: url("../../assets/images/personal-1.png") no-repeat;
          background-size: 100%;
          color: white;
          margin-top: -2px;
        }
      }
      .info-computer {
        border-bottom: 0;
      }
      .box-computer {
        padding-left: 6.5%;
        padding-right: 2%;
        margin: 0 auto;
        .attestation-box {
          position: relative;
          .valid {
            display: block;
            position: absolute;
            font-size: 12px;
            right: 0;
            bottom: 5px;
          }
        }
        .box-info-computer {
          padding-left: 0;
        }
      }
    }
  }
</style>
