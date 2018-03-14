<template>
  <div class="my_system_menu">
    <div class="my_system_menu_list">
      <div class="my_system_menu_fixed">
        <div class="my_system_menu_title">
          <i class="iconfont icon-device"></i>
          <span>用户管理</span>
        </div>
        <div class="my_system_menu_fixed_list">
          <div
            class="menu_fixed_item"
            v-for="item in menuTop"
            :key="item.menuRouter"
            @click="jumpRouter(item.menuRouter)"
            :class="{active:item.selectId === selectId}">
            {{item.menuText}}
          </div>
        </div>
      </div>
      <div class="my_system_menu_fixed">
        <div class="my_system_menu_title">
          <i class="el-icon-setting" style="margin-right: 15px;font-size: 25px"></i>
          <span>新增设备</span>
        </div>
        <div class="my_system_menu_fixed_list">
          <div
            class="menu_fixed_item"
            v-for="item in menuFixed"
            :key="item.menuRouter"
            @click="jumpRouter(item.menuRouter)"
            :class="{active:item.selectId === selectId}">
            {{item.menuText}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Bus from '@/components/bus.js'
  export default {
    name: 'system-menu',
    data() {
      return {
        selectId:'',
        routerval: null,//记录当前路由
        menuTop: [//树形菜单项
          {
            menuText: '账号管理',
            selectId:1,
            menuRouter: '/home/manage/account'
          }
        ],
        menuFixed: [//固定菜单项
          {
            menuText: '设备入库',
            selectId:2,
            menuRouter: '/home/manage/equipment'
          }, {
            menuText: '激活码管理',
            selectId:3,
            menuRouter: '/home/manage/activation'
          }
        ],
        defaultProps: {
          label: 'label',
          children: 'children'
        }
      }
    },
    mounted() {
      Bus.$on('menu-selectId', (e) => {
        this.selectId = e;
      })
    },
    methods: {
      jumpRouter(val) {
        this.$router.push(val);
        this.routerval = val;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my_system_menu{
    width: 180px;
    display: flex;
    flex-direction: column;
    background-color: #eee;
    border-right: 2px solid #e2e2e2;
    .my_system_menu_title{
      color: #42ac89;
      height: 70px;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont{
        font-size: 25px;
        margin-right: 15px;
      }
    }
    .my_system_menu_list{
      flex: 1;
      display: flex;
      flex-direction: column;
      .my_system_menu_tree{
        flex: 1;
        .el-tree{
          background-color: transparent;
        }
        font-size: 16px;
        .el-tree-node__content{
          background-color: #f00;
          height: 30px !important;
        }
      }
      .my_system_menu_fixed{
        flex: 1;
        border-top: 2px solid #e2e2e2;
        .menu_fixed_item{
          cursor: pointer;
          font-size: 16px;
          position: relative;
          padding: 11px 0px 11px 30px;;
          &.active{
            background-color: #c7c7c7;
            &:after{
              width: 3px;
              content: '';
              position: absolute;
              right: -2px;
              top: 0px;
              bottom: 0px;
              background-color: #42ac89;
            }
          }
          &:hover{
            background-color: #c7c7c7;
            &:after{
              width: 3px;
              content: '';
              position: absolute;
              right: -2px;
              top: 0px;
              bottom: 0px;
              background-color: #42ac89;
            }
          }
        }
      }
    }
  }
</style>
