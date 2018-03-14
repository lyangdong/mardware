<template>
  <el-container class="system-account">
    <transition name="fade">
      <el-aside transiton="fade" width="165px" v-show="asideIsOpen">
        <el-form label-position="top" :rules="rules" label-width="80px" :model="filterForm" ref="filterForm" size="mini">
          <el-form-item label="型号">
            <el-select v-model="filterForm.name" placeholder="请选择型号">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-select v-model="filterForm.state" placeholder="请选择状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备ID">
            <el-select v-model="filterForm.id" placeholder="请选择设备ID">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="filterForm.type" placeholder="请选择类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button class="success-btn" @click="submitForm('filterForm')">确&nbsp;&nbsp;&nbsp;定</el-button>
            <el-button class="reset-btn" @click="resetForm('filterForm')">重&nbsp;&nbsp;&nbsp;置</el-button>
          </el-form-item>
        </el-form>
      </el-aside>
    </transition>
    <el-container class="account-main">
      <div class="aside-bar" :class="{ asideOpen: asideIsOpen }" @click="handleIsOpen">
        <span></span>
      </div>
      <el-header>
        <el-row class="text_center">
          <el-col :span="6" v-for="item in headOptions" :key="item.label">
            <div class="header-label">{{item.label}}</div>
            <div class="header-value">{{item.value}}</div>
          </el-col>
        </el-row>
        <div class="activation_title">
          <i class="iconfont icon-refresh icon"></i>
          <i class="el-icon-edit-outline icon"></i>
          <i class="el-icon-delete icon"></i>
          <i class="el-icon-setting icon"></i>
          <el-button class="add-account-btn" @click="handleAdd">新增账户</el-button>
        </div>
      </el-header>
      <el-main>
        <div class="choose" @click="handleShowCheckedBox"></div>
        <div class="choose-box" v-show="showCheckedBox">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="手机号"></el-checkbox>
            <el-checkbox label="邮箱"></el-checkbox>
            <el-checkbox label="注册时间"></el-checkbox>
            <el-checkbox label="最近登录"></el-checkbox>
            <el-checkbox label="所属公司"></el-checkbox>
          </el-checkbox-group>
        </div>
        <el-table
          ref="multipleTable"
          stripe
          class="main-table"
          height="700"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            class="noBorder"
            type="selection">
          </el-table-column>
          <el-table-column
            v-if="checkList.indexOf('手机号')!=-1"
            label="手机号"
            prop="phone"
            width="120">
          </el-table-column>
          <el-table-column
            v-if="checkList.indexOf('邮箱')!=-1"
            prop="email"
            label="邮箱"
            width="180">
          </el-table-column>
          <el-table-column
            v-if="checkList.indexOf('注册时间')!=-1"
            prop="createTime"
            label="注册时间"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            v-if="checkList.indexOf('最近登录')!=-1"
            prop="lastLogin"
            label="最近登录"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            v-if="checkList.indexOf('所属公司')!=-1"
            prop="companyName"
            label="所属公司"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态">
            <template slot-scope="scope">
              <el-col :span="24" v-if="scope.row.state==1">使用中(待认证)</el-col>
              <el-col :span="24" v-if="scope.row.state==2">使用中(待审批)</el-col>
              <el-col :span="24" v-if="scope.row.state==0">使用中</el-col>
            </template>
          </el-table-column>
          <el-table-column
            prop="isActive"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <div class="handle el-col-10"
                   @click="handleEdit(scope.$index, scope.row)">启用
              </div>
              <el-col :span="2">|</el-col>
              <div class="handle el-col-10"
                   @click="handleDelete(scope.$index, scope.row)">禁用
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="accountId"
            width="80">
            <template slot-scope="scope">
              <div class="details handle"
                   @click="handleDetails(scope.$index, scope.row)">详情
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog class="details-dialog" title="账户详情" :visible.sync="dialogTableVisible">
          <div class="personal-info">
            <div class="info-title">
              <i class="el-icon-star-off"></i>
              <span>账户信息</span>
            </div>
            <div class="info-content">
              <ul class="info" style="height: 72px">
                <li class="el-col-11">手机号：{{detailsInfo.phone}}</li>
                <li class="el-col-13">邮箱：{{detailsInfo.email}}</li>
              </ul>
            </div>
          </div>
          <div class="company-info">
            <div class="info-title">
              <i class="el-icon-star-off"></i>
              <span>公司信息</span>
            </div>
            <ul class="info" style="height: 140px">
              <li class="el-col-11">公司名称：{{detailsInfo.companyName}}</li>
              <li class="el-col-13">公司行业：{{detailsInfo.companyType}}</li>
              <li class="el-col-11">公司法人：{{detailsInfo.linkman}}</li>
              <li class="el-col-13">公司电话：{{detailsInfo.telephone}}</li>
              <li class="el-col-24">公司地址：{{detailsInfo.address}}</li>
            </ul>
          </div>
          <div class="login-record">
            <div class="info-title">
              <i class="el-icon-time"></i>
              <span>登录记录</span>
            </div>
            <el-table
              :data="recodeData"
              style="width: 100%">
              <el-table-column
                prop="loginTime"
                label="登录时间"
                width="250">
              </el-table-column>
              <el-table-column
                prop="logoutTime"
                label="退出时间"
                width="250">
              </el-table-column>
              <el-table-column
                prop="time"
                label="持续时间"
                width="170">
              </el-table-column>
              <el-table-column
                prop="outType"
                label="退出操作"
                width="175">
                <template slot-scope="scope">
                  <el-col :span="24" v-if="scope.row.outType==0">主动退出</el-col>
                  <el-col :span="24" v-if="scope.row.outType==1">超时自动退出</el-col>
                </template>
              </el-table-column>
            </el-table>
            <paginationMini :pageInfoMini="pageInfoMini"></paginationMini>
          </div>
        </el-dialog>
        <el-dialog class="add-dialog" title="新增账户" :visible.sync="dialogAddVisible">

        </el-dialog>
      </el-main>
      <el-footer class="pagination">
        <pagination :pageInfo="pageInfo"></pagination>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
  import Bus from '@/components/bus.js'
  import Pagination from '@/components/pagination/pagination'
  import PaginationMini from '@/components/pagination/pagination-mini'
  import ElFooter from "../../../../../node_modules/element-ui/packages/footer/src/main.vue";

  export default {
    name: '',
    data() {
      return {
        asideIsOpen:true,
        dialogTableVisible: false,
        dialogAddVisible: false,
        showCheckedBox:false,
        checkList: ['手机号','邮箱','注册时间','最近登录','所属公司'],
        detailsInfo: {},
        page: '',
        pageInfo: {
          page: 1,
          totalPage: 5,
          pageSize: 15,
          isMin: true,
          isMax: false,
        },
        pageInfoMini: {
          page: 1,
          totalPage: 5,
          pageSize: 15,
          isMin: true,
          isMax: false,
        },
        filterForm: {
          name: '',
          type: '',
          id: '',
          state: '',
        },
        rules: {
          state: []
        },
        recodeData: [
          {
            loginTime: '2016/05/02 19:20:21',
            logoutTime: '2016/05/02 20:20:21',
            time: '20分钟',
            outType: '1'
          },
          {
            loginTime: '2016/05/02 19:20:21',
            logoutTime: '2016/05/02 20:20:21',
            time: '20分钟',
            outType: '1'
          },
          {
            loginTime: '2016/05/02 19:20:21',
            logoutTime: '2016/05/02 20:20:21',
            time: '20分钟',
            outType: '0'
          },
          {
            loginTime: '2016/05/02 19:20:21',
            logoutTime: '2016/05/02 20:20:21',
            time: '20分钟',
            outType: '1'
          },
          {
            loginTime: '2016/05/02 19:20:21',
            logoutTime: '2016/05/02 20:20:21',
            time: '20分钟',
            outType: '1'
          }],
        tableData3: [
          {
            phone: '1890889415',
            email: '330338945@qq.com',
            createTime: '2018-01-20 12:00:00',
            lastLogin: '2018-01-20 12:22:21',
            companyName: '顺势为科技有限公司',
            state: '1',
            isActive: '0',
            accountId: '12',
            companyType: '教育',
            linkman: '王总',
            telephone: '028-42138128',
            address: '高鹏大道东方希望B坐218'
          },
          {
            phone: '1890889415',
            email: '330338945@qq.com',
            createTime: '2018-01-20 12:00:00',
            lastLogin: '2018-01-20 12:22:21',
            companyName: '顺势为',
            state: '0',
            isActive: '0',
            accountId: '12',
            companyType: '教育',
            linkman: '王总',
            telephone: '028-42138128',
            address: '高鹏大道东方希望B坐218'
          },
          {
            phone: '1890889415',
            email: '330338945@qq.com',
            createTime: '2018-01-20 12:00:00',
            lastLogin: '2018-01-20 12:22:21',
            companyName: '顺势为',
            state: '1',
            isActive: '0',
            accountId: '12',
            companyType: '教育',
            linkman: '王总',
            telephone: '028-42138128',
            address: '高鹏大道东方希望B坐218'
          },
          {
            phone: '1890889415',
            email: '330338945@qq.com',
            createTime: '2018-01-20 12:00:00',
            lastLogin: '2018-01-20 12:22:21',
            companyName: '顺势为',
            state: '1',
            isActive: '0',
            accountId: '12',
            companyType: '教育',
            linkman: '王总',
            telephone: '028-42138128',
            address: '高鹏大道东方希望B坐218'
          },
          {
            phone: '1890889415',
            email: '330338945@qq.com',
            createTime: '2018-01-20 12:00:00',
            lastLogin: '2018-01-20 12:22:21',
            companyName: '顺势为科技有限公司',
            state: '1',
            isActive: '0',
            accountId: '12',
            companyType: '教育',
            linkman: '王总',
            telephone: '028-42138128',
            address: '高鹏大道东方希望B坐218'
          },
          {
            phone: '1890889415',
            email: '330338945@qq.com',
            createTime: '2018-01-20 12:00:00',
            lastLogin: '2018-01-20 12:22:21',
            companyName: '顺势为',
            state: '0',
            isActive: '0',
            accountId: '12',
            companyType: '教育',
            linkman: '王总',
            telephone: '028-42138128',
            address: '高鹏大道东方希望B坐218'
          },
          {
            phone: '1890889415',
            email: '330338945@qq.com',
            createTime: '2018-01-20 12:00:00',
            lastLogin: '2018-01-20 12:22:21',
            companyName: '顺势为',
            state: '1',
            isActive: '0',
            accountId: '12',
            companyType: '教育',
            linkman: '王总',
            telephone: '028-42138128',
            address: '高鹏大道东方希望B坐218'
          },
          {
            phone: '1890889415',
            email: '330338945@qq.com',
            createTime: '2018-01-20 12:00:00',
            lastLogin: '2018-01-20 12:22:21',
            companyName: '顺势为',
            state: '1',
            isActive: '0',
            accountId: '12',
            companyType: '教育',
            linkman: '王总',
            telephone: '028-42138128',
            address: '高鹏大道东方希望B坐218'
          },
          {
            phone: '1890889415',
            email: '330338945@qq.com',
            createTime: '2018-01-20 12:00:00',
            lastLogin: '2018-01-20 12:22:21',
            companyName: '顺势为科技有限公司',
            state: '1',
            isActive: '0',
            accountId: '12',
            companyType: '教育',
            linkman: '王总',
            telephone: '028-42138128',
            address: '高鹏大道东方希望B坐218'
          },
          {
            phone: '1890889415',
            email: '330338945@qq.com',
            createTime: '2018-01-20 12:00:00',
            lastLogin: '2018-01-20 12:22:21',
            companyName: '顺势为',
            state: '0',
            isActive: '0',
            accountId: '12',
            companyType: '教育',
            linkman: '王总',
            telephone: '028-42138128',
            address: '高鹏大道东方希望B坐218'
          },
          {
            phone: '1890889415',
            email: '330338945@qq.com',
            createTime: '2018-01-20 12:00:00',
            lastLogin: '2018-01-20 12:22:21',
            companyName: '顺势为',
            state: '1',
            isActive: '0',
            accountId: '12',
            companyType: '教育',
            linkman: '王总',
            telephone: '028-42138128',
            address: '高鹏大道东方希望B坐218'
          },
          {
            phone: '1890889415',
            email: '330338945@qq.com',
            createTime: '2018-01-20 12:00:00',
            lastLogin: '2018-01-20 12:22:21',
            companyName: '顺势为',
            state: '1',
            isActive: '0',
            accountId: '12',
            companyType: '教育',
            linkman: '王总',
            telephone: '028-42138128',
            address: '高鹏大道东方希望B坐218'
          },
          {
            phone: '1890889415',
            email: '330338945@qq.com',
            createTime: '2018-01-20 12:00:00',
            lastLogin: '2018-01-20 12:22:21',
            companyName: '顺势为',
            state: '1',
            isActive: '0',
            accountId: '12',
            companyType: '教育',
            linkman: '王总',
            telephone: '028-42138128',
            address: '高鹏大道东方希望B坐218'
          },
          {
            phone: '1890889415',
            email: '330338945@qq.com',
            createTime: '2018-01-20 12:00:00',
            lastLogin: '2018-01-20 12:22:21',
            companyName: '顺势为',
            state: '1',
            isActive: '0',
            accountId: '12',
            companyType: '教育',
            linkman: '王总',
            telephone: '028-42138128',
            address: '高鹏大道东方希望B坐218'
          },
          {
            phone: '1890889415',
            email: '330338945@qq.com',
            createTime: '2018-01-20 12:00:00',
            lastLogin: '2018-01-20 12:22:21',
            companyName: '顺势为科技有限公司',
            state: '1',
            isActive: '0',
            accountId: '12',
            companyType: '教育',
            linkman: '王总',
            telephone: '028-42138128',
            address: '高鹏大道东方希望B坐218'
          },
          {
            phone: '1890889415',
            email: '330338945@qq.com',
            createTime: '2018-01-20 12:00:00',
            lastLogin: '2018-01-20 12:22:21',
            companyName: '顺势为',
            state: '0',
            isActive: '0',
            accountId: '12',
            companyType: '教育',
            linkman: '王总',
            telephone: '028-42138128',
            address: '高鹏大道东方希望B坐218'
          },
          {
            phone: '1890889415',
            email: '330338945@qq.com',
            createTime: '2018-01-20 12:00:00',
            lastLogin: '2018-01-20 12:22:21',
            companyName: '顺势为',
            state: '1',
            isActive: '0',
            accountId: '12',
            companyType: '教育',
            linkman: '王总',
            telephone: '028-42138128',
            address: '高鹏大道东方希望B坐218'
          },
          {
            phone: '1890889415',
            email: '330338945@qq.com',
            createTime: '2018-01-20 12:00:00',
            lastLogin: '2018-01-20 12:22:21',
            companyName: '顺势为',
            state: '1',
            isActive: '0',
            accountId: '12',
            companyType: '教育',
            linkman: '王总',
            telephone: '028-42138128',
            address: '高鹏大道东方希望B坐218'
          },
        ],

        options: [
          {
            value: '选项1',
            label: '黄金糕'
          },
          {
            value: '选项2',
            label: '双皮奶'
          }
        ],
        headOptions: [
          {
            value: 20,
            label: '账户总数量'
          },
          {
            value: 24,
            label: '未认证账户'
          },
          {
            value: 30,
            label: '待审批账户'
          },
          {
            value: 4,
            label: '已禁用账户'
          }
        ],
        multipleSelection: [],
      }
    },
    mounted() {
      Bus.$emit('menu-selectId', 1)
    },

    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleDetails(index, row) {
        this.dialogTableVisible = true;
        this.detailsInfo = row
        this.pageInfoMini.page = 1
//        this.isActiveMini();
      },
      handleAdd() {
        this.dialogAddVisible = true;
      },
      isActive() {
        if (this.pageInfo.page == 1) {
          this.pageInfo.isMin = true;
          this.pageInfo.isMax = false;
        } else if (this.pageInfo.page == this.pageInfo.totalPage) {
          this.pageInfo.isMax = true;
          this.pageInfo.isMin = false;
        } else {
          this.pageInfo.isMin = false;
          this.pageInfo.isMax = false;
        }
      },
      isActiveMini() {
        if (this.pageInfoMini.page == 1) {
          this.pageInfoMini.isMin = true;
          this.pageInfoMini.isMax = false;
        } else if (this.pageInfoMini.page == this.pageInfoMini.totalPage) {
          this.pageInfoMini.isMax = true;
          this.pageInfoMini.isMin = false;
        } else {
          this.pageInfoMini.isMin = false;
          this.pageInfoMini.isMax = false;
        }
      },
      handleIsOpen(){
        this.asideIsOpen = !this.asideIsOpen
      },
      handleShowCheckedBox(){
        this.showCheckedBox = !this.showCheckedBox
      }
    },
    watch: {
      pageInfo: {
        handler: function (val, oldval) {

        },
        deep: true//对象内部的属性监听
      },
      'pageInfo.page': function (val, oldval) {
        if (isNaN(val) || val < 1 || val > this.pageInfo.totalPage) {
          this.pageInfo.page = oldval;
          this.isActive();
          return
        } else {
          this.isActive()
        }
        console.log(this.pageInfo.page)
      },//键路径必须加上引号
      'pageInfo.pageSize': function () {

      },
      pageInfoMini: {
        handler: function (val, oldval) {

        },
        deep: true//对象内部的属性监听
      },
      'pageInfoMini.page': function (val, oldval) {
        if (isNaN(val) || val < 1 || val > this.pageInfoMini.totalPage) {
          this.pageInfoMini.page = oldval;
          this.isActiveMini();
          return
        } else {
          this.isActiveMini()
        }
        console.log(this.pageInfoMini.page)
      },//键路径必须加上引号
      'pageInfoMini.pageSize': function () {

      },
    },
    components: {
      ElFooter,
      Pagination,
      PaginationMini,
      Bus
    }
  }
</script>

<style lang="scss">
  @import "../../../../style/mixin";

  .fade-enter-active, .fade-leave-active {
    transition: all .2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    width: 0!important;
  }
  .el-container.system-account {
    .el-aside {
      padding: 8px;
      border-right: 1px #e2e2e2 solid;
      background-color: #F9F9F9;
      .el-form-item__label {
        padding: 0 0 6px 0;
        font-size: 18px;
        color: #22252a;
      }
      .el-button {
        display: block;
        width: 100%;
        margin: 6px 0 12px 0;
        padding: 6px;
        font-size: 15px;
        &.success-btn {
          background-color: #42ac89 !important;
          color: white;
          &:active {
            outline: none !important;
            border: 1px white solid;
          }
        }
        &.reset-btn {
          background-color: #c7c7c7;
          &:focus {
            color: gray;
          }
          &:active {
            outline: none !important;
            border: 1px white solid;
          }
          &:hover {
            color: gray;
          }
        }
      }
      .el-form-item{
        min-width: 135px;
      }
    }
    .account-main{
      position: relative;
      .el-header {
        padding: 0;
        height: 115px !important;
        .activation_title {
          position: relative;
          border-bottom: 1px solid #e2e2e2;
          border-top: 1px solid #e2e2e2;
          @include wh(100%, 42px);
          @include font(24px, 42px);
          .icon {
            cursor: pointer;
            padding: 0 5px;
            color: #bcbcbc;
          }
          .icon-refresh {
            padding: 0;
            font-size: 21px;
            color: #484b50;
            margin-right: -3.5px;
            margin-left: 1.5px;
          }
          .add-account-btn {
            color: white;
            position: absolute;
            top: 4px;
            right: 22px;
            background-color: #42ac89;
            font-size: 16px;
            height: 32px;
            width: 110px;
            padding: 0;
            border-radius: 0;
            &:active {
              outline: none !important;
              border: 1px white solid;
            }
          }
        }
        .el-row {
          padding: 0 10%;
          height: 73px;
          .header-label {
            font-size: 18px;
            padding: 8px;
          }
          .header-value {
            font-size: 24px;
            color: #42ac89;
          }
        }
      }
      .el-main{
        position: relative;
        padding: 0;
        .choose{
          width: 24px;
          height: 40px;
          background-color: #E2E2E2;
          border: 1px solid #c5c5c5;
          position: absolute;
          z-index: 100;
          right: 0;
          cursor: pointer;
          &:before{
            content: '';
            position: absolute;
            border-left: 7px solid transparent;
            border-right: 7px solid transparent;
            border-top: 6px solid #616161;
            left: 4px;
            top: 14px;
            z-index: 1000;
          }
        }
        .choose-box{
          position: absolute;
          width:180px;
          height: 250px;
          padding: 12px;
          background-color: white;
          border: 1px solid #a8a8a8;
          overflow-y: scroll;
          z-index: 1000;
          right: 0;
          top: 40px;
          .el-checkbox{
            display: block;
            margin-left: 0;
            padding: 2px;
          }
        }
        .el-table__body-wrapper{
          overflow-y: scroll!important;
        }
        .el-table {
          &::before {
            display: none;
          }
          thead {
          }
          td {
            border-color: #e2e2e2;
            padding: 5px 0;
            .cell {
              font-size: 14px;
            }
          }
          th {
            padding: 8px 0;
            .cell {
              text-align: center;
              position: relative;
              font-size: 14px;
              border-left: 1px solid #e2e2e2;
            }
          }
          tbody {
            .cell {
              text-align: center;
            }
          }
          .handle {
            cursor: pointer;
          }
          .details {
            color: #164789;
          }
          .el-table-column--selection {
            .cell {
              border: 0 !important;
            }
          }
        }
        .el-dialog__header {
          font-size: 18px;
          background-color: #42ac89;
          height: 40px;
          padding: 0;
          .el-dialog__title {
            color: white;
            line-height: 40px;
            padding-left: 28px;
          }
          .el-icon-close:before {
            color: white;
            position: absolute;
            right: 0;
            top: -2px;
          }
        }
        .details-dialog {
          .el-dialog {
            width: 80%;
            max-width: 900px;
            min-width: 900px;
            .el-dialog__body {
              height: 620px;
              padding: 15px 25px;
              .login-record {
                height: 345px;
                position: relative;
              }
              .info-title {
                color: #42ac89;
                font-size: 20px;
              }
              .info {
                padding: 20px 25px;
                li {
                  color: #22252a;
                  font-size: 16px;
                  padding: 5px 0;
                }
              }
              .el-table {
                margin-top: 18px;
                td, th {
                  padding: 8px 0;
                }
                .cell {
                  border: 0;
                  font-size: 14px;
                }
              }
            }
          }
        }
        .main-table{
        }
      }
      .el-footer {
        background-color: #ffffff;
        height: 50px !important;
        border-top: 1px #e2e2e2 solid;
        font-size: 16px;
        line-height: 34px;
      }
      .aside-bar{
        position: absolute;
        z-index: 100;
        left: -1px;
        cursor: pointer;
        padding: 12px 4px;
        border: 1px solid #e2e2e2;
        background-color: #F9F9F9;
        border-radius: 0 4px 4px 0;
        border-left: 1px solid white;
        &.asideOpen{
          span{
            transform:rotate(90deg);
          }
        }
        span{
          display: block;
          width: 15px;
          height: 15px;
          background: url("../../../../assets/images/system-menu-bar.png")no-repeat center;
          background-size: 100%;
        }
      }
    }
  }
</style>
