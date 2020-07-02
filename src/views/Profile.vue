<template>
    <div class="profile">
        <Breadcrumbs />
        <h3 class="main-title profile-title">Личные данные</h3>
        <ProfileForms />
    </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import ProfileForms from '@/components/ProfileForms'
export default {
    name: 'Profile',
    components: {
        Breadcrumbs,ProfileForms
    }
}
</script>

<style lang="scss">
.profile{
    padding-top: 50px;
    &-title{
        padding: 30px 0;
    }
}
</style>