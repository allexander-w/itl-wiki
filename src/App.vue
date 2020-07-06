<template>
  <div id="app">
    <component :is='layout' @create = 'create' />
  </div>
</template>

<script>
import DefaultSignInLayout from '@/layouts/DefaultSignInLayout'
import DefaultLayout from '@/layouts/DefaultLayout'
import LoginLayout from '@/layouts/LoginLayout'
import EditLayout from '@/layouts/EditLayout'

export default {
  name: 'app',
  components: {DefaultSignInLayout, LoginLayout,DefaultLayout,EditLayout},
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
.blue-button {
  border-radius: 2px;
  background-color: #0e65dd;
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff;
  transition: .5s;

  &:hover {
    background-color: #0d58c0;
  }
}
</style>
