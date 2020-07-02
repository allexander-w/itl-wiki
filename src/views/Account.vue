<template>
    <div class="account">
        <p class="main-title acc-title">Ваши компании</p>
        <CompanyCard 
            v-for = '(item, index) in COMPANY_INFO'
            :key = 'index'
            :companyInfo = 'item'
        />

        <div class="company-add-card" @click='addCompany'>
            <i class="fas fa-plus-circle add-icon"></i> <p class="add-comp">Добавить компанию</p>
        </div>
        <Loader v-show='load' />
    </div>
</template>

<script>
import Loader from '@/components/Loader'
import CompanyCard from '@/components/CompanyCard'
import { mapGetters } from 'vuex'
export default {
    data: () => ({
      load: false
    }),
    components: {
        Loader, CompanyCard
    },
    computed: {
        ...mapGetters(['COMPANY_INFO'])
    },
    async mounted(){
            try {
                this.load = true
                await this.$store.dispatch('ADD_COMPANY')
                this.load = false
            } catch (e){
                this.load = false
                console.log(e)
             }
    },
    methods: {
        addCompany(){
            this.$router.push('/create-company')
        }
    }
}
</script>

<style lang="scss">
.add-comp {
    font-size: 16px;
    color: #0b55bb;
}
.add-icon{
    color: #0e65dd;
    font-size: 24px;
    margin-right: 15px;
}
.acc-title {
    padding-top: 50px;
    padding-bottom: 30px;
}

.account {
    width: 100%;
    background-color: #f1f6fd;
    margin-left: -50px;
    padding-left: 50px;
    overflow: auto;
}
.company-add-card{
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px #ceddf1;
  width: 490px;
  height: 140px;
  border-radius: 2px;
  background-color: transparent;
  cursor: pointer;

  transition: .5s;
  &:hover {
      border: solid 1px #b4cff3;
  }
}

</style>