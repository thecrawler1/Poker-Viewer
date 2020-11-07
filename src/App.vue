<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    spots: {
      get () {
        return this.$store.getters['alone/getSpots']
      },
      set (value) {
        this.$store.dispatch('alone/setSpots', value)
      }
    },
    blueprints: {
      get () {
        return this.$store.getters['alone/getBlueprints']
      },
      set (value) {
        this.$store.dispatch('alone/setBlueprints', value)
      }
    },
    ranges: {
      get () {
        return this.$store.getters['alone/getRanges']
      },
      set (value) {
        this.$store.dispatch('alone/setRanges', value)
      }
    },
    routeRanges () {
      return params => this.ranges
        ? this.ranges[params.spot + '-' + params.hero_position + (params.villain_position ? '-' + params.villain_position : '')]
        : {}
    },
    routeBlueprints () {
      return params => this.spots
        ? (params.villain_position
          ? this.spots[params.spot].formations[params.hero_position].villain_positions[params.villain_position].blueprints
          : this.spots[params.spot].formations[params.hero_position].blueprints
        )
        : []
    }
  },
  methods: {
    async loadSpots () {
      var spots = {}
      await this.$firestore.collection('spots').get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var data = doc.data()
          data.id = doc.id
          spots[doc.id] = data
        })
      })
      this.spots = spots
      this.dispatch(this.$route)
    },
    async loadBlueprints () {
      var blueprints = {}
      await this.$firestore.collection('blueprints').get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var data = doc.data()
          data.id = doc.id
          blueprints[doc.id] = data
        })
      })
      this.blueprints = blueprints
      this.dispatch(this.$route)
    },
    async loadRanges () {
      var ranges = {}
      await this.$firestore.collection('ranges').get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          ranges[doc.id] = doc.data()
        })
      })
      this.ranges = ranges
      this.dispatch(this.$route)
    },
    dispatch (route) {
      if (route.name === 'range-viewer') {
        this.$store.dispatch('alone/setActiveSpot', route.params.spot)
        this.$store.dispatch('alone/setActiveHeroPosition', route.params.hero_position)
        this.$store.dispatch('alone/setActiveVillainPosition', route.params.villain_position)
        this.$store.dispatch('alone/setActiveRanges', this.routeRanges(route.params))
        this.$store.dispatch('alone/setActiveBlueprints', this.routeBlueprints(route.params))
      }
    }
  },
  watch: {
    $route: {
      immediate: false,
      handler (to) {
        this.dispatch(to)
      }
    }
  },
  created () {
    this.loadSpots()
    this.loadBlueprints()
    this.loadRanges()
  }
}
</script>

<style>
.link-active {
  color: #1976D2;
  background-color: #e6f1fc;
}
</style>
