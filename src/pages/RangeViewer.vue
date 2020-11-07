<template>
  <div>
    <template v-if="$q.screen.lt.sm">
      <q-page>
        <q-tabs
          v-model="tab"
          align="left"
          class="text-primary"
          :breakpoint="0"
          dense
        >
          <q-tab
            v-for="key in rangesKeys"
            :key="key"
            :name="key"
            :label="ranges[key].description"
          />
          <q-space />
          <q-btn
            v-if="edit"
            flat
            icon="add"
            label="New range"
            class="q-mx-sm q-my-xs"
            @click="newRange"

          />
        </q-tabs>
        <q-separator />
        <range @clickCard="clickCard" :colors="range.colors" class="q-pa-sm" />
      </q-page>
    </template>
    <template v-else>
      <q-page class="flex flex-center bg-grey-1">
        <q-card
          :flat="$q.screen.lt.sm"
          :class="$q.screen.lt.sm ? 'q-ma-none' : ''"
        >
          <q-tabs
            v-model="tab"
            align="left"
            class="text-primary"
          >
            <q-tab
              v-for="key in rangesKeys"
              :key="key"
              :name="key"
              :label="ranges[key].description"
            />
            <q-space />
            <q-btn
              v-if="edit"
              flat
              icon="add"
              label="New range"
              class="q-mx-sm q-my-xs"
              @click="newRange"

            />
          </q-tabs>
          <q-separator />
          <q-card-section
            v-if="range"
            :class="$q.screen.lt.sm ? 'q-pa-none' : ''"
          >
            <range @clickCard="clickCard" :colors="range.colors" />
          </q-card-section>
        </q-card>
      </q-page>
    </template>
  </div>
</template>

<script>
import Range from 'components/Range'

export default {
  name: 'RangeViewer',
  components: {
    Range
  },
  data: () => ({
    empty: true,
    range: null
  }),
  computed: {
    edit: {
      get () {
        return this.$store.getters['alone/getEdit']
      },
      set (value) {
        this.$store.dispatch('alone/setEdit', value)
      }
    },
    tab: {
      get () {
        return this.$store.getters['alone/getActiveRangeKey']
      },
      set (value) {
        this.$store.dispatch('alone/setActiveRangeKey', value)
      }
    },
    ranges: {
      get () {
        return this.$store.getters['alone/getActiveRanges']
      },
      set (value) {
        this.$store.dispatch('alone/setActiveRanges', value)
      }
    },
    rangesKeys () {
      return this.ranges ? Object.keys(this.ranges).sort() : null
    },
    activeColors () {
      return this.$store.getters['alone/getActiveColors']
    },
    caption () {
      return this.$store.getters['alone/getCaption'](this.$route.params.spot)
    }
  },
  watch: {
    ranges: {
      immediate: true,
      handler (val) {
        if (val) {
          var objKeys = Object.keys(val)
          if (objKeys.length > 0 && !objKeys.includes(this.tab)) {
            this.tab = objKeys.sort()[0]
          } else if (objKeys.includes(this.tab) && val) {
            this.range = val[this.tab]
          }
        } else {
          this.range = null
        }
      }
    },
    tab: {
      immediate: true,
      handler (val) {
        if (this.ranges) {
          this.range = this.ranges[val]
        }
      }
    }
  },
  methods: {
    newRange () {
      this.$q.dialog({
        title: 'New range',
        prompt: {
          model: '',
          isValid: val => val.length > 2,
          type: 'text',
          label: 'Description'
        }
      }).onOk(newRangeDescription => {
        var newRangeKey = newRangeDescription.toLowerCase().split(' ').join('-')
        this.ranges = {
          ...this.ranges,
          [newRangeKey]: {
            description: newRangeDescription.toUpperCase(),
            colors: {}
          }
        }
        this.tab = newRangeKey
      })
    },
    clickCard (firstCard, secondCard) {
      if (!this.edit) {
        return
      }
      var colors = {
        firstColor: this.activeColors.firstColor,
        secondColor: this.activeColors.secondColor
      }
      for (var c in this.caption) {
        var color = this.caption[c].color
        if (color === colors.firstColor) {
          break
        } else if (color === colors.secondColor) {
          // swap
          var firstColorTmp = colors.firstColor
          colors.firstColor = colors.secondColor
          colors.secondColor = firstColorTmp
          break
        }
      }
      this.ranges = {
        ...this.ranges,
        [this.tab]: {
          ...this.ranges[this.tab],
          colors: {
            ...this.ranges[this.tab].colors,
            [firstCard + secondCard]: colors
          }
        }
      }
    }
  }
}
</script>
