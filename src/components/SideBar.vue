<template>
    <div class="sidebar">
        <component :is='whatRender' /> 
    </div>
</template>

<script>
import SBHome from '@/components/sidebar/SBHome'
import SBAdd from '@/components/sidebar/SBAdd'
import SBSearch from '@/components/sidebar/SBSearch'
import SBNotifications from '@/components/sidebar/SBNotifications'
import SBSettings from '@/components/sidebar/SBSettings'
import SBInfo from '@/components/sidebar/SBInfo'
import SBUser from '@/components/sidebar/SBUser'

import {mapGetters} from 'vuex'
export default {
    name: 'Sidebar',
    components: {SBHome,SBAdd,SBSearch,SBUser,SBInfo,SBSettings,SBNotifications},
    computed: {
        ...mapGetters(['GET_COMPONENT']),
        whatRender(){
            return this.GET_COMPONENT
        }
    }
}
</script>

<style lang="scss">
.sidebar {
    margin-left: 100px;
    padding-left: 25px;
    padding-top: 50px;
    margin-right: 50px;
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    min-width: 300px;
    min-height: 100vh;
    background-color: rgba(#0e65dd, .07);

    overflow-y: auto;
    
}
</style>