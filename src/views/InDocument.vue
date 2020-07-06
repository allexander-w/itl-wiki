<template>
    <div class="document-information">
        <div class="current-doc-header">
            <Breadcrumbs />
            <div class="cd-header-btns">
                <button><i class="cd-icon fas fa-pencil-alt"></i></button>
                <button><i class="cd-icon fas fa-thumbtack"></i></button>
                <button><i class="cd-icon fas fa-unlock"></i></button>
                <button><i class="cd-icon fas fa-link"></i></button>
            </div>
        </div>
        <h3 class="cd-title">
            {{CURRENT_DOCUMENT.title}}
        </h3>
        <div class="cd-info">
            <p class="cd-author">Автор: <span>{{CURRENT_DOCUMENT.author}}</span></p>
            <p class="cd-date">Обновлено: <span>{{CURRENT_DOCUMENT.date}}</span></p>
        </div>
        
        <div class="content-in-doc" v-html="CURRENT_DOCUMENT.content"></div>

        <div class="cd-like">
            <i class="cd-like-icon fas fa-thumbs-up"></i> <span>Нравится</span>
        </div>

        <Comments :documentId = 'CURRENT_DOCUMENT.id' />

        <Loader v-show='load' />
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Breadcrumbs from '@/components/Breadcrumbs'
import Loader from '@/components/Loader'
import Comments from '@/components/Comments'

export default {
    data: ()=> ({
        load: false
    }),
    computed: {
        ...mapGetters (['CURRENT_DOCUMENT'])
    },
    components: {
        Breadcrumbs,Loader,Comments
    },
    async mounted(){
        const id = this.$router.currentRoute.params.id
        this.load = true
        try {
            await this.$store.dispatch('IN_DOCUMENT', id)
            await this.$store.dispatch('GET_COMMENTS', id)
            this.load = false
            
        } catch (e) {this.load = false}
    }
}
</script>

<style lang="scss">
.cd-like {
    margin: 50px 0 65px;
    cursor: pointer;
    &-icon {
        font-size: 18px;
        color: #0e65dd;
    }
    span {
        font-size: 13px;
        color: #383838;
    }
}
.content-in-doc {
    max-width: 850px;
}
.cd-author {
    margin-right: 15px;
}
.cd-title {
    font-size: 24px;
    color: #383838;
    font-weight: 400;
    margin-top: 50px;
}
.cd-info {
    display: flex;
    margin: 10px 0 30px;
    p{
        font-size: 13px;
        color: #999999;
    }
    span {
        color: #4a4a4a;
    }
}
.cd-icon {
    font-size: 18px;
    color: #0e65dd;
}
.current-doc-header {
    margin-top: 50px;
    width: 850px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
        width: 34px;
        height: 34px;
        border-radius: 3px;
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        transition: .5s;

        &:hover {
            background-color: #eef4fd;
        }

        &:not(:last-child){
            margin-right: 15px;
        }
    }
}

</style>