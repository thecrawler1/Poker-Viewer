<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn v-if="$q.screen.lt.lg" flat round icon="menu" @click="left = !left" />

        <template v-if="$q.screen.gt.xs">
          <q-toolbar-title>
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
            </q-avatar>
            Poker Viewer
          </q-toolbar-title>
          <q-space />
          <template v-if="edit">
            <q-btn dense flat round icon="done" @click="saveRangeChanges" />
            <q-btn dense flat round icon="undo" />
            <q-btn dense flat round icon="remove" />
          </template>
          <q-btn v-else dense flat round icon="edit" @click="edit = true" />
          <q-btn dense flat round :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" @click="$q.fullscreen.toggle()" />
        </template>
        <q-space v-else />
        <q-btn
          v-if="$q.screen.lt.lg"
          flat
          round
          icon="menu"
          @click="right = !right"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="left"
      side="left"
      bordered
      :breakpoint="$q.screen.sizes.lg - 1"
    >
      <pre-flop-strategy-tree />
    </q-drawer>

    <q-drawer
      show-if-above
      v-model="right"
      side="right"
      bordered
      :breakpoint="$q.screen.sizes.lg - 1"
    >
      <range-caption :selectable="edit" />
      <pos-flop-strategy-tree />
    </q-drawer>

    <q-page-container>
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <router-view />
      </transition>
      <q-page-sticky
        v-if="$q.screen.xs && !$q.fullscreen.isActive"
        position="bottom-right"
        :offset="[18, 18]"
      >
        <q-btn fab :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" @click="$q.fullscreen.toggle()" color="primary" />
      </q-page-sticky>
    </q-page-container>

  </q-layout>
</template>

<script>
import PreFlopStrategyTree from 'components/PreFlopStrategyTree'
import PosFlopStrategyTree from 'components/PosFlopStrategyTree'
import RangeCaption from 'components/RangeCaption'

export default {
  components: {
    PreFlopStrategyTree,
    PosFlopStrategyTree,
    RangeCaption
  },
  data: () => ({
    left: false,
    right: false
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
    spots () {
      return this.$store.getters['alone/getSpots']
    },
    activeRanges () {
      return this.$store.getters['alone/getActiveRanges']
    }
  },
  methods: {
    saveRangeChanges () {
      this.$q.dialog({
        title: 'Save changes',
        message: 'Are you sure?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        var params = this.$route.params
        this.$firestore
          .collection('ranges')
          .doc(params.spot + '-' + params.hero_position + (params.villain_position ? '-' + params.villain_position : ''))
          .set(this.activeRanges)
        this.edit = false
      })
    }
  }
}
</script>
