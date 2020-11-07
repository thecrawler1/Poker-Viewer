<template>
  <div
    :style="'min-width:' + ($q.screen.lt.sm ? '300px' : '600px')"
  >
    <table style="width: 100%">
      <tr v-for="(firstCard, i) in cards" :key=" 'tr-' + firstCard ">
        <td v-for="(secondCard, j) in cards" :key=" 'td-' + firstCard + secondCard" class="q-pa-none">
          <q-responsive :ratio="4/3">
            <q-btn
              flat
              padding="none"
              class="full-width text-grey-10"
              :label="ordered(firstCard, secondCard, i, j)"
              @click="$emit('clickCard', firstCard, secondCard)"
              :style="cardStyle(colors[firstCard + secondCard])"
            />
          </q-responsive>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    colors: Object
  },
  data: () => ({
    cards: ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
  }),
  methods: {
    ordered (firstCard, secondCard, i, j) {
      return i > j ? secondCard + firstCard : firstCard + secondCard
    },
    cardStyle (colors) {
      return 'background-image: linear-gradient(180deg, ' +
        (colors ? colors.firstColor : 'rgb(245, 245, 245)') +
        ' 33%, ' +
        (colors ? colors.secondColor : 'rgb(245, 245, 245)') +
        ' 67%)' +
        (this.$q.screen.xs ? '; font-size: 10px; font-weight: 400;' : '')
    }
  }
}
</script>
