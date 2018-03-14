<template>
    <div class="container">        
        <HeaderBar/>
        <FirstMenu/>
        <div class="home_router_container">
            <transition>
                <router-view/>
            </transition>
        </div>                               
    </div>    
</template>

<script>
    import HeaderBar from '@/components/header/headerBar'
    import FirstMenu from '@/components/menu/firstMenu'
    export default {
        name : 'HomePage',
        components : {
            HeaderBar,
            FirstMenu,
        }
    }    
</script>

<style lang="scss" scoped>
    .container{
        flex: 1;
        display: flex;
        overflow: hidden;
        flex-direction: column;
        .home_router_container{
            flex: 1;
            display: flex;
            overflow: hidden;
        }
    }
</style>
