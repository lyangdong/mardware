<!--Author wangshegn 版权信息-->
<template>
    <footer class="footer_container">
        <div class="global_container">
            <ul class="footer_link_list">
                <li v-for="item in linkList" :key="item.link" class="link_item">
                    <a :href="item.link">{{item.text}}</a>
                </li>
            </ul>
            <p class="copyRight">{{copyRight}}</p>
        </div>
    </footer>    
</template>

<script>
    export default {
        name : 'Footer',
        data(){
            return {
                linkList : [
                    {
                        text : '顺势为官网',
                        link : 'www.baidu.com'
                    },{
                        text : '法律声明',
                        link : 'fanyi.baidu.com'
                    },{
                        text : '隐私保护',
                        link : 'www.sina.com'
                    }
                ],
                copyRight : '版权所有：Copyright @SHUNSHIWEI，Ted。2017粤ICP备14013597'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .footer_container{
        width: 100%;
        height: 180px;
        position: relative;
        .footer_link_list{
            position: absolute;
            left: 50%;
            top: 100px;
            transform: translateX(-50%);
            .link_item{
                float: left;
                padding: 0px 15px;
                position: relative;
                &:after{
                    width: 1px;
                    content: '';
                    position: absolute;
                    top: 5px;
                    right: 0px;
                    bottom: 5px;
                    background-color: #383d41;
                }
                &:last-child::after{
                    display: none;
                }
                a{
                    color: #383d41;
                    font-size: 15px;
                }
            }
        }
        .copyRight{
            color: #383d41;
            font-size: 14px;
            text-align: center;
            position: absolute;
            left: 50%;
            bottom: 28px;
            user-select: none;
            transform: translateX(-50%);
        }
    }
</style>
