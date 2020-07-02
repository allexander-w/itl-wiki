<template>
    <div class="default-layout">
        <Header />
        <router-view />
    </div>
</template>

<script>
import Header from '@/components/Header'

export default {
    components: {Header}
}
</script>

<style lang="scss">
.default-layout {
    display: flex;
}
</style>