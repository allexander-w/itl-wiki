<template>
    <div class="works">
        <div class="work-item"
            v-for = '(work, ind) in ALL_WORKS'
            :key = 'ind'
        >
            <h2>{{work.title}}</h2>
            <p>{{work.body}}</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['ALL_WORKS'])
    },
    async mounted(){
        try {
            await this.$store.dispatch('WORKS')
        } catch (e) { console.log(e) }
    }
}
</script>

<style lang="scss">
.work-item {
    margin-bottom: 50px;
}
</style>