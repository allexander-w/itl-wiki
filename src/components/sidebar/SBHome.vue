<template>
    <div class="sidebar-home">
        <p class="main-title sb-home-title">
            Ваша компания
        </p>

        <router-link 
            v-for='(menuItem,index) in menu'
            :key = 'index'
            :to='menuItem.route'
        >
            <div class="menu-item-wrapper active-link">
             <i class="sb-home-icon"
                :class="menuItem.icon"
             ></i> <span class="sb-home-profile">{{menuItem.title}}</span>
            </div>
        </router-link>
    </div> 
</template>

<script>
export default {
    data: ()=> ({
        menu: [
            {icon: 'far fa-compass', title: 'Активность', route: '/account/activity'},
            {icon: 'far fa-file-alt', title: 'Ваши работы', route: '/account/works'},
            {icon: 'far fa-bookmark', title: 'Закладки', route: '/account/bookmarks'}
        ]
    })
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
.sb-home-title {
    padding-left: 25px;
    padding-bottom: 30px;
}
.sb-home {
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