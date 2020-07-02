<template>
    <div class="sign-in-login">
        <div class="breadcrumbs-login" v-if = 'loginOrSignIn'>
            <p class="brcr-value"><span class="reg brcr-active">Регистрация </span> > <span class="create" :class="{'brcr-active': createCompany }"> Создание компании </span> > <span class="add" :class="{'brcr-active': addUsers }">Добавление пользователей</span></p>
        </div>
        <div class="breadcrumbs-login" v-else>
            <p class="brcr-value"><span class="reg brcr-active">Авторизация</span> </p>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        loginOrSignIn(){
            if (this.$route.path === '/login') {
                return true
            } else if (this.$route.path === '/sign-in') {return false}
            else if (this.$route.path === '/create-company' || this.$route.path === '/create-company/add-users') {return true}
        },
        createCompany(){
            return this.$route.path === '/create-company' || this.$route.path === '/create-company/add-users'
        },
        addUsers(){
            return this.$route.path === '/create-company/add-users'
        }
    }
}
</script>

<style lang="scss">
.breadcrumbs-login {
    margin-top: 50px;
}
.brcr-value {
    font-size: 24px;
    color: #cccccc;
}
.brcr-active {
    color: #383838;
}
</style>