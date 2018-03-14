<template>
  <el-container class="system-equipment">
    <transition name="fade">
      <el-aside  transiton="fade" width="165px" v-show="asideIsOpen">
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
    <el-container class="equipment-main">
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
          <i class="el-icon-tickets icon"></i>
          <ul class="exp-imp">
            <li class="el-col-6 el-col-offset-2" style="color:#42ac89">批量导入</li>
            <li class="el-col-6 el-col-offset-2">选择导出</li>
            <li class="el-col-6 el-col-offset-2">全部导出</li>
          </ul>
          <el-button class="add-equipment-btn" @click="handleAdd">新增设备</el-button>
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
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            class="noBorder"
            type="selection">
          </el-table-column>
          <el-table-column
            label="设备ID"
            prop="phone"
            width="120">
          </el-table-column>
          <el-table-column
            prop="email"
            label="设备类型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="设备型号"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="lastLogin"
            label="生产批次"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="companyName"
            label="入库日期"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="companyName"
            label="入库人员"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态">
            <template slot-scope="scope">
              <el-col :span="24" v-if="scope.row.state==1" style="color: #42ac89">已激活</el-col>
              <el-col :span="24" v-if="scope.row.state==0" style="color: #949494">未激活</el-col>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="激活时间"
            show-overflow-tooltip>
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
        </el-table>
        <el-dialog class="add-dialog" title="新增设备" :visible.sync="dialogAddVisible">
          <div class="box_main">
            <ul class="title_list">
              <li v-for="item in deviceData.title" :key="item" class="title_item">{{item}}</li>
            </ul>
            <ul class="input_list clear">
              <li v-for="(item,index) in deviceData.data" :key="index" class="input_item">
                <div class="item_box">
                  <el-select
                    size="mini"
                    v-model="item.type"
                    style="border-radius:0;"
                    placeholder="请选择类型"/>
                </div>
                <div class="item_box">
                  <el-select
                    size="mini"
                    v-model="item.code"
                    style="border-radius:0;"
                    placeholder="请选择激活码"/>
                </div>
                <div class="item_box">
                  <el-select
                    size="mini"
                    v-model="item.group"
                    :clearable="showClear"
                    placeholder="请输入生产批次"/>
                </div>
                <div class="item_box">
                  <el-select
                    size="mini"
                    v-model="item.ID"
                    :clearable="showClear"
                    placeholder="请输入设备ID"/>
                </div>
                <div class="item_box">
                  <i class="el-icon-circle-close-outline icon"></i>
                  <i class="el-icon-circle-plus-outline icon"
                     @click="addActivationData"
                     v-if="index === deviceData.data.length-1"></i>
                </div>
              </li>
            </ul>
            <el-row class="footer-button">
              <el-button  size="mini"  class="el-col-11">确定</el-button>
              <el-button  size="mini" class="el-col-11" @click="handleClose">取消</el-button>
            </el-row>
          </div>
        </el-dialog>
      </el-main>
      <el-footer class="pagination">
        <pagination :page-info="pageInfo"></pagination>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
  import Bus from '@/components/bus.js'
  import Pagination from '@/components/pagination/pagination'
  import ElFooter from "../../../../../node_modules/element-ui/packages/footer/src/main.vue";

  export default {
    name: 'system-equipment-storage',
    data() {
      return {
        asideIsOpen:true,
        dialogTableVisible: false,
        showCheckedBox:false,
        checkList: ['手机号','邮箱','注册时间','最近登录','所属公司'],
        dialogAddVisible: false,
        pageInfo: {
          page: 1,
          totalPage: 5,
          pageSize: 10,
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
        detailsInfo: {},
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
          }
        ],
        tableData3: [
          {
            phone: '1890889415',
            email: '330338945@qq.com',
            createTime: '2018-01-20 12:00:00',
            lastLogin: '2018-01-20 12:22:21',
            companyName: '顺势为科技有限公司',
            state: '1',
            isActive: '0',
            equipmentId: '12',
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
            equipmentId: '12',
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
            equipmentId: '12',
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
            equipmentId: '12',
            companyType: '教育',
            linkman: '王总',
            telephone: '028-42138128',
            address: '高鹏大道东方希望B坐218'
          }
        ],
        multipleSelection: [],
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
            label: '已入库设备数量'
          },
          {
            value: 24,
            label: '已激活设备数量'
          },
          {
            value: 30,
            label: '本月新增入库'
          },
          {
            value: 4,
            label: '本月新增激活'
          }
        ],
        showClear : false,
        deviceData : {
          title : ['类型','型号','生产批次','设备ID',''],
          data : [
            {
              type:'',
              code : '',
              group : '',
              ID : ''
            }
          ]
        }
      }
    },
    mounted(){
      Bus.$emit('menu-selectId',2)
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
      handleAdd() {
        this.dialogAddVisible = true;
      },
      handleClose(){
        this.dialogAddVisible = false;
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
      addActivationData(){
        console.log(123)
        this.deviceData.data.unshift({
          code : '',
          group : '',
          serialNo : ''
        });
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
        deep: true//对象内部的属性监听，也叫深度监听
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

      }
    },
    components: {
      ElFooter,
      Pagination,
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
  .el-container.system-equipment {
    .equipment-main{
      position: relative;
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
    }
    .el-header {
      padding: 0;
      height: 115px !important;
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
      .activation_title {
        position: relative;
        border-bottom: 1px solid #e2e2e2;
        border-top: 1px solid #e2e2e2;
        @include wh(100%, 42px);
        @include font(24px, 42px);
        .icon {
          cursor: pointer;
          padding: 0px 5px;
          color: #bcbcbc;
        }
        .icon-refresh {
          padding: 0;
          font-size: 21px;
          color: #484b50;
          margin-right: -3.5px;
          margin-left: 1.5px;
        }
        .exp-imp {
          position: absolute;
          top: 0;
          font-size: 14px;
          color: #22252a;
          width: 430px;
          left: 220px;
          text-align: center;
          li {
            cursor: pointer;
          }
        }
        .add-equipment-btn {
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
    }
    .el-main {
      padding: 0;
      position: relative;
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
      .el-table {
        &::before {
          display: none;
        }
        td {
          border-color: #e2e2e2;
          padding: 8px 0;
        }
        th {
          padding: 8px 0;
          .cell {
            text-align: center;
            position: relative;
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
            height: 670px;
            padding: 15px 25px;
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
      .add-dialog {
        .el-dialog__body{
          height: 300px;
          position: relative;
          .box_main {
            flex: 1;
            @include flex(column);
            .title_list {
              text-align: center;
              user-select: none;
              @include wh(100%, 35px);
              border-bottom: 2px solid #e2e2e2;
              .title_item {
                float: left;
                width: 22%;
                position: relative;
                font-weight: 600;
                @include font(16px, 33px);
                &::after {
                  width: 1px;
                  content: '';
                  position: absolute;
                  right: 0px;
                  top: 8px;
                  bottom: 8px;
                  background-color: #e2e2e2;
                }
                &:nth-child(4) {
                  width:34%;
                  &::after {
                    display: none;
                  }
                }
                &:last-child {
                  width: 0%;
                  border-left: 0;
                  &::after {
                    display: none;
                  }
                }
              }
            }
            .input_list {
              flex: 1;
              overflow-x: auto;
              .input_item {
                .item_box {
                  float: left;
                  padding: 5px 10px;
                  @include wh(22%, 100%);
                  &:nth-child(4) {
                    width: 25%;
                    .el-input__inner {
                    }
                  }
                  &:last-child {
                    @include flex;
                    align-items: center;
                    @include wh(6%, 38px);
                    .icon {
                      color: #555;
                      font-size: 20px;
                      padding: 0px 2px;
                      cursor: pointer;
                      &:hover {
                        color: #42ac89;
                      }
                    }
                  }
                  .el-input__inner {
                    border-radius: 0;
                  }
                }
              }
            }
            .footer-button{
              width: 200px;
              position: absolute;
              bottom: 30px;
              left: calc(50% - 100px);
              & .el-button:first-child{
                background-color: #42ac89;
                color: white;
              }
              & .el-button:last-child{
                color: white;
                background-color: #c7c7c7;
              }
            }
          }
        }
      }
    }
    .el-footer {
      background-color: #ffffff;
      height: 50px !important;
      border-top: 1px #e2e2e2 solid;
      font-size: 16px;
      line-height: 34px;
    }
  }
</style>
