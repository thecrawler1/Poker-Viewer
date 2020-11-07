<template>
  <q-page class="flex flex-center bg-grey-1">
    <q-card style="width: 400px">
      <q-card-section class="text-h6">
        New item caption
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
          filled
          v-model="color"
        >
          <template v-slot:before>
            <q-icon name="label" :style="'color: ' + color" />
          </template>
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-color
                  format-model="rgb"
                  v-model="color"
                  no-header
                  default-view="palette"
                  :palette="['rgb(244, 67, 54)', 'rgb(255, 193, 7)', 'rgb(0, 200, 83)', 'rgb(129, 212, 250)', 'rgb(121, 134, 203)', 'rgb(206, 147, 216)', 'rgb(245, 245, 245)'].reverse()"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Add"
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
    color: ''
  }),
  methods: {
    create () {
      this.$q.dialog({
        title: 'New item caption',
        message: 'Are you sure?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$firestore.collection('spots').doc(this.id).set({
          ...this.spots[this.id],
          caption: this.spots[this.id].caption.concat({
            description: this.description,
            color: this.color
          })
        })
      })
    }
  },
  computed: {
    spots () {
      return this.$store.getters['alone/getSpots']
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
