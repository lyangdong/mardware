<!--Author: wang sheng 登录页面-->
<template>
    <div class="container">
        <headTop/>
        <banner/>
        <div class="symbol_container global_container">
            <el-col :span="13">
                <h3 class="symbol_msg">系统公告：</h3>
                <div class="symbol_main">
                    <el-col :span="18">
                        <ul class="symbol_list">
                            <li 
                                v-for="item in symbolMsgs" 
                                :key="item" 
                                class="symbol_item">
                                {{item}}
                                <small class="iconfont icon-new"></small>
                            </li>
                        </ul> 
                    </el-col>
                    <el-col :span="6">
                        <a href="javascript:void 0;" class="more_symbol">查看更多>></a>
                    </el-col>
                </div>                
            </el-col>
            <el-col :span="11">
                <transition name="fade" mode="out-in">
                    <router-view/>
                </transition>
            </el-col>                                   
        </div>
        <div class="global_container clear">
            <el-col :span="24">
                <div class="summary">
                    <h3 class="summary_title">{{summaryTitle}}</h3>
                    <p class="summary_content">{{summaryContent}}</p>
                </div>
            </el-col>
            <el-col :span="24" class="device_menu_list clear">
                <el-col 
                    :span="6"                     
                    :key="item.title" 
                    class="device_item"
                    :class="{active:idx === deviceIdx}"
                    v-for="(item,idx) in devices">
                    <small class="iconfont" :class="item.icon"></small>
                    <div class="title">{{item.title}}</div>                    
                </el-col>
            </el-col>            
        </div>
        <div class="device_list">

        </div>
        <el-main>            
            <div class="product_title">顺势为硬件产品成果展示</div>            
        </el-main>
        <el-container class="product_list">
            <div class="global_container">
                <el-col :span="6">
                    <img src="../../assets/images/product_01.png" alt="顺势为硬件产品展示">
                </el-col>
                <el-col :span="6">
                    <img src="../../assets/images/product_02.png" alt="顺势为硬件产品展示">
                </el-col>
                <el-col :span="6">
                    <img src="../../assets/images/product_01.png" alt="顺势为硬件产品展示">
                </el-col>
                <el-col :span="6">
                    <img src="../../assets/images/product_02.png" alt="顺势为硬件产品展示">
                </el-col>
            </div>
        </el-container>
        <el-footer>
            <Footer/>
        </el-footer>                 
    </div>
</template>

<script>
import banner from './bannner'
import headTop from '@/components/header/head'
import Footer from '@/components/footer/footer'


export default {
    name: 'UserSignPage',
    data(){
        return {
            symbolMsgs : ['最新消息......0','最新消息......1'],
            summaryTitle: '中国领先的、智能的、全面的护童产品',
            summaryContent: '科技、智慧、教育、关注、未来的顺势为产品，助力师长、呵护宝贝',
            deviceIdx : 0,
            devices:[
                {
                    icon : 'icon-chart',
                    title : '设备总览'
                },{
                    icon : 'icon-watch',
                    title: '智能手环01'
                },{
                    icon : 'icon-watch',
                    title: '智能手环02'
                },{
                    icon : 'icon-watch',
                    title: '智能手环03'
                }
            ]
        }
    },
    components : {
        headTop,
        banner,
        Footer,
    }
}
</script>

<style lang="scss" scoped>
    .fade-enter-active, .fade-leave-active {
	  	transition: opacity .1s;
	}
	.fade-enter, .fade-leave-active {
	  	opacity: 0;
	}
    .container{
        flex: 1;
        .symbol_container{
            height: 170px;
            padding-top: 30px;
            position: relative;
            .symbol_msg{
                color: #717171;
                font-size: 24px;
                letter-spacing: 3px;
                margin-bottom: 14px;
            }
            .symbol_main{                
                overflow: hidden;
                position: relative;
                padding: 8px 10px 8px 45px;
                border: 1.5px solid #848484;
                .symbol_list{
                    .symbol_item{
                        color: #717171;
                        font-size: 15px;
                        padding: 8px 0px;
                        cursor: pointer;
                        position: relative;                        
                        list-style-type: disc;
                        .iconfont{
                            top: 50%;
                            right: 0px;
                            color: #ff4310;
                            font-size: 25px;
                            position: absolute;                                                     
                            transform: translateY(-50%);
                        }
                    }
                }                                        
                .more_symbol{
                    color: #717171;
                    font-size: 15px;
                    position: absolute;
                    right: 10px;
                    bottom: 16px;
                    &:hover{
                        color: #164888;
                    }
                }                                
            }                       
        }
        .summary{
            color: #32393f;                
            padding-top: 75px;
            text-align: center;
            .summary_title{
                font-size: 26px;
                margin-bottom: 30px;
            }
            .summary_content{
                font-size: 18px;
            }
        }
        .device_menu_list{
            height: 200px;
            text-align: center;
            padding-top: 40px;
            .device_item{
                padding: 30px 0px;
                &.active{
                    color: #164888;
                    position: relative;
                    &:after{
                        width: 0px;
                        height: 0px;
                        content: '';
                        border: {
                            style :solid;
                            width : 10px;
                            top :{
                                color: #f5f5f5
                            };
                            left : {
                                color: #f5f5f5
                            };
                            right: {
                                color: transparent;
                            };
                            bottom: {
                                color: transparent;
                            }
                        };                        
                        position: absolute;
                        bottom: -16px;
                        left: 50%;
                        transform: rotate(45deg) translateX(-50%);                        
                    }
                }
                .iconfont{
                    font-size: 66px;
                }
                .title{
                    font-size: 16px;
                    padding-top: 8px;
                } 
            }            
        }
        .device_list{
            height: 320px;
            background-color: #f5f5f5;
        }
        .product_title{
            color: #32393f;
            font-size: 28px;
            text-align: center;
            letter-spacing: 1px;
            padding: 20px 0px;
            margin-top: 60px;
        }
        .product_list{
            height: 365px;
            background: #383d41;
        } 
    }
</style>
