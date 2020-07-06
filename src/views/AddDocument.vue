<template>
    <div class="add-doc">
        <div class="error-popup" v-if='$v.title.$dirty && !$v.title.required || $v.content.$dirty && !$v.content.required'>
            <i class="fas fa-exclamation-triangle err-icon"></i>
           <p class="error-text">Не указан заголовок или раздел</p>
        </div>
        <div class="add-doc-header">
            <div class="left-part">
                <div class="doc-unlock" v-click-outside='accessHide' @click='access = true'>
                    <i class="fas fa-unlock header-icon"></i> <span class="header-items-text">Доступ</span>
                    <div class="modal-doc modal-access" v-show='access'>
                        <input type="text" placeholder="Контакты" class="modal-doc-input">
                    </div>
                </div>
                <div class="doc-tags" v-click-outside='tagsHide' @click='tags = true'>
                    <i class="fas fa-tag header-icon"></i> <span class="header-items-text">Теги</span>
                    <div class="modal-doc modal-tags" v-show='tags'>
                        <input type="text" placeholder="Введите название тега" class="modal-doc-input">
                    </div>
                </div>
            </div>
            <div class="right-part">
                <button class="doc-btn publish-btn" @click="postContent">Опубиковать</button>
                <button class="cancel-btn" @click='cancel'>Отменить</button>
                <i class="fas fa-ellipsis-h doc-menu"></i>
            </div>
        </div>
        <div class="doc-main-content">
            <input type="text" v-model="title" class="header-input" placeholder="Заголовок статьи">
            <vue-editor v-model="content" class='doc-editor'></vue-editor>
        </div>
        
        <Loader v-show="load" />

    </div>
</template>

<script>

import ClickOutside from 'vue-click-outside'
import { VueEditor } from 'vue2-editor'
import {mapGetters} from 'vuex'
import { required } from 'vuelidate/lib/validators'
import Loader from '@/components/Loader'

export default {
    data: () => ({
        content: '',
        title: '',
        nowDate: '',
        authorName: '',
        authorSurname: '',
        access: false,
        tags: false,
        load: false
    }),
    validations: {
        content: {required},
        title: {required}
    },
    components: {
        VueEditor, Loader
    },
    computed: {
        ...mapGetters(['GET_CURRENT_USER_INFO'])
    },
    directives: {
     ClickOutside
    },
    methods: {
        tagsHide(){
            this.tags = false
        },
        accessHide(){
            this.access = false
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
       async postContent(){
            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            }

            this.getDate()

            try {
                this.load = true
                await this.$store.dispatch('FETCH_INFO')
                this.authorName = this.GET_CURRENT_USER_INFO.name
                this.authorSurname = this.GET_CURRENT_USER_INFO.surname
            } catch (e) {this.load = false}

            const author = `${this.authorSurname} ${this.authorName}`

            const documentData = {
                title: this.title,
                content: this.content,
                date: this.nowDate,
                author
            }
            
            try {
                await this.$store.dispatch('CREATE_DOCUMENT', documentData)
                this.load = false
                this.$router.push('/account/works')
            }catch (e) {this.load = false}
        },
        cancel(){
            alert ('Изменения не сохранятся, вы точно хотите выйти?')
            this.$router.push('/account/works')
        }
    }
}
</script>

<style lang="scss">
.doc-tags {
    position: relative;
    cursor: pointer;
}
.modal-doc {
    display: flex;
    align-items: center;
    width: 380px;
    min-height: 70px;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.08);
    top: 40px;
    position: absolute;
    z-index: 99;

    &-input{
        width: 380px;
        font-size: 14px;
        color: #383838;
        border: none;
        padding: 30px;
        outline: none;
        &::placeholder {
            color: #999999;
        }
    }
    
}
.err-icon {
    font-size: 18px;
    color: #d0021b;
    margin-right: 15px;
    margin-left: 40px;
}
.error-text {
    font-size: 14px;
    color: #d0021b;
}
.error-popup {
    height: 60px;
    display: flex;
    align-items: center;
    background-color: rgba(#d0021b, .06);
}
.doc-editor {
    margin-bottom: 100px;
}
.header-input {
    border: none;
    width: 1100px;
    padding: 20px 10px;
    outline: none;

    font-size: 24px;
    color: #383838;
    &::placeholder {
        font-size: 24px;
        color: #999999;
    }
}
.doc-main-content {
    width: 1100px;
    margin: 0 auto;
}
.doc-menu {
    margin-left: 15px;
    font-size: 20px;
    color: #0b55bb;
}
.doc-btn {
    min-width: 124px;
    height: 36px;
    border-radius: 2px;
    background-color: #0e65dd;
    font-size: 14px;
    cursor: pointer;
    outline: none;
    border: none;
    padding: 0 5px;
    color: #fff;
    transition: .5s;
    &:hover {
        background-color: #0e5cc9;
    }
}
.publish-btn {
    margin-right: 15px;
}
.cancel-btn {
    min-width: 95px;
    height: 36px;
    background-color: rgba(14, 101, 221, 0.04);
    border-radius: 2px;
    font-size: 14px;
    cursor: pointer;
    outline: none;
    border: none;
    padding: 0 5px;
    color: #0b55bb;
    transition: .5s;
    &:hover {
        background-color: rgba(14, 101, 221, 0.1);
    }
}
.header-icon {
    font-size: 14px;
    color: #0e65dd;
    margin-right: 12px;
}
.header-items-text {
    font-size: 14px;
    color: #383838;
}
.left-part {
    display: flex;
}
.doc-unlock {
    margin-right: 35px;
    cursor: pointer;
    position: relative;
}
.add-doc-header {
    display: flex;
    justify-content: space-between;
    height: 100px;
    align-items: center;
    margin: 0 35px;
}
</style>