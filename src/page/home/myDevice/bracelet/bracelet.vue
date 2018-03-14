<template>
    <div class="bracelet_container">
        <div class="left_menu">
            <div class="company_select">
                <el-select 
                    filterable
                    size="small"
                    popper-class="company_name"
                    v-model="companyName"
                    placeholder="请选择公司">
                    <el-option 
                        v-for="item in companyList" 
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"/>
                </el-select>                
            </div>
            <div class="search_input">
                <el-input
                    size="small"
                    suffix-icon="el-icon-search" 
                    placeholder="组名"/>
            </div>            
            <div class="ztree_menu">
                <vue-ztree :list.sync="menuZtree" :is-open='true'></vue-ztree>
            </div>
        </div>
        <div class="right_table">
            <div class="state_icon">
                <div class="state_item">
                    <div class="icon">
                        <small class="iconfont icon-cloud"></small>
                        <small class="iconfont icon-true"></small>
                    </div>
                    <p class="state_title">
                        在线设备
                    </p>
                    <p class="state_num">
                        30/50
                    </p>
                </div>
                <div class="state_item">
                    <div class="icon">
                        <small class="iconfont icon-offline"></small>
                    </div>
                    <p class="state_title">
                        离线设备
                    </p>
                    <p class="state_num">
                        30/50
                    </p>
                </div>
                <div class="state_item">
                    <div class="icon">
                        <small class="iconfont icon-notice"></small>                        
                    </div>
                    <p class="state_title">
                        警告设备
                    </p>
                    <p class="state_num">
                        <span class="state_serious">
                            20(<span>严重</span>)/
                        </span>
                        <span class="state_commonly">
                            10(<span>一般</span>)/
                        </span>
                        <span class="state_prompt">
                            5(提示)
                        </span>
                    </p>
                </div>
            </div>
            <div class="operation_area">
                <a href="javascript:void 0;" title="刷新">
                    <small class="iconfont icon-refresh"></small>
                </a>
                <a href="javascript:void 0;" title="修改">
                    <small class="iconfont icon-edit"></small>
                </a>
                <a href="javascript:void 0;" title="删除">
                    <small class="iconfont icon-delete"></small>
                </a>
                <a href="javascript:void 0;" title="设置">
                    <small class="iconfont icon-set"></small>
                </a>
            </div>
            <div class="table_content">
                <el-table
                    :size="tableSize" 
                    :data="deviceState">
                    <el-table-column
                        width="80"
                        type="selection"/>
                    <el-table-column
                        prop="state" 
                        align="center"
                        label="状态">
                        <template slot-scope="scope">
                            <small :class="['iconfont','icon-dot',{online:scope.row.state}]"/>
                            <span>{{scope.row.state | onOrOffLine}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="id" 
                        align="center"
                        label="上级ID"/>
                    <el-table-column 
                        prop="name"
                        align="center"
                        label="名称"/>
                    <el-table-column 
                        prop="xinghao"
                        align="center"
                        label="型号"/>
                    <el-table-column 
                        prop="date"
                        align="center"
                        label="更新日期"/>
                    <el-table-column 
                        prop="space"
                        align="center"
                        label="预留位置"/>
                    <el-table-column
                        align="center"
                        width="175" 
                        label="设置">
                        <template slot-scope="scope">
                            <a class="btn"
                                href="javascript:void 0;">
                                启用
                            </a>
                            <a class="btn"
                                href="javascript:void 0;">
                                停用
                            </a>
                            <a class="btn" 
                                href="javascript:void 0;">
                                升级
                            </a>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="table_page">
                <el-pagination
                    :total="pageTotal"
                    :page-size="pageSize"
                    :page-sizes="[10,15,20]"
                    :current-page="currentPage"
                    layout="prev,pager,next,jumper,sizes,total"
                    background></el-pagination>
            </div>
        </div>        
    </div>
</template>

<script>
import vueZtree from "@/components/zTree/vue-ztree";
export default {
    name: "Bracelet",
    components: {
        vueZtree
    },
    data() {
        return {
            companyList:[//公司列表
                {
                    label:'公司一',
                    value:'123'
                },{
                    label:'公司二',
                    value:'321'
                }
            ],
            companyName:null,//选择的公司
            menuZtree: [//树形菜单
                {
                    id: '1',
                    name: "全部(1000)",
                    iconClass: "iconClassRoot",
                    open: true,
                    children: [
                        {
                            id: '1-1',
                            name: "一号教学楼",
                            clickNode: true,
                            iconClass: "iconClassNode",
                            children:[
                                {
                                    id: '1-1-1',
                                    name: '一楼办公室'
                                },{
                                    id: '1-1-2',
                                    name: '二楼办公室'
                                },{
                                    id: '1-1-3',
                                    name: '三楼办公室'
                                }
                            ]
                        },
                        {
                            id: '1-2',
                            name: "二号大厅",
                            iconClass: "iconClassNode"
                        },
                        {
                            id: '1-3',
                            name: "三楼办公司",
                            iconClass: "iconClassNode"
                        }
                    ]
                },{
                    id: '2',
                    name: "全部(1000)",
                    iconClass: "iconClassRoot",
                    open: true,
                    children: [
                        {
                            id: '2-1',
                            name: "一号教学楼",
                            iconClass: "iconClassNode"
                        },
                        {
                            id: '2-2',
                            name: "二号大厅",
                            iconClass: "iconClassNode"
                        },
                        {
                            id: '2-3',
                            name: "三楼办公司",
                            iconClass: "iconClassNode"
                        }
                    ]
                }
            ],
            tableSize:'medium',
            pageSize:10,//每页显示多少条
            currentPage:1,//当前页
            pageTotal:1000,//总记录数            
            deviceState:[
                {
                    id:1231354646,
                    state: true,
                    name: 'BR00001',
                    xinghao:'h21231',
                    date:'2017-11-11',
                    space:'预留位置'
                },{
                    id:1231354646,
                    state: false,
                    name: 'BR00001',
                    xinghao:'h21231',
                    date:'2017-11-11',
                    space:'预留位置'
                }
            ]
        };
    },
    filters:{
        onOrOffLine(state){
            return state ? '在线' : '离线';
        }
    },
    methods: {
        nodeClick() {
            console.log(123);
        }
    }
};
</script>

<style lang="scss">
@import "../../../../style/mixin.scss";
    .el-select-dropdown{
        &.company_name{
            border-radius: 0px;
        }        
    }
    .bracelet_container{
        flex: 1;
        @include flex;
        .left_menu{
            width: 218px;
            border-right: 2px solid #e2e2e2;
            .el-input__inner{
                border-radius: 0px;
            }
            .company_select{
                width: 100%;
                @include flex;
                padding: 20px 0px 12px;                
                justify-content: center;                                
            }
            .search_input{
                padding: 0px 8.5px;
            }
            .ztree_menu{
                width: 100%;
            }
        }
        .right_table{
            flex: 1;
            @include flex(column);
            .state_icon{
                height: 115px;
                @include flex;
                justify-content: center;
                .state_item{
                    width: 355px;
                    color: #000;
                    .icon{
                        height: 70px;
                        @include flex;
                        position: relative;
                        align-items: center;
                        justify-content: center;                        
                    }
                    .state_title{
                        margin-top: -5px;
                        text-align: center;
                    }
                    .state_num{
                        text-align: center;
                    }                    
                    &:first-child{                        
                        .iconfont{
                            color: #42ac89;
                        }
                        .icon-true{
                            font-size: 40px;
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform: translate(-60%,-40%);
                        }
                        .icon-cloud{
                            font-size: 95px;
                        }
                    }
                    &:nth-child(2){
                        .iconfont{
                            font-size: 85px;
                            color: #939393;
                        }                        
                    }
                    &:last-child{                        
                        .iconfont{
                            font-size: 65px;
                            color: #ff5050;
                        }
                        .state_serious{
                            span{
                                color: #f00;
                            }
                        }
                        .state_commonly{
                            span{
                                color: #fe5a00;
                            }
                        }
                    }
                }                
            }
            .operation_area{
                height: 43px;
                @include flex;
                align-items: center;
                padding-left: 20px;
                border-top: 1px solid #e2e2e2;
                a{
                    color: #909399;
                    padding: 0px 20px;
                    &:hover{
                        color: #42ac89;
                    }
                    .iconfont{
                        font-size: 22px;
                        &.icon-delete{
                            font-size: 21px;
                        }
                        &.icon-set{
                            font-size: 23px;
                        }
                    }
                    &:first-child{
                        .iconfont{
                            transform: rotate(90deg);
                        }
                    }
                }                
            }
            .table_content{
                flex: 1;
                border-top: 1px solid #e2e2e2;  
                .el-table th{
                    &:after{
                        width: 1px;
                        content: '';
                        position: absolute;
                        right: 0px;
                        top: 13px;
                        bottom: 13px;
                        background-color: #e2e2e2;
                    }
                }
                .online{
                    color: #42ac89;
                }
                .btn{
                    color: #606266;
                    padding: 0px 10px;
                    position: relative;
                    &:after{
                        width: 1px;
                        content:'';
                        position: absolute;
                        right: 0px;
                        top: 3px;
                        bottom: 3px;
                        background-color: #606266;
                    }
                    &:last-child{
                        &:after{
                            display: none;
                        }
                    }
                }
            }
            .table_page{
                height: 50px;
                @include flex;
                align-items: center;
                border-top: 1px solid #e2e2e2;
                .el-pagination{
                    flex: 1;
                    .el-pagination__sizes{
                        margin-left: 24px;
                    }
                    .el-pagination__total{
                        float: right;
                    }
                }
            }
        }
    }
</style>
