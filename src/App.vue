<template>
  <div id="app">
    <component :is='layout' @create = 'create' />
  </div>
</template>

<script>
import DefaultSignInLayout from '@/layouts/DefaultSignInLayout'
import DefaultLayout from '@/layouts/DefaultLayout'
import LoginLayout from '@/layouts/LoginLayout'

export default {
  name: 'app',
  components: {DefaultSignInLayout, LoginLayout,DefaultLayout},
  computed: {
    layout(){
      if (this.$route.meta.layout === undefined) {
        return 'LoginLayout'
      }
      return this.$route.meta.layout
    }
  },
  methods: {
    create(){
      this.changeLayout = true
    }
  }
}
</script>

<style lang="scss">
@import './assets/style';


.main-title {
  font-size: 20px;
  color: #383838;
  font-weight: 400;
}
</style>
