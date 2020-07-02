<template>
    <div class="default-layout-def">
        <DefaultHeader class="header-main" />
        <SideBar class="sidebar-main" />
            <router-view />
    </div>
</template>

<script>
import DefaultHeader from '@/components/DefaultHeader'
import SideBar from '@/components/SideBar'

export default {
    name: 'defaultlayout',
    components: {DefaultHeader,SideBar}
}
</script>

<style lang="scss">
.default-layout-def {
    display: flex;
}
.header-main {
    position: fixed;
    left: 0;
}
</style>