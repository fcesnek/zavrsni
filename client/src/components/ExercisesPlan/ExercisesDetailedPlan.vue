<template>
  <panel title="Exercise Plan">
      <v-btn
        v-if="isUserLoggedIn && plan.length"
        slot="action"
        @click="goToRoute('playlist-exercise', plan[plan.length - 1]._id)"
        class="light-green lighten-3"
        light
        medium
        absolute
        right
        middle
      >
      <v-icon>playlist_play</v-icon> Start exercise playlist
    </v-btn>
    <v-progress-linear
      :size="100"
      :width="15"
      :value=progress
      :color="color"
    >
    </v-progress-linear>
    <div>
      Exercises done: {{ planFinished.length }} / {{ plan.length }}
    </div>
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
          <td class="text-xs-right">
            <v-icon
              small
              v-if="user.isAdmin"
              class="mr-1 change-color-blue"
              @click="goToRoute('exercise-edit', props.item._id)"
            >
              edit
            </v-icon>
            <v-icon
              small
              class="change-color-red"
              @click="removeFromPlan(props.item, props.index)"
            >
              delete
            </v-icon>
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
        },
        {
          text: 'Actions',
          value: null,
          sortable: false
        }
      ],
      pagination: {
        sortBy: 'updatedAt',
        descending: false
      },
      plan: [],
      planFinished: [],
      progress: 0
    }
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.planFinished = (await ExercisesDoneService.index()).data
      this.plan = (await ExercisesPlanService.index()).data
      this.progress = (this.planFinished.length / this.plan.length) * 100
    }
  },
  methods: {
    goToRoute (route, id) {
      this.$router.push({ name: route, params: { exerciseId: id } })
    },
    containsObject (obj, list) {
      let exercise = _.find(list, function (val) { return _.isEqual(obj, val) })
      return _.isObject(exercise)
    },
    async removeFromPlan (exercise, index) {
      try {
        if (this.containsObject(exercise, this.planFinished)) {
          await ExercisesDoneService.remove({
            exerciseId: exercise._id
          })
          this.planFinished.splice(index, 1)
        }
        await ExercisesPlanService.remove({
          exerciseId: exercise._id
        })
        this.plan.splice(index, 1)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ]),
    color () {
      return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
    }
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
