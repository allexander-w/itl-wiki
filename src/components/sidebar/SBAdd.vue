<template>
    <div class="sidebar-add">
        <p class="main-title sb-add-title">
            Создать
        </p>

        <router-link 
            v-for='(menuItem,index) in menu'
            :key = 'index'
            :to='menuItem.route'
        >
            <div class="menu-item-wrapper active-link">
             <i class="sb-add-icon"
                :class="menuItem.icon"
             ></i> <span class="sb-add-profile">{{menuItem.title}}</span>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    data: ()=> ({
        menu: [
            {icon: 'far fa-file-alt', title: 'Статью', route: '/account/add-document'},
            {icon: 'far fa-folder', title: 'Раздел', route: '#'}
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
.sb-add-title {
    padding-left: 25px;
    padding-bottom: 30px;
}
.sb-add {
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