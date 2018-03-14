<!--Author wangsheng-->
<template>
    <div class="activation_box">
        <div class="box_title">
            <span class="title">设备激活</span>
            <span class="close" @click="switchPopComponent">
                <i class="el-icon-close"/>
            </span>
        </div>
        <div class="box_main">
            <ul class="title_list">
                <li v-for="item in deviceData.title" :key="item" class="title_item">{{item}}</li>
            </ul>
            <ul class="input_list clear">
                <li v-for="(item,index) in deviceData.data" :key="index" class="input_item">
                    <div class="item_box">
                        <el-input
                            size="mini" 
                            type="text"
                            v-model="item.serialNo"
                            :clearable="showClear"
                            style="border-radius:none;"
                            placeholder="请输入序列号"/>
                    </div>
                    <div class="item_box">
                        <el-select
                            size="mini"
                            v-model="item.code"
                            :clearable="showClear"
                            placeholder="请选择激活码"/>
                    </div>
                    <div class="item_box">
                        <el-select 
                            size="mini"
                            v-model="item.group"
                            :clearable="showClear"
                            placeholder="请选择分组"/>
                    </div>
                    <div class="item_box">
                        <i class="el-icon-circle-close-outline icon"></i>
                        <i class="el-icon-circle-plus-outline icon"
                            @click="addActivationData" 
                            v-if="index === deviceData.data.length-1"></i>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name : 'ActivationBox',
        data(){
            return {
                showClear : true,
                deviceData : {
                    title : ['序列号','激活码','所属组',''],
                    data : [
                        {                    
                            code : '',
                            group : '',
                            serialNo : ''
                        }
                    ]
                }
            }            
        },
        methods : {
            switchPopComponent(){//显示隐藏弹出框
            console.log(123)
                this.$emit('isShowPop');
            },
            addActivationData(){
                console.log(123)
                this.deviceData.data.unshift({
                    code : '',
                    group : '',
                    serialNo : ''
                });
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../../style/mixin";
    .activation_box{
        @include wh(100%,100%);
        @include flex(column);
        .box_title{
            @include wh(100%,40px);
            padding: 0px 15px 0px 30px;
            @include font(17px,40px,#fff);
            background-color: #42ac89;
            .title{
                float: left;
            }
            .close{
                float: right;
                cursor: pointer;
            }
        }
        .box_main{
            flex: 1;
            @include flex(column);
            .title_list{
                text-align: center;
                user-select: none;
                @include wh(100%,35px);
                border-bottom: 2px solid #e2e2e2;
                .title_item{
                    float: left;
                    width: 30%;                
                    position: relative;
                    font-weight: 600;
                    @include font(16px,33px);
                    &::after{
                        width: 1px;
                        content: '';
                        position: absolute;
                        right: 0px;
                        top: 8px;
                        bottom: 8px;
                        background-color: #e2e2e2;
                    }
                    &:last-child{
                        width: 10%;
                        &::after{
                            display: none;
                        }
                    }
                    &:nth-child(3){
                        &::after{
                            display: none;
                        }
                    }
                }
            }
            .input_list{
                flex: 1;
                overflow: auto;
                .input_item{                
                    .item_box{
                        float: left;
                        padding: 5px 10px;
                        @include wh(30%,100%);
                        &:last-child{   
                            @include flex;
                            align-items: center;                         
                            @include wh(10%,38px);                                                    
                            .icon{
                                color: #555;
                                font-size: 20px;
                                padding: 0px 2px;
                                cursor: pointer;
                                &:hover{
                                    color: #42ac89;
                                }
                            }
                        }
                        .el-input__inner{
                            border-radius: 0px;
                        }                                        
                    }                
                }
            }
        }
        
    }
</style>

