<template>
  <div>
    <q-list dense v-if="blueprints">
      <q-item-label header>BLUEPRINTS</q-item-label>
      <q-expansion-item
        v-for="blueprint in blueprints"
        :key="blueprint.id"
        :label="blueprint.description"
        :value="activeBlueprintExpanded === blueprint.id"
        @click="activeBlueprintExpanded = blueprint.id"
      >
        <q-item
            v-for="line in sortByDescription(blueprint.lines)"
            :key="'chip-' + blueprint.description + line.description"
            dense
            style="padding-left: 72px"
            clickable
            @click="clickLine(blueprint, line)"
          >
            <q-item-section>{{ line.description }}</q-item-section>
        </q-item>
      </q-expansion-item>
      <!-- Dialog -->
      <q-dialog v-model="model">
        <q-card style="width: 600px">
          <q-card-section class="q-pb-none" v-if="activeBlueprint">
            <div class="text-h5">{{ activeBlueprint.description }}</div>
          </q-card-section>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel
              v-for="line in activeLines"
              :key="'tab-panel-' + activeBlueprint.description + line.description"
              :name="line.description"
              class="q-pt-none"
            >
              <q-tree
                :nodes="line.tree"
                node-key="label"
                :expanded.sync="expanded"
              >
                <template v-slot:default-header="prop">
                  <span class="text-h6 text-weight-light" v-html="prop.node.label" />
                </template>
              </q-tree>
            </q-tab-panel>
          </q-tab-panels>
          <q-separator />
          <q-tabs
            v-if="activeLines && activeLine && activeBlueprint"
            v-model="tab"
            align="left"
            dense
            class="bg-grey-3"
            active-color="primary"
            indicator-color="primary"
            narrow-indicator
          >
            <q-tab v-for="line in sortByDescription(activeLines)" :key="'tab-' + activeBlueprint.description + line.description" :name="line.description" :label="line.description" />
          </q-tabs>
        </q-card>
      </q-dialog>
    </q-list>
  </div>
</template>

<script>
export default {
  data: () => ({
    model: false,
    tab: '',
    activeLines: null,
    activeLine: null,
    activeBlueprint: null,
    activeBlueprintExpanded: '',
    expanded: ['Blueprint']
  }),
  computed: {
    blueprints () {
      return this.$store.getters['alone/getBlueprints']
    },
    activeBlueprints () {
      return this.$store.getters['alone/getActiveBlueprints']
    }
  },
  methods: {
    clickLine (blueprint, line) {
      this.activeLines = blueprint.lines
      this.activeLine = blueprint.lines[line.key]
      this.activeBlueprint = blueprint
      this.tab = this.activeLine.description
      this.model = true
    },
    sortByDescription (obj) {
      var arr = []
      for (var i in obj) {
        arr.push({
          ...obj[i],
          key: i
        })
      }
      return arr.sort((a, b) => {
        if (a.description < b.description) return -1
        else if (a.description > b.description) return 1
        return 0
      })
    }
  }
}
</script>
