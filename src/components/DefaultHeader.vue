<template>
    
    <div class="default-header">
        <img class="default-header-logo" src="../assets/img/login/logo.png" alt="">
        
        <div class="def-header-container">
            <i 
                v-for ='(item,index) in homeBar'
                :key = 'index'
                class="nav-bar-button"
                :class="'fas fa-'+item.name"
                @click='sidebarChange(item)'
            ></i>
        </div>
        <div class="def-header-container">
            <i 
                v-for ='(item,index) in setBar'
                :key = 'index'
                class="nav-bar-button"
                :class="item.name"
                @click='sidebarChange(item)'
            ></i>
        </div>
    </div>
</template>

<script>
export default {
    data: ()=> ({
        homeBar: [
            {id: 1, name: 'home', component: 'SBHome'},
            {id: 2, name: 'plus', component: 'SBAdd'},
            {id: 3, name: 'search', component: 'SBSearch'}
        ],
        setBar: [
            {id: 1, name: 'fas fa-cog', component: 'SBSettings'},
            {id: 2, name: 'far fa-bell', component: 'SBNotifications'},
            {id: 3, name: 'far fa-question-circle', component: 'SBInfo'},
            {id: 4, name: 'far fa-user', component: 'SBUser'}
        ],
        isActive: false
    }),
    methods: {
        sidebarChange({component}) {
            this.$store.commit('CHANGE_COMPONENT', component)
            this.isActive = true
        }
    }
    
}
</script>

<style lang="scss">
.nav-bar-button {
    padding: 30px 0;
    width: 100px;
    text-align: center;
    cursor: pointer;
    color: #fff;
    &:hover {
        background-color: #0e5ac5;
    }
}
.default-header {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    width: 100px;
    min-height: 100vh;
    background-color: #0e65dd;
    &-logo {
        margin-top: 35px;
    }
}

</style>