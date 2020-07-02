<template>
  <div class="login">
    <HeaderBreadCr />
    <form class='registration' @submit.prevent="submitHandler">
      <div class="forms-wrapper">
        <div class="reg-from-item">
          <input 
            placeholder="Имя" 
            v-model="name" 
            type="text" 
            class="reg-input-f"
            :class = '{invalidClass: ($v.name.$dirty && !$v.name.required)}'
          >
          <p class="reg-error" v-if='$v.name.$dirty && !$v.name.required'>Не оставляйте поле пустым</p>
        </div>
        <div class="reg-from-item">
          <input 
            placeholder="Фамилия" 
            v-model="surname" 
            type="text" 
            class="reg-input-f reg-surname"
            :class = '{invalidClass: ($v.surname.$dirty && !$v.surname.required)}'
          >
          <p class="reg-error" v-if='$v.surname.$dirty && !$v.surname.required'>Не оставляйте поле пустым</p>
        </div>
      </div>

      <div class="reg-from-item">
        <input 
          placeholder="Email" 
          v-model="email" 
          type="text" 
          class="reg-input reg-email"
          :class = '{invalidClass: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}'  
        >
        <p class="reg-error" v-if='$v.email.$dirty && !$v.email.required'>Не оставляйте поле пустым</p>
        <p class="reg-error" v-else-if='$v.email.$dirty && !$v.email.email'>Введите корректный email</p>
      </div>
      <div class="reg-from-item">
       <input 
        placeholder="Пароль" 
        v-model="password" 
        type="password" 
        class="reg-input reg-password"
        :class = '{invalidClass: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}'  
 
      >
       <p class="reg-error" v-if = '$v.password.$dirty && !$v.password.required'>Не оставляйте поле пустым</p>
       <p class="reg-error" v-else-if = '$v.password.$dirty && !$v.password.minLength'>Минимальная длина пароля: 6 символов</p>
      </div>
      <div class="reg-from-item">
      <input 
        placeholder="Повторите пароль" 
        v-model='repeatPassword' 
        type="password" 
        class="reg-input reg-password-repeat"
        :class="{invalidClass: !isValidPass || ($v.repeatPassword.$dirty && !$v.repeatPassword.required)}"
        >
      <p class="reg-error" v-if = '!isValidPass'>Пароли не совпадают</p>
      </div>

      <p class="registration-license">Нажимая кнопку «Создать компанию» вы принимаете<router-link to='/'> Условия обслуживания </router-link> в отношении продуктов ITL и соглашаетесь с <router-link to='/'> Политикой конфиденциальности.</router-link></p>

      <button class="reg-btn" type="submit">Зарегистрироваться</button>
    </form>

    <Loader 
      v-show ='loading'
    />
  </div>
</template>

<script>
import HeaderBreadCr from '@/components/HeaderBreadCr'
import Loader from '@/components/Loader'
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  data: ()=> ({
      name: '',
      surname: '',
      email: '',
      password: '',
      repeatPassword: '',
      loading: false
  }),
  validations: {
    name: {required},
    surname: {required},
    email: {email, required},
    password: {required, minLength: minLength(6)},
    repeatPassword: {required}
  },
  computed: {
    isValidPass(){
      return this.$v.password.$model === this.$v.repeatPassword.$model
    }
  },
  name: 'Home',
  components: {
    HeaderBreadCr,Loader
  },
  methods: {
    async submitHandler(){
      if (this.$v.$invalid){
        this.$v.$touch()
        return
      }
      if(!this.isValidPass){
        return
      }

      const formData = { 
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password,
        role: 'Администратор'
      }
      
      try {
        this.loading = true
        await this.$store.dispatch('REGISTER', formData)
        this.loading = false
        this.$router.push ('/create-company')
      } catch (e) {}
      
    }
  }
}
</script>


<style lang="scss" scoped>
.registration {
  margin-top: 100px;
}
.reg-btn {
  width: 196px;
  height: 52px;
  border-radius: 2px;
  background-color: #0e65dd;
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  transition: .5s;

  &:hover {
    background-color: #0f5bc5;
  }
}
.registration-license {
  font-size: 11px;
  line-height: 1.64;
  color: #999999;
  max-width: 380px;
  margin-bottom: 40px;
}
.reg-password{
  &:focus {
    background-image: url('../assets/img/login/eye.svg');
    background-repeat: no-repeat;
    background-position: 350px 15px;
    background-size: 20px;
  }
  &-repeat {
    &:focus {
    background-image: url('../assets/img/login/eye.svg');
    background-repeat: no-repeat;
    background-position: 350px 15px;
    background-size: 20px;
  }
  }
}
.reg-input {
  outline: none;
  border: none;
  border-bottom: 1px solid #d8d8d8;
  width: 380px;
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
.reg-error {
  font-size: 13px;
  color: #d0021b;
  padding-top: 10px;
  padding-left: 10px;
}

.invalidClass {
    border-bottom: 1px solid red;
}
.reg-from-item {
  margin-bottom: 40px;
}
.forms-wrapper {
  display: flex;
  .reg-from-item {
    margin-right: 10px;
  }
}
</style>