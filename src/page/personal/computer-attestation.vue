<template>
  <el-container class="computer-attestation">
    <el-header style="padding: 0">
      <headTop/>
    </el-header>
    <div class="global_container">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="el-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: 'personal-page' }">个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>公司认证</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="last-time">最后更新于 {{lastTime}}</div>
      <div class="computer-form">
        <h3 class="form-title">公司验证</h3>
        <el-form :model="ruleForm" :label-position="labelPosition" :rules="rules" ref="ruleForm" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item class="el-col-24" label="公司名称" prop="companyName">
            <el-input type="text" v-model="ruleForm.companyName" auto-complete="off" placeholder="请填写公司名称"></el-input>
          </el-form-item>
          <el-form-item class="el-col-24" label="公司行业" prop="companyType">
            <el-select style="width: 100%" v-model="ruleForm.companyType" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="el-col-24 upload-pic" label="请上传营业执照" label-width="135px" prop="file">
            <el-upload
              class="avatar-uploader el-col-12"
              :action="url"
              :with-credentials="true"
              :show-file-list="false"
              :on-success="handleSuccess">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus
              avatar-uploader-icon"></i>
            </el-upload>
            <!--<el-upload-->
              <!--class="avatar-uploader el-col-12"-->
              <!--:action="url"-->
              <!--:show-file-list="false"-->
              <!--:with-credentials="true"-->
              <!--:on-success="handleSuccess2">-->
              <!--<img v-if="imageUrl2" :src="imageUrl2" class="avatar">-->
              <!--<i v-else class="el-icon-plus-->
               <!--avatar-uploader-icon"></i>-->
            <!--</el-upload>-->
          </el-form-item>
          <el-form-item class="el-col-24" label="公司联系人" prop="linkman">
            <el-input type="text" v-model="ruleForm.linkman" auto-complete="off" placeholder="请填写公司联系人"></el-input>
          </el-form-item>
          <el-form-item class="el-col-24" label="公司电话" prop="phone">
            <div class="phone-box success">
              <input type="text" class="input area-code" v-model="ruleForm.areaCode" placeholder="请输入区号">
              <input type="text" class="input phone-input" v-model="ruleForm.phone" placeholder="请输入座机/手机号">
            </div>
          </el-form-item>
          <el-form-item class="el-col-24" label="公司所在地" prop="areaId">
            <el-select style="width: 45.8%" class="el-col-11" v-on:change="getCity" v-model="ruleForm.provinceId"
                       placeholder="请选择省">
              <el-option
                v-for="item in provinces"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <span v-if="none" class="el-col-2 center">-</span>
            <el-select v-if="none" style="width: 45.8%" class="el-col-11" v-model="ruleForm.areaId" placeholder="请选择市">
              <el-option
                v-for="item in cites"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="el-col-24" label="详细地址" prop="companyAddress">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" v-model="ruleForm.companyAddress"
                      auto-complete="off" placeholder="请填写公司详细地址"></el-input>
          </el-form-item>
          <el-button style="font-size: 18px;margin-top: 15px;background-color: #164789;color: white" class="el-col-24"
                     @click="submitForm('ruleForm')">点击提交
          </el-button>
        </el-form>
      </div>
    </div>
    <el-footer>
      <Footer/>
    </el-footer>
  </el-container>
</template>

<script>
  import headTop from "@/components/header/head";
  import Footer from "@/components/footer/footer";
  import {baseUrl} from '@/config/base'
  import {getPersonal, getProvinceInfo, getCityInfo,qualification} from '@/service/getInfo'

  export default {
    name: "computer-attestation",

    data() {
      let validatePass = (rule, value, callback) => {
        if (!this.ruleForm.charterId) {
          callback(new Error("请上传两张营业执照图片"));

        }else {
          callback();
        }
      };
      return {

        imageUrl: '',
//        imageUrl2: '',
//        file: [],
        url:'',
        pid: '',
        hasError:true,
        provinces: '',
        cites: '',
        none: false,
        lastTime: "",
        labelPosition: "left",

        dialogImageUrl: "",
        dialogVisible: false,
//    配置表单
        ruleForm: {
          companyName: "",
          companyType: "",
          provinceId: "",
          areaId: "",
          linkman: "",
          phone: "",
          companyAddress: "",
          areaCode: "",
          charterId:""
        },
        rules: {
          companyName: [{required: true, message: "请输入公司名称", trigger: "blur"}],
          companyType: [
            {required: true, message: "请选择公司行业", trigger: "change"}
          ],
          linkman: [
            {required: true, message: "请输入联系人姓名", trigger: "blur"}
          ],
          phone: [
            {required: true, message: "请输入联系人电话", trigger: "blur"}
          ],
          areaId: [
            {required: true, message: "请选择公司地址", trigger: "blur"}
          ],
          companyAddress: [
            {required: true, message: "请输入公司详细地址", trigger: "blur"}
          ],
          charterId: [{required: true, validator: validatePass, trigger: "blur"}]
        },
//    配置行业选项
        options: [{
          value: '农、林、牧、渔业',
          label: '农、林、牧、渔业'
        }, {
          value: '采矿业',
          label: '采矿业'
        }, {
          value: '电力、热力、燃气及水生产和供应业',
          label: '电力、热力、燃气及水生产和供应业'
        }, {
          value: '建筑业',
          label: '建筑业'
        }, {
          value: '交通运输、仓储和邮政业',
          label: '交通运输、仓储和邮政业'
        }, {
          value: '住宿和餐饮业',
          label: '住宿和餐饮业'
        }, {
          value: '信息传输、软件和信息技术服务业',
          label: '信息传输、软件和信息技术服务业'
        }, {
          value: '金融业',
          label: '金融业'
        }, {
          value: '房地产业',
          label: '房地产业'
        }, {
          value: '租赁和商务服务业',
          label: '租赁和商务服务业'
        }, {
          value: '科学研究和技术服务业',
          label: '科学研究和技术服务业'
        }, {
          value: '水利、环境和公共设施管理业',
          label: '水利、环境和公共设施管理业'
        }, {
          value: '居民服务、修理和其他服务业',
          label: '居民服务、修理和其他服务业'
        }, {
          value: '教育',
          label: '教育'
        }, {
          value: '卫生和社会工作',
          label: '卫生和社会工作'
        }, {
          value: '文化、体育和娱乐业',
          label: '文化、体育和娱乐业'
        }, {
          value: '公共管理、社会保障和社会组织',
          label: '公共管理、社会保障和社会组织'
        }, {
          value: '国际组织',
          label: '国际组织'
        }],
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if(this.ruleForm.areaCode!=''){
              this.ruleForm.telephone = this.ruleForm.areaCode+'-'+this.ruleForm.phone
            }else {
              this.ruleForm.telephone = this.ruleForm.phone
            }
            qualification(this.ruleForm).then(res=>{
              if(res.data.code == 0){
                this.$message({
                  type: 'success',
                  center: true,
                  message: '提交成功'
                });
                this.$router.push({ name: 'personal-page'});
              }else {
                this.$message({
                  type: 'error',
                  center: true,
                  message: res.data.msg
                });
              }
            }).catch(()=>{

            })
          } else {
            if(this.ruleForm.areaCode!=''){
              this.ruleForm.telephone = this.ruleForm.areaCode+'-'+this.ruleForm.phone
            }else {
              this.ruleForm.telephone = this.ruleForm.phone
            }
            console.log(this.ruleForm.telephone)
//            console.log("error submit!!");
            return false;
          }
        });
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleSuccess(res, file) {
        console.log(file.response);
        this.imageUrl = URL.createObjectURL(file.raw);
        this.ruleForm.charterId = file.response.data.fileId
      },
//      handleSuccess2(res, file) {
//        this.imageUrl2 = URL.createObjectURL(file.raw);
//        this.file[1] = file.response.data.fileId;
//        console.log(this.file)
//      },
      getProvince() {
        getProvinceInfo().then(res => {
          if (res.data.code == 0) {
            this.provinces = res.data.data;
          }
        }).catch(() => {

        })
      },
      getCity() {
        getCityInfo(this.ruleForm.provinceId).then(res => {
          if (res.data.code == 0) {
            this.cites = res.data.data;
            this.ruleForm.cityId = '';
            this.none = true;
          }
        }).catch(() => {

        })
      },
    },
    mounted: function () {
      this.getProvince();
      this.lastTime = this.$route.params.lastTime;
      this.url = baseUrl+'/web/common/file/upload';
    },
    components: {
      headTop,
      Footer
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../style/mixin";
  .computer-attestation{
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
      height: 890px;
      .last-time {
        padding: 15px 0;
        font-size: 18px;
      }
      .computer-form {
        width: 630px;
        height: 810px;
        margin: 15px auto;
        border: 1px #a4a4a4 solid;
        padding: 10px 50px;
        .phone-box {
          border: 1px solid #dcdfe6;
          border-radius: 4px;
          .input {
            height: 40px;
            padding: 0 15px;
            color:#606266;
          }
          .input::-webkit-input-placeholder{
            color: #c6c6c6;
          }
          .input:focus {
            outline: none;
          }
          .area-code {
            width: 100px;
            margin-top: 8px;
            height: 24px;
            margin-bottom: 8px;
            border-right: 1px solid gray;
          }
        }
        .form-title {
          padding: 15px 0 25px 0;
          font-size: 28px;
          color: #164888;
          font-weight: normal;
        }
        .upload-pic {
          height: 220px;
          margin-bottom: 0 !important;
        }
        .center {
          text-align: center;
        }
        .avatar-uploader {
          .avatar-uploader-icon {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .avatar-uploader-icon :hover {
            border-color: #409EFF;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
          }
          .avatar {
            width: 178px;
            height: 178px;
            display: block;
          }
        }
        .el-select {
          width: 130px;
        }
      }
    }
  }
</style>
