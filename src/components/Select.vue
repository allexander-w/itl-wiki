<template>
    <div class="select">
        <div class="select-choosed" @click = 'isOpen = !isOpen'>
           <p class="select-choosed-value"> {{ selectedEl }} </p>
        </div>
        <div class="select-nochoosed" v-show="isOpen">
            <ul>
                <li 
                 class="select-options"
                 v-for='(option, index) in options'
                 :key='index'
                 @click = 'chooseOption(option)'
                >{{option.role}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            selectedEl: 'Пользователь',
            isOpen: false
        }
    },
    methods: {
        chooseOption(option){
            this.selectedEl = option.role
            this.$emit('selectedOption', this.selectedEl)
            this.isOpen = false
        }
    }
}
</script>

<style lang="scss">
.select-nochoosed {
    width: 390px;
    min-height: 102px;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.08);
}
.select-options {
    padding: 10px 20px;
    cursor: pointer;
    font-size: 20px;
    color: #383838;
    &:hover{
        color: #0b55bb;
    }
}
.select-choosed {
    cursor: pointer;
    width: 390px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #d8d8d8;
}
.select-choosed-value {
    padding-left: 10px;
    font-size: 20px;
    color: #383838;
}
</style>