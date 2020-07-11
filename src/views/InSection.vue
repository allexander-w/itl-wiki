<template>
    <div class="insection-wrapper">
        <h3 class="insec-title">
            {{$router.currentRoute.query.id}}
        </h3>
        

        <div class="works-wrapper">
            <div
                class="work-item"
                v-for = '(document, ind) in documents'
                :key = 'ind'
                @click="pushInDoc(document.id)"
            >
                <i class="far fa-file-alt work-doc-icon"></i>
                <div class="work-info-content">
                    <p class="work-title">{{document.title}}</p>
                    <div class="information-about-work">
                        <p class="work-author work-info-p">Автор: <span class="work-author-value work-info-span">{{document.author}}</span></p>
                        <p class="work-added work-info-p">Добавлено: <span class="work-info-span">{{document.date}}</span></p>
                    </div>
                </div>
            </div>
        </div>
        
        <Loader v-show='load' />
    </div>
</template>

<script>
import Loader from '@/components/Loader'

export default {
    data: ()=> ({
        documents: [],
        load: false
    }),
    components: {
        Loader
    },
    async mounted(){

        const sectionName = this.$router.currentRoute.query.id
        
        this.load = true
        this.documents = await this.$store.dispatch('IN_SECTION', sectionName)
        this.load = false     
    },
    methods: {
        async pushInDoc(docID) {
            const id = this.$router.currentRoute.params.secid
            const sectionName = this.$router.currentRoute.query.id
            this.$router.push({
                path: `/account/works/${id}/${docID}`,
                query: { sectionName }
            })
        }
    }
    
}
</script>

<style lang="scss">
.insec-title {
    font-size: 24px;
    color: #383838;
    font-weight: 400;
    margin-top: 50px;
}

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