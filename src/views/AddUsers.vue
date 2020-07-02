<template>
  <div class="add-users">
    <HeaderBreadCr />
    <form class='registration create-company' @submit.prevent="submitHandler">
      <div class="create-form-item">
         <input placeholder="Введите адреса пользователей через пробел или запятую" v-model="formData.email" type="text" class="reg-input reg-user">
         <p class='create-error'>Поле не должно быть пустым</p>
      </div>
      
      <Select 
        :options = 'options'
        @selectedOption = 'selectedOption'
      />

      <p class="add-roots">
          Нажимая кнопку «Пригласить пользователей» вы принимаете Условия обслуживания в отношении продуктов ITL и соглашаетесь с Политикой конфиденциальности.
      </p>

      <button class="reg-btn" type="submit">Пригласить пользователей</button>
      <button class="skip-btn" @click = 'skip'>Пропустить</button>
      
    </form>
  </div>
</template>

<script>
import HeaderBreadCr from '@/components/HeaderBreadCr'
import Select from '@/components/Select'

export default {
  name: 'Home',
  data() {
     return {
         options: [
             {id: 1, role: 'Пользователь'},
             {id: 2, role: 'Модератор'},
             {id: 3, role: 'Администратор'}
         ],
         selectedElement: '',
         formData: {
           email: ''
         }
     } 
  },
  components: {
    HeaderBreadCr, Select
  },
  methods: {
    submitHandler(){
        const formData = { 
            role: this.selectedElement,
            email: this.formData.email
        }
        console.log(formData)
        

      this.$router.push ('/account')
    },
    skip (){
      this.$router.push ('/account')
    },
    selectedOption (data) {
        this.selectedElement = data
    }
  }
}
</script>


<style lang="scss" scoped>
.skip-btn {
    width: 137px;
    height: 52px;
    border-radius: 2px;
    border: solid 1px #9dbbe4;
    outline: none;
    font-size: 14px;
    color: #0b55bb;
    cursor: pointer;

    transition: .5s;
      &:hover {
         background-color: #0f5bc5;
         border: none;
         color: #fff;
      }
}
.add-roots {
    max-width: 390px;
    font-size: 11px;
    line-height: 1.64;
    padding: 50px 0;
}
.select-item {
  padding: 15px 10px;
  cursor: pointer;
}
.registration {
  margin-top: 100px;
}
.select-user {
    width: 390px;
    border-bottom: 1px solid grey;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}
.reg-btn {
  width: 240px;
  height: 52px;
  border-radius: 2px;
  background-color: #0e65dd;
  border: none;
  outline: none;
  margin-right: 25px;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  transition: .5s;

  &:hover {
    background-color: #0f5bc5;
  }
}
.create-error {
  font-size: 13px;
  padding-left: 10px;
  padding-top: 10px;
  color: #d0021b;
}
.registration-license {
  font-size: 11px;
  line-height: 1.64;
  color: #999999;
  max-width: 380px;
  
}
.create-form-item {
    margin-bottom: 40px;
}

.reg-input {
  outline: none;
  border: none;
  border-bottom: 1px solid #d8d8d8;
  width: 720px;
  height: 50px;
  padding: 0 10px;

  font-size: 20px;
  color: #383838;

  &::-webkit-input-placeholder {
    font-size: 20px;
    color: #999999;
  }
  &:focus {
    border-bottom: 1px solid #0e65dd;
  }

  &-f {
    &::-webkit-input-placeholder {
      font-size: 20px;
      color: #999999;
    }

    &:focus {
      border-bottom: 1px solid #0e65dd;
    }
    font-size: 20px;
    color: #383838;
    padding: 0 10px;
    margin-bottom: 40px;
    outline: none;
    border: none;
    border-bottom: 1px solid #d8d8d8;
    width: 185px;
    height: 50px;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}
.company-domen{
  width: 320px;
}
.reg-domen {
    color: #383838;
    font-size: 20px;
}
</style>