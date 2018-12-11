<template>
  <panel title="Exercises Plan">
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="plan">
      <template slot="items" slot-scope="props">
        <tr>
          <td>
            <v-checkbox
              v-model="props.item"
              color="success"
              :value="!containsObject(props.item, planFinished)"
              readonly
              hide-details
            ></v-checkbox>
          </td>
          <td class="text-xs-right change-cursor" @click="goToRoute('exercise', props.item._id)" :key="props.item._id">
            {{props.item.title}}
          </td>
          <td class="text-xs-right">
            {{props.item.bodyFocus}}
          </td>
        </tr>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import ExercisesDoneService from '@/services/ExercisesDoneService'
import ExercisesPlanService from '@/services/ExercisesPlanService'
import _ from 'lodash'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Finished',
          value: null,
          sortable: false
        },
        {
          text: 'Title',
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
        descending: false
      },
      plan: [],
      planFinished: []
    }
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.planFinished = (await ExercisesDoneService.index()).data
      this.plan = (await ExercisesPlanService.index()).data
    }
  },
  methods: {
    goToRoute (route, id) {
      this.$router.push({ name: route, params: { exerciseId: id } })
    },
    containsObject (obj, list) {
      let exercise = _.find(list, function (val) { return _.isEqual(obj, val) })
      return _.isObject(exercise)
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  }
}
</script>

<style scoped>
.change-cursor:hover {
  cursor: pointer;
}

.change-color-blue:hover {
  cursor: pointer;
  color: blue;
}

.change-color-red:hover {
  cursor: pointer;
  color: red;
}

</style>
