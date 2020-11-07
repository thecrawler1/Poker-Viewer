<template>
  <div></div>
</template>

<script>
export default {
  mounted () {
    this.$q.dialog({
      title: 'Delete spot',
      message: 'Are you sure?',
      cancel: true,
      persistent: true
    }).onOk(() => {
      this.$firestore.collection('spots').doc(this.$route.params.spot).delete()
    })
  }
}
</script>
