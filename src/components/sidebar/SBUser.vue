<template>
    <div class="sidebar-user">
        <p class="sb-user-name">
            Профиль
        </p>

        <router-link 
            v-for='(menuItem,index) in menu'
            :key = 'index'
            :to='menuItem.route'
        >
            <div class="menu-item-wrapper active-link">
             <i class="sb-user-icon"
                :class="menuItem.icon"
             ></i> <span class="sb-user-profile">{{menuItem.title}}</span>
            </div>
        </router-link>

            <div class="menu-item-wrapper logout active-link" @click = 'logout'>
             <i class="fas fa-sign-out-alt sb-user-icon"></i> <span class="sb-user-profile">Выйти</span>
            </div>
        
    </div>
</template>

<script>
export default {
    data: ()=> ({
        menu: [
            {icon: 'fas fa-pencil-alt', title: 'Редактировать профиль', route: '/account/profile'},
            {icon: 'fas fa-redo-alt', title: 'Сменить компанию', route: '/account'}
        ]
    }),
    methods: {
        async logout() {
            try {
                await this.$store.dispatch('LOGOUT')
                this.$router.replace('/?message=logout')
            } catch (e){}
        }
    }
}
</script>

<style lang="scss">
.active-link {
    border-radius: 5px;
    transition: .2s;
    &:hover {
        background-color: rgba(#0e65dd, .1);
    }
}
.sb-user-name {
    font-size: 20px;
    color: #383838;
    padding-bottom: 30px;
    padding-left: 25px;
}
.sb-user {
    &-profile {
        font-size: 14px;
        color: #383838;
    }
    &-icon {
        color: #0e65dd;
        font-size: 22px;
        margin-right: 10px;
    }
}
.menu-item-wrapper {
    display: flex;
    padding-left: 25px;
    max-width: 250px;
    height: 50px;
    align-items: center;
}
.logout {
    cursor: pointer
}
</style>