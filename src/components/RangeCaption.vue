<template>
  <q-list dense>
    <template v-if="caption">
      <q-item-label header>CAPTION</q-item-label>
      <q-item
        v-for="item in caption"
        :key="item.description"
        :clickable="selectable"
        :active="selectable && link.includes(item.description)"
        active-class="link-active"
        @click="clickCaption(item)"
      >
        <q-item-section avatar>
          <q-icon :style="'color:' + item.color " name="label" />
        </q-item-section>
        <q-item-section>{{ item.description }}</q-item-section>
      </q-item>
      <q-separator class="q-mt-md" />
    </template>
  </q-list>
</template>

<script>
export default {
  props: {
    selectable: Boolean
  },
  data: () => ({
    link: [],
    colors: []
  }),
  computed: {
    caption () {
      return this.$store.getters['alone/getCaption'](this.$route.params.spot)
    }
  },
  methods: {
    clickCaption (item) {
      if (this.link.includes(item.description)) {
        if (this.link.length > 1) {
          this.link.splice(this.link.indexOf(item.description), 1)
          this.colors.splice(this.colors.indexOf(item.color), 1)
        }
      } else {
        if (this.link.length < 2) {
          this.link.push(item.description)
          this.colors.push(item.color)
        }
      }
      this.$store.dispatch('alone/setActiveColors', { firstColor: this.colors[0], secondColor: this.colors.length > 1 ? this.colors[1] : this.colors[0] })
    }
  },
  watch: {
    caption: {
      immediate: true,
      handler (val) {
        if (val && val.length > 0) {
          this.link = []
          this.colors = []
          this.link.push(val[0].description)
          this.colors.push(val[0].color)
          this.$store.dispatch('alone/setActiveColors', { firstColor: val[0].color, secondColor: val[0].color })
        }
      }
    },
    link: {
      immediate: true,
      handler () {
        while (this.link.length > 2) {
          this.link.shift()
          this.colors.shift()
        }
      }
    }
  }
}
</script>
