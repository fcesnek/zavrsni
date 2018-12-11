<template>
  <panel title="Recently viewed exercises">
    <v-btn
        v-if="isUserLoggedIn && history.length"
        slot="action"
        @click="clearHistory"
        class="light-green lighten-3"
        light
        medium
        absolute
        right
        middle>
      Clear history
    </v-btn>
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="history">
      <template slot="items" slot-scope="props">
        <td class="text-xs-right change-cursor" @click="goToRoute('exercise', props.item._id)" :key="props.item._id">
          {{props.item.title}}
        </td>
        <td class="text-xs-right">
          {{props.item.bodyFocus}}
        </td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import ExercisesHistoryService from '@/services/ExercisesHistoryService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Naslov',
          value: 'title',
          align: 'right'
        },
        {
          text: 'Body Focus',
          value: 'bodyFocus',
          align: 'right'
        }
      ],
      pagination: {
        sortBy: 'updatedAt',
        descending: true
      },
      history: []
    }
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.history = (await ExercisesHistoryService.index()).data
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  methods: {
    goToRoute (route, id) {
      this.$router.push({ name: route, params: { exerciseId: id } })
    },
    async clearHistory () {
      await ExercisesHistoryService.clear()
      this.history = []
    }
  }
}
</script>

<style scoped>
.change-cursor:hover {
  cursor: pointer;
}
</style>
