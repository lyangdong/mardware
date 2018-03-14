<!--Author wangsheng-->
<template>
    <ul class="my_device_independent_container clear">
        <li class="device_independent_item">
            <div class="device_img">
                <img src="../../../../assets/images/device.png" alt="">
            </div>
            <div class="device_info">
                <div class="device_name">电子班排机</div>
                <div class="device_model">型号：sw002</div>
                <div class="device_right">
                    <p class="title">是否授权：</p>
                    <div class="btns">
                        <a href="javascript:void 0;">未授权</a>
                        <a href="javascript:void 0;">现在申请</a>
                    </div>                    
                </div>
            </div>
        </li>
        <li class="device_independent_item">
            <div class="device_img">
                <img src="../../../../assets/images/device.png" alt="">
            </div>
            <div class="device_info">
                <div class="device_name">电子班排机</div>
                <div class="device_model">型号：sw002</div>
                <div class="device_right">
                    <p class="title">是否授权：</p>
                    <div class="btns">
                        <a href="javascript:void 0;" class="active">已授权</a>
                    </div>                    
                </div>
            </div>
        </li>
        <li class="device_independent_item">
            <div class="device_img">
                <img src="../../../../assets/images/device.png" alt="">
            </div>
            <div class="device_info">
                <div class="device_name">电子班排机</div>
                <div class="device_model">型号：sw002</div>
                <div class="device_right">
                    <p class="title">是否授权：</p>
                    <div class="btns">
                        <a href="javascript:void 0;">未授权</a>
                        <a href="javascript:void 0;">现在申请</a>
                    </div>                    
                </div>
            </div>
        </li>
        <li class="device_independent_item">
            <div class="device_img">
                <img src="../../../../assets/images/device.png" alt="">
            </div>
            <div class="device_info">
                <div class="device_name">电子班排机</div>
                <div class="device_model">型号：sw002</div>
                <div class="device_right">
                    <p class="title">是否授权：</p>
                    <div class="btns">
                        <a href="javascript:void 0;" class="active">已授权</a>
                    </div>                    
                </div>
            </div>
        </li>
        <li class="device_independent_item">
            <div class="device_img">
                <img src="../../../../assets/images/device.png" alt="">
            </div>
            <div class="device_info">
                <div class="device_name">电子班排机</div>
                <div class="device_model">型号：sw002</div>
                <div class="device_right">
                    <p class="title">是否授权：</p>
                    <div class="btns">
                        <a href="javascript:void 0;">未授权</a>
                        <a href="javascript:void 0;">现在申请</a>
                    </div>                    
                </div>
            </div>
        </li>
        <li class="device_independent_item">
            <div class="device_img">
                <img src="../../../../assets/images/device.png" alt="">
            </div>
            <div class="device_info">
                <div class="device_name">电子班排机</div>
                <div class="device_model">型号：sw002</div>
                <div class="device_right">
                    <p class="title">是否授权：</p>
                    <div class="btns">
                        <a href="javascript:void 0;" class="active">已授权</a>
                    </div>                    
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        name : 'MyDeviceIndependent',
        methods : {
            switchRouter(){
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../../style/mixin";
    .my_device_independent_container{
        padding: 30px 30px;
        overflow-y: auto;
        .device_independent_item{            
            float: left;
            width: 450px;
            height: 200px;
            @include flex;
            margin: 30px 30px;
            padding: 23px 15px 23px 20px;            
            border: 1px solid #d9d9d9;
            .device_img{
                @include wh(230px,100%);
                img{
                    @include wh(100%,100%);
                }
            }
            .device_info{
                flex: 1;
                @include flex(column);
                padding-left: 20px;
                .device_name{
                    font-size: 18px;
                    padding-bottom: 20px;
                }
                .device_model{
                    font-size: 15px;
                    padding-bottom: 30px;
                }
                .device_right{
                    flex: 1;
                    @include flex(column);
                    .title{
                        font-size: 16px;
                        padding-bottom: 10px;                  
                    }
                    .btns{                      
                        a{
                            width: 50%;
                            float: left;                            
                            font-size: 15px;
                            line-height: 24px;                                                
                            &:first-child{
                                color: #fff;
                                @include flex;                                
                                letter-spacing: 2px;                                
                                justify-content: space-around;                                
                                background-color: #939393;
                                &.active{
                                    background-color: #42ac97;
                                }
                            }
                            &:nth-child(2){
                                color: #164888;
                                text-align: right;
                                position: relative;
                                text-decoration: underline;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
