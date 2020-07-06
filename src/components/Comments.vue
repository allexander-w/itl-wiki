<template>
    <div class="cd-comments">
        <div class="comments-wrapper" 
            v-for='(comment,index) in comments'
            :key='index'
        >
            <div class="commentator-info">
                <div class="com-avatar">
                    <span>{{comment.initials}}</span>
                </div>
                <div class="com-info">
                    <p class="com-name">
                        {{comment.author}}
                    </p>
                    <p class="com-date">
                        {{comment.date}}
                    </p>
                </div>
            </div>

            <div class="cd-comment">
                <p class="comment-value">
                    {{comment.content}}
                </p>
                <div class="com-like-panel">
                    <i class="cd-like-icon fas fa-thumbs-up"></i> <span>Ответить</span> <span class="cd-delete" @click='deleteComment(comment.id)'>Удалить</span>
                </div>
            </div>

        </div>
        
        <div class="add-comment">
            <input type="text" v-model='content' placeholder="Добавить комментарий" class='add-com-input'>
            <button class="blue-button send-btn" @click='sendComment'>Отправить</button>
        </div>

        <Loader v-show='load' />
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Loader from '@/components/Loader'

export default {
    data(){
        return {
            fullName: '',
            initials: '',
            nowDate: '',
            content: '',
            load: false
        }
    },
    props: {
      documentId: {
          type: String,
          default: () => ''
      }
    },
    components: {
        Loader
    },
    computed: {
        ...mapGetters(['GET_CURRENT_USER_INFO', 'comments'])
    },
    methods: {
        async deleteComment(doc) {
            const data = {
                idDocument: this.documentId,
                idComment: doc
            }

            this.load = true
            await this.$store.dispatch('DELETE_COMMENT', data)
            this.load = false

        },
        getDate(){
            function getMonth(month) {
                if (month === '07') {
                    return 'июля'
                } else if (month === '08'){
                    return 'августа'
                }
            }
            const dateTime = new Date().toJSON().slice(11,16)
            const month = new Date().toJSON().slice(5,7)
            const day = new Date().toJSON().slice(8,10)
            const stringMonth = getMonth(month)

            const nowDate = `${day} ${stringMonth} ${dateTime}`
            this.nowDate = nowDate
        },
        async sendComment(){
            try {
                this.load = true
                await this.$store.dispatch('FETCH_INFO')
                this.fullName = `${this.GET_CURRENT_USER_INFO.name} ${this.GET_CURRENT_USER_INFO.surname}`
                const inN = this.GET_CURRENT_USER_INFO.name.slice(0,1)
                const inS = this.GET_CURRENT_USER_INFO.surname.slice(0,1)
                this.initials = `${inN}${inS}`

                this.getDate()

                const commentData = {
                    author: this.fullName,
                    initials: this.initials,
                    date: this.nowDate,
                    content: this.content,
                    documentId: this.documentId
                }
                
                
                await this.$store.dispatch('ADD_COMMENT', commentData)
                this.content = ''
                this.load = false
                
            } catch (e) { console.log('ERROR: ',e)}
        }
    }
}
</script>

<style lang="scss">
.comments-wrapper {
    margin-bottom: 30px;
}
.send-btn {
    min-width: 102px;
    height: 36px;
    padding: 0 5px;

    position: absolute;
    right: 0;
    top: 70px;
}
.add-com-input {
    width: 800px;
    padding: 20px;
    outline: none;
    border: none;

    border-bottom: 1px solid #e1ecfc;
}
.add-comment {
    margin: 50px 0 100px;
    width: 800px;
    position: relative;
}
.com-like-panel {
    span {
        font-size: 14px;
        color: #9dbbe4;
        cursor: pointer;
    }
}
.commentator-info {
    display: flex;
    align-items: center;
}
.com-name {
    font-size: 13px;
    color: #383838;
}
.com-date {
    font-size: 13px;
    color: #999999;
}
.comment-value {
    max-width: 750px;
    font-size: 14px;
    color: #4a4a4a;
    margin-bottom: 10px;
}
.cd-comment {
    margin-left: 55px;
    margin-top: 10px;
}
.com-avatar {
    margin-right: 15px;
    width: 40px;
    height: 40px;
    display: flex;
    background-color: #eef4fd;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    span {
        font-size: 16px;
        color: #0a4ca6;
    }
    
}
</style>