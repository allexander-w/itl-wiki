<template>
  <div class="profile-forms">
    <form @submit.prevent='updateInfo'>
      <div class="profile-field">
        <input
          placeholder="Имя"
          v-model="name"
          type="text"
          class="profile-input"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        />
        <p class="profile-error" v-if = '$v.name.$dirty && !$v.name.required'>Поле не должно быть пустым</p>
      </div>
      <div class="profile-field">
        <input
          placeholder="Фамилия"
          v-model="surname"
          type="text"
          class="profile-input"
          :class="{invalid: $v.surname.$dirty && !$v.surname.required}"
        />
        <p class="profile-error" v-if = '$v.surname.$dirty && !$v.surname.required'>Поле не должно быть пустым</p>
      </div>
      <div class="profile-field">
        <input
          placeholder="Email"
          v-model="email"
          type="text"
          class="profile-input"
           :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        />
        <p class="profile-error" v-if = '$v.email.$dirty && !$v.email.required'>Поле не должно быть пустым</p>
        <p class="profile-error" v-else-if = '$v.email.$dirty && !$v.email.email'>Введите корректный email</p>
      </div>

      <button class="profile-btn" type="submit">Сохранить настройки</button>
    </form>
    <Loader v-show='loading' />
  </div>
</template>
<script>
import Loader from '@/components/Loader'
import { mapGetters } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
    data(){
        return{
            name: '',
            surname: '',
            email: '',
            loading: false
        }
    },
    validations: {
      name: {required},
      surname: {required},
      email: {required, email}  
    },
    components: {Loader},
    computed: {
        ...mapGetters(['GET_CURRENT_USER_INFO'])
    },
    async mounted(){
        this.loading = true
        await this.$store.dispatch('FETCH_INFO')
        this.loading = false
        
        this.name = this.GET_CURRENT_USER_INFO.name
        this.surname = this.GET_CURRENT_USER_INFO.surname
        this.email = this.GET_CURRENT_USER_INFO.email
    },
    methods: {
        async updateInfo(){
            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                name: this.name,
                surname: this.surname,
                email: this.email
            }

            try {
                this.loading = true
                await this.$store.dispatch('UPDATE_INFO', formData)
                this.loading = false
            }catch (e){this.loading = false}
            
        }
        
    }
}
</script>

<style lang="scss">
.profile-btn {
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
.profile-error {
  font-size: 13px;
  color: #d0021b;
  padding-top: 10px;
  padding-left: 10px;
}
.profile-input {
  outline: none;
  border: none;
  border-bottom: 1px solid #d8d8d8;
  width: 490px;
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
.profile-field {
    margin-bottom: 40px;
}
.invalid{
    border-bottom: 1px solid red;
}
</style>