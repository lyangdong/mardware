<template>
  <div class="forget-page">
    <headTop/>
    <div class="global_container">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="el-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }" style="font-weight: normal">登录/注册</el-breadcrumb-item>
        <el-breadcrumb-item>忘记密码</el-breadcrumb-item>
      </el-breadcrumb>
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import headTop from '@/components/header/head'
  import Footer from '@/components/footer/footer'
  import ElHeader from "../../../node_modules/element-ui/packages/header/src/main.vue";

  export default {
    name: 'ForgetPwd',
    data() {
      return {}
    },
    components: {
      ElHeader,
      headTop,
      Footer
    },
    methods: {
      open() {

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin";

  .forget-page {
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    .global_container {
      font-size: 18px;
      margin: 0 auto;
      .el-breadcrumb {
        font-size: 18px;
        width: 100%;
        padding: 20px;
        margin: 0 auto;
      }
    }
  }
</style>
