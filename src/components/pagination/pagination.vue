<template>
  <div class="pagination">
    <div class="page-choose el-col-8">
      <i class="icon icon-left" v-bind:class="{active:!pageInfo.isMin}" @click="firstPage"><span
        class="line three"></span><span
        class="triangle isosceles-left four"></span></i>
      <i class="icon icon-left" v-bind:class="{active:!pageInfo.isMin}" @click="prevPage"><span
        class="triangle front first"></span><span class="triangle front second"></span></i>
      <input class="page-box" v-model="pageInfo.page">
      <i class="icon icon-right" v-bind:class="{active:!pageInfo.isMax}" @click="nextPage"><span
        class="triangle behind first"></span><span
        class="triangle behind second"></span></i>
      <i class="icon icon-right" v-bind:class="{active:!pageInfo.isMax}" @click="lastPage"><span
        class="line three-right"></span><span
        class="triangle isosceles-right four"></span></i>
    </div>
    <div class="pageTotal el-col-8 center">
      当前1-15条，共50条
    </div>
    <div class="page-size el-col-8">
      <el-select v-model="pageInfo.pageSize" size="mini" class="right" style="width: 120px">
        <el-option value="10">10条</el-option>
        <el-option value="15">15条</el-option>
        <el-option value="20">20条</el-option>
      </el-select>
      <label class="right">每页显示：</label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pagination',
    props: ['pageInfo'],
    data() {
      return {
      }
    },
    methods: {
      firstPage() {
        this.pageInfo.page = 1;
        this.isActive();
      },
      lastPage() {
        this.pageInfo.page = this.pageInfo.totalPage;
        this.isActive()
      },
      prevPage() {
        if (this.pageInfo.page == 1) {
          this.isActive();
          return
        }
        this.pageInfo.page--;
        this.isActive()
      },
      nextPage() {
        if (this.pageInfo.page >= this.pageInfo.totalPage) {
          return
        }
        this.pageInfo.page++;
        this.page++;
        this.isActive()
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
    },
//    computed: {
//      changePage: function () {
//        return this.pageInfo.page
//      }
//    },

  }
</script>

<style lang="scss">
  .pagination {
    color: #2d3035;
    padding: 5px 25px;
    height: 40px;
    .icon {
      margin: 5px;
      float: left;
      display: inline-block;
      cursor: pointer;
      color: white;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      font-size: 22px;
      background-color: #cdcdcd;
      position: relative;
      &.active {
        background-color: #50b292;
      }
      .triangle {
        display: block;
        position: absolute;
        width: 0;
        height: 0;
        z-index: 100;
        top: 5px;
        &.front {
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-right: 7px solid #f9f9f9;
          &.first {
            left: 2px;
          }
          &.second {
            left: 9px;
          }
          &.four {
            left: 6px;
          }
        }
        &.behind {
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 7px solid #f9f9f9;
          &.first {
            right: 2px;
          }
          &.second {
            right: 9px;
          }
        }
        &.isosceles-left {
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-right: 10px solid #f9f9f9;
          &.four {
            left: 6px;
          }
        }
        &.isosceles-right {
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 10px solid #f9f9f9;
          &.four {
            right: 6px;
          }
        }
      }
      .line {
        width: 2px;
        height: 11px;
        position: absolute;
        background: #f9f9f9;
        top: 6px;
        &.three {
          left: 4px;
        }
        &.three-right {
          right: 4px;
        }
      }
    }
    .page-box {
      width: 40px;
      height: 23px;
      border: 1px #7c7c7c solid;
      text-align: center;
      float: left;
      margin: 5px;
    }
    .center {
      text-align: center;
    }
  }
</style>
