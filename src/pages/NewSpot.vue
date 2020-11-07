<template>
  <q-page class="flex flex-center bg-grey-1">
    <q-card style="width: 400px">
      <q-card-section class="text-h6">
        New spot
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          v-model="description"
          label="Description"
          filled
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          v-model="id"
          label="Spot ID"
          filled
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          v-model="position"
          label="List position"
          filled
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-toggle
          v-model="villain_positions"
          label="Villain positions"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Create"
          color="primary"
          @click="create()"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data: () => ({
    description: '',
    id: '',
    position: 0,
    villain_positions: true
  }),
  methods: {
    create () {
      this.$q.dialog({
        title: 'New spot',
        message: 'Are you sure?',
        cancel: true,
        persistent: true
      }).onOk(newRangeDescription => {
        this.$firestore.collection('spots').doc(this.id).set({
          caption: [],
          description: this.description,
          formations: {},
          has_villain_positions: this.villain_positions,
          position: parseInt(this.position)
        })
      })
    }
  },
  watch: {
    '$route.params.spot': {
      immediate: true,
      handler (val) {
        this.id = val
      }
    }
  }
}
</script>

<style>

</style>
