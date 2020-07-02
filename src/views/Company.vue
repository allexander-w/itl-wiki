<template>
  <div class="sign-in">
    <HeaderBreadCr />
    <form class='registration create-company' @submit.prevent="submitHandler">
      <div class="create-form-item">
         <input 
          placeholder="Название вашей компании" 
          v-model="company" 
          type="text" 
          class="reg-input company-name"
          :class="{invalidClass: $v.company.$dirty && !$v.company.required}"
        >
         <p class='create-error' v-if = '$v.company.$dirty && !$v.company.required'>Введите название компании</p>
      </div>
      <div class="create-form-item create-address">
        <input 
          placeholder="Адрес сайта" 
          v-model="domen" 
          type="text" 
          class="reg-input company-domen"
          :class="{invalidClass: ($v.company.$dirty && !$v.company.required) || ($v.company.$dirty && !$v.company.minLength)}"
        > <span class="reg-domen"> .itl.wiki</span><br>
        <p class='create-error' v-if = '$v.company.$dirty && !$v.company.minLength'>Минимальная длина адреса: 3 символа</p>
      </div>
      <button class="reg-btn" type="submit">Создать компанию</button>
    </form>

    <Loader 
      v-show='loading'
    />
  </div>
</template>

<script>
import HeaderBreadCr from '@/components/HeaderBreadCr'
import { required, minLength } from 'vuelidate/lib/validators'
import Loader from '@/components/Loader'

export default {
  name: 'Home',
  data (){
      return {
          company: '',
          domen: '',
          loading: false
      }
  },
  validations: {
    company: {required},
    domen: {required, minLength: minLength(3)}
  },
  components: {
    HeaderBreadCr, Loader
  },
  methods: {
    async submitHandler(){
      if (this.$v.$invalid){
        this.$v.$touch()
        return
      }

      const formData = {
        company: this.company,
        domen: this.domen
      }

      try {
        this.loading = true
        await this.$store.dispatch ('COMPANY_DATA', formData)
        this.loading = false
        this.$router.push ('/create-company/add-users')
      } catch (e) {
        this.loading = false
      }
      
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
.company-domen{
  width: 320px;
}
.reg-domen {
    color: #383838;
    font-size: 20px;
}
.invalid {
    border-bottom: 1px solid red;
}
</style>