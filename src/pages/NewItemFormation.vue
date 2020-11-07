<template>
  <q-page class="flex flex-center bg-grey-1">
    <q-card style="width: 400px">
      <q-card-section class="text-h6">
        New item formation
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          v-model="spotId"
          label="Spot ID"
          filled
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          v-model="heroPosition"
          label="Hero position"
          filled
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-toggle
          v-model="hasVillainPosition"
          label="Villain position"
        />
      </q-card-section>
      <q-card-section class="q-pt-none" v-if="hasVillainPosition">
        <q-input
          v-model="villainPosition"
          label="Villain position"
          filled
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          v-model="itemPosition"
          label="Item position"
          filled
        />
      </q-card-section>
      <q-card-section class="q-pt-none" v-if="blueprints">
        <q-select
          v-model="selectedBlueprints"
          filled
          multiple
          label="Blueprints"
          :options="Object.keys(blueprints)"
        />
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
    hasVillainPosition: true,
    spotId: '',
    heroPosition: '',
    villainPosition: '',
    itemPosition: '',
    selectedBlueprints: []
  }),
  methods: {
    create () {
      this.$q.dialog({
        title: 'New item caption',
        message: 'Are you sure?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        var spot = this.spots[this.spotId]
        this.$firestore.collection('spots').doc(this.spotId).set(
          this.hasVillainPosition ? {
            ...spot,
            formations: {
              ...spot.formations,
              [this.heroPositionId]: spot.formations && this.heroPositionId in spot.formations ? {
                ...spot.formations[this.heroPositionId],
                villain_positions: {
                  ...spot.formations[this.heroPositionId].villain_positions,
                  [this.villainPositionId]: {
                    description: this.villainPosition,
                    blueprints: this.selectedBlueprints,
                    position: parseInt(this.itemPosition)
                  }
                }
              } : {
                description: this.heroPosition,
                position: 0,
                villain_positions: {
                  [this.villainPositionId]: {
                    description: this.villainPosition,
                    blueprints: this.selectedBlueprints,
                    position: parseInt(this.itemPosition)
                  }
                }
              }
            }
          } : {
            ...spot,
            formations: {
              ...spot.formations,
              [this.heroPositionId]: {
                description: this.heroPosition,
                blueprints: this.selectedBlueprints,
                position: parseInt(this.itemPosition)
              }
            }
          }
        )
      })
    }
  },
  computed: {
    spots () {
      return this.$store.getters['alone/getSpots']
    },
    blueprints () {
      return this.$store.getters['alone/getBlueprints']
    },
    heroPositionId () {
      return this.heroPosition.toLowerCase().split(' ').join('-')
    },
    villainPositionId () {
      return this.villainPosition.toLowerCase().split(' ').join('-')
    }
  },
  watch: {
    '$route.params.spot': {
      immediate: true,
      handler (val) {
        this.spotId = val
      }
    },
    selectedBlueprints (val) {
      console.log('=> ', val)
    }
  }
}
</script>

<style>

</style>
