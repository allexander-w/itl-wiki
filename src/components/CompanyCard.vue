<template>
  <div class="company-card" @click='getCompanyId'>
    <p class="company-link">{{companyInfo.name}}</p>
    <p class="company-users">Пользователей: 1</p>
  </div>
</template>

<script>
export default {
    props: {
        companyInfo: {
            type: Object,
            default: ()=>{}
        }
    },
    methods: {
       async getCompanyId() {
            try {
                await this.$store.dispatch('GET_WORKS', this.companyInfo.id)
                this.$router.push('/account/works')
            } catch (e) {}
        }
    }
}
</script>

<style lang="scss">
.company-card {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 50px;
  width: 490px;
  height: 140px;
  border-radius: 2px;
  background-color: #fff;
  cursor: pointer;
  margin-bottom: 20px;
  transition: .5s;
  &:hover {
      box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.05);
      .company-link{
          text-decoration: underline;
      }
  }
}
.company-link{
  font-size: 20px;
  color: #0e65dd;
  transition: .5s;
  margin-bottom: 40px;
}
</style>