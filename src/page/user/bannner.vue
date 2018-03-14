<!--Author: wang sheng banner-->
<template>
    <el-container>
        <div class="banner_container">
            <el-carousel :height="bannerHeight">
                <el-carousel-item v-for="item in imgs" :key="item">
                    <img src="../../assets/images/bannner_01.png" alt="item"/>
                </el-carousel-item>
            </el-carousel>
        </div>
    </el-container>
</template>

<script>
    export default {
        name: 'banner',
        data(){
            return {
                imgs:['../../assets/images/bannner_01.png']
            }
        },
        computed:{
            bannerHeight : function(){
                const clientWidth = document.body.clientWidth || document.documentElement.clientWidth;
                return clientWidth*47/192+'px';
            }
        }
    }
</script>


<style lang="scss" scoped>
    .banner_container{
        width: 100%;
        img{
            width: 100%;
            height: 100%;
        }
    }
</style>
