<template>
    <div class="works">
        <p class="main-title works-title">
            Мои работы
        </p>
        <div class="works-wrapper" v-if='ALL_WORKS.length'>
            <div
                class="work-item"
                v-for = '(work, ind) in ALL_WORKS'
                :key = 'ind'
                @click="getWorkId(work.title)"
            >
                <i class="far fa-folder work-doc-icon"></i>
                <div class="work-info-content">
                    <p class="work-title">{{work.title}}</p>
                </div>
            </div>
        </div>
        <div class="works-no-works" v-else>
            Похоже у вас нет активных работ!
        </div>

        <Loader v-show="load" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '@/components/Loader'
export default {
    data: () => ({
        content: '',
        load: false
    }),
    computed: {
        ...mapGetters(['ALL_WORKS'])
    },
    components: {
        Loader
    },
    async mounted(){
        this.load = true
        await this.$store.dispatch('WORKS')
        this.load = false
    },
    methods: {
        async getWorkId(id){
            try {
                const secID = await this.$store.dispatch('GET_SECTION_ID', id)
                this.$router.push({ 
                    path: `/account/works/${secID}`, 
                    query: { id }
                })
            } catch (e) {}
        }
    }
}

</script>

<style lang="scss">
.works-title {
    margin: 50px 0 35px 0;
}
.work-doc-icon {
    font-size: 32px;
    color: #0e65dd;
    margin-right: 15px;
}
.work-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    margin-left: -20px;
    transition: .3s;
    &:hover {
        border-radius: 3px;
        background-color: rgba(#0e5ac5, .05);
    }
}
.work-title {
    font-size: 14px;
    color: #0b55bb;
}
.information-about-work {
    display: flex;
}
.work-info-p {
    font-size: 12px;
    color: #383838;
    &:not(:last-child) {
        margin-right: 12px;
    }
}
.work-info-span {
    color: #999999;
}
</style>