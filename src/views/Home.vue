<template>
  <div>
    Hello
  </div>
</template>

<script>

export default {
  name: 'home',
  created () {
    this.$store.state.isFooterBarVisible = true
  }
}
</script>
