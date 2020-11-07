<template>
  <div>
    <q-list v-if="spots">
      <q-expansion-item
        v-for="spot in spots"
        :key="spot.id"
        :label="spot.description"
        :value="spotActive === spot.id"
        @click="spotActive = spot.id"
      >
        <template v-if="spot.has_villain_positions">
          <q-expansion-item
            v-for="formation in objFormationToArray(spot.formations)"
            :key="formation.hero_position"
            :label="formation.hero_position"
            switch-toggle-side
            dense-toggle
            dense
            :value="true"
          >
            <q-item
              v-for="villain_position in objFormationToArray(formation.villain_positions)"
              :key="spot.description + formation.hero_position + villain_position.description"
              active-class="link-active"
              dense
              style="padding-left: 100px"
              :to="'/' + spot.id + '/' + formation.id + '/' + villain_position.id + '/'"
            >
              <q-item-section>{{ villain_position.description }}</q-item-section>
            </q-item>
          </q-expansion-item>
        </template>

        <template v-else>
          <q-item
            v-for="formation in objFormationToArray(spot.formations)"
            :key="spot.description + '-' + formation.hero_position"
            active-class="link-active"
            dense
            style="padding-left: 72px"
            :to="'/' + spot.id + '/' + formation.id + '/'"
          >
            <q-item-section>{{ formation.hero_position }}</q-item-section>
          </q-item>
        </template>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data: () => ({
    spotActive: ''
  }),
  computed: {
    spots () {
      return this.$store.getters['alone/getSpots']
    }
  },
  methods: {
    objFormationToArray (obj) {
      var arr = []
      for (var i in obj) {
        arr.push({ id: i, hero_position: obj[i].description, ...obj[i] })
      }
      arr.sort((a, b) => (a.position - b.position))
      return arr
    }
  },
  watch: {
    '$route.params.spot': {
      immediate: true,
      handler (val) {
        if (val) {
          this.spotActive = val
        }
      }
    }
  }
}
</script>

<style>
.q-expansion-item__content .q-item {
  border-radius: 0 10px 10px 0;
  margin-right: 12px;
}
</style>
