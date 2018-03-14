<!--Author wangsheng-->
<template>
    <div class="activation_container">
        <div class="activation_title">
            <i class="iconfont icon-refresh icon"></i>
            <i class="el-icon-circle-plus-outline icon" @click="showPop = true"></i>
            <i class="iconfont icon-import icon"></i>
            <div class="search_form">
                <el-input                    
                    type="text"
                    size="mini"
                    @focus="searchInputFocus"
                    suffix-icon="el-icon-search"
                    placeholder="序列号"/>
            </div>
        </div>
        <div class="activation_main">
            <el-table
                stripe
                size="medium"
                :data="activationData"
                style="width:100%;">
                <el-table-column 
                    label="类型"
                    prop="name"/>
                <el-table-column 
                    label="序列号"
                    prop="serialNo"/>
                <el-table-column 
                    label="激活码"
                    prop="code"/>
                <el-table-column 
                    label="所属分组"
                    prop="group"/>
                <el-table-column 
                    label="激活时间"
                    prop="time"/>
                <el-table-column/>
            </el-table>
        </div>
        <div class="popup_container" v-show="showPop">
            <ActivationBox @isShowPop="switchShowPop"/>
        </div>
        <div class="allcover" v-if="showPop"/>
    </div>
</template>

<script>
    import ActivationBox from './activationBox'
    export default {
        name : 'MyDeviceActivation',
        data(){
            return {
                showPop : true,
                activationData: [
                    {
                        name : '智能路由器',
                        serialNo : 'adsf124ae23adf',
                        code : '123asdf46adf546a',
                        group : '学校食堂',
                        time : '2018/12/12'
                    },
                    {
                        name : '智能路由器',
                        serialNo : 'adsf1afasde23adf',
                        code : '123asadfadf546a',
                        group : '学校食堂',
                        time : '2018/13/12'
                    }
                ]
            }
        },
        components : {
            ActivationBox,
        },
        methods : {
            switchShowPop(){
                this.showPop = !this.showPop;
            },
            searchInputFocus(that){
                console.log(that);
                this.changeBorderColor = true;
            }
        }
    }
</script>
<style lang="scss">
    @import "../../../../style/mixin";
    .activation_container{
        position: relative;
        @include wh(100%,100%);
        @include flex(column);
        .activation_title{
            padding-left: 5%;
            border-bottom: 2px solid #e2e2e2;
            @include wh(100%,50px);
            @include font(24px,50px);
            .icon{
                cursor: pointer;
                padding: 0px 5px;
            }
            .icon-refresh{
                padding: 0px;
                font-size: 21px;
                margin-right: -3.5px;
            }
            .icon-import{
                font-size: 21px;
            }
            .search_form{
                float: right;
                margin-right: 60px;
                @include flex;
                align-items: center;
                justify-content: center;
                @include wh(250px,100%);                
                .el-input__inner{
                    outline: none;
                    border-radius: 0px;                    
                }
                .el-icon-search{
                    color: #42ac89;
                    font-size: 14px;
                }
            }
        }
        .activation_main{
            flex: 1;
            width: 100%;
            .el-table{
                &::before{
                    display: none;
                }
                td{
                    border-color: #e2e2e2;
                }
                thead{
                    .cell{
                        text-align: center;
                        position: relative;
                        &::after{
                            width: 2px;
                            content: '';
                            position: absolute;
                            right: 0px;
                            top: 3px;
                            bottom: 3px;
                            background-color: #e2e2e2;
                        }
                        &:last-child::after{
                            display: none;
                        }
                    }
                }
                tbody{
                    .cell{
                        text-align: center;
                    }
                }
            }
        }
        .popup_container{
            @include wh(700px,340px);
            @include hc;
            top: 20%;
            border-radius: 4px;
            overflow: hidden;
            z-index: 100;
            background-color: #fff;
            box-shadow: 0px 3px 3px 0px rgba($color: #000000, $alpha: .3)
        }
    }
</style>
