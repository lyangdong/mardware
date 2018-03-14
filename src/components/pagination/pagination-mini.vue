<template>
  <div class="pagination-mini">
    <div class="page-choose el-col-12">
      <i class="icon icon-left" v-bind:class="{active:!pageInfoMini.isMin}" @click="firstPage"><span
        class="line three"></span><span
        class="triangle isosceles-left four"></span></i>
      <i class="icon icon-left" v-bind:class="{active:!pageInfoMini.isMin}" @click="prevPage"><span
        class="triangle front first"></span><span class="triangle front second"></span></i>
      <input class="page-box" v-model="pageInfoMini.page">
      <i class="icon icon-right" v-bind:class="{active:!pageInfoMini.isMax}" @click="nextPage"><span
        class="triangle behind first"></span><span
        class="triangle behind second"></span></i>
      <i class="icon icon-right" v-bind:class="{active:!pageInfoMini.isMax}" @click="lastPage"><span
        class="line three-right"></span><span
        class="triangle isosceles-right four"></span></i>
    </div>
    <div class="pageTotal el-col-12 right" style="line-height: 33px">
      当前1-15条，共50条
    </div>
  </div>
</template>

<script>

  export default {
    name: 'paginationMini',
    props: ['pageInfoMini'],
    data() {
      return {

      }
    },
    methods: {
      firstPage() {
        this.pageInfoMini.page = 1;
        this.isActive();
      },
      lastPage() {
        this.pageInfoMini.page = this.pageInfoMini.totalPage;
        this.isActive()
      },
      prevPage() {
        if (this.pageInfoMini.page == 1) {
          this.isActive();
          return
        }
        this.pageInfoMini.page--;
        this.isActive()
      },
      nextPage() {
        if (this.pageInfoMini.page >= this.pageInfoMini.totalPage) {
          return
        }
        this.pageInfoMini.page++;
        this.isActive()
      },
      isActive() {
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
    },
//    computed: {
//      changePage: function () {
//        return this.pageInfoMini.page
//      }
//    },

  }
</script>

<style lang="scss">
  .pagination-mini {
    color: #2d3035;
    padding: 5px 15px;
    height: 40px;
    position: absolute;
    width: 100%;
    bottom: 10px;
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
    .right{
      text-align: right;
    }
    .pageTotal{
      font-size: 14px;
    }
  }
</style>
