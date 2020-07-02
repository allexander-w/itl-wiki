<template>
  <div class="sign-in">
    <HeaderBreadCr />
    <form class='registration' @submit.prevent="submitHandler">
      <div class="singin-field">
        <input
          placeholder="Email" 
          v-model = 'email' 
          type="text" 
          class="reg-input"
          :class = '{invalidClass: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}'
        >
        <p class="sign-error" v-if="$v.email.$dirty && !$v.email.email">Введите корректный емайл</p>
        <p class="sign-error" v-else-if="$v.email.$dirty && !$v.email.required">Поле не должно быть пустым</p>
       </div>

       <div class="singin-field">
        <input 
          placeholder="Пароль" 
          type="password" 
          class="reg-input reg-password"
          v-model.trim='password'
          :class='{invalidClass: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}'
        >
        <p class="sign-error" v-if='$v.password.$dirty && !$v.password.minLength'>Минимальная длина пароля: 6 символов</p>
        <p class="sign-error" v-else-if='$v.password.$dirty && !$v.password.required'>Поле не должно быть пустым</p>
      
       </div>

      <button class="reg-btn" type="submit">Войти</button>
    </form>

    <transition name="fade">
      <PopupLogin 
        v-show = 'error'
      /> 
    </transition>
    <Loader
      v-show='loading'
     />
  </div>
</template>

<script>
import HeaderBreadCr from '@/components/HeaderBreadCr'
import PopupLogin from '@/components/PopupLogin'
import Loader from '@/components/Loader'
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
  name: 'Home',
  data () {
    return {
      email: '',
      password: '',
      error: false,
      loading: false
    }  
  },
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  },
  components: {
    HeaderBreadCr,PopupLogin,Loader
  },
  methods: {
    async submitHandler(){
      if (this.$v.$invalid){
        this.$v.$touch()
        return
      }
    const formData = {
      email: this.email,
      password: this.password
    } 

      try {
        this.loading = true
        await this.$store.dispatch ('LOGIN', formData)
        this.loading = false
        this.$router.push ('/account')
      } catch (e) {
        this.loading = false
        this.error = true
        setTimeout (()=>{
          this.error = false
        },2000)
      }
      
    }
  }
}
</script>


<style lang="scss">
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
.singin-field {
  margin-bottom: 40px;
}
.sign-error {
  font-size: 13px;
  color: #d0021b;
  padding-top: 10px;
  padding-left: 10px;
}
.invalidClass {
    border-bottom: 1px solid red;
  }

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>