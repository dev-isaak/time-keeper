<template>
  <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiEye } from '@mdi/js'

export default {
  name: 'my-component',
  components: {
    SvgIcon
  },
  data() {
    return {
      path: mdiEye
    }
  }
}
</script>
