<template>
<v-flex xs8>
  <panel title="Exercises">
    <div
      v-for="exercise in exercises"
      class="exercise"
      :key="exercise._id">
      <v-layout>
        <v-flex xs6>
          <div class="exercise-title">
            {{exercise.title}}
          </div>
          <div class="exercise-bodyfocus">
            {{exercise.bodyFocus}}
          </div>
          <div class="exercise-duration">
            Duration: {{exercise.duration}} minutes
          </div>
          <div class="exercise-duration">
            <span class="important">Minimum recommended VO2: {{exercise.minO2}}</span> [mL / (kg*minute)]
          </div>
          <v-btn
            dark
            class="green darken-1"
            :to="{
              name: 'exercise',
              params: {
                exerciseId: exercise._id
              }
            }">
              View exercise
          </v-btn>
          <v-btn
          v-if="isUserLoggedIn && !buttonsActivated[findIndex(exercise._id, exercises)]"
          dark
          class="green darken-3"
          @click="addToPlan(exercise._id)">
            Add to plan
        </v-btn>
        <v-btn
          v-if="isUserLoggedIn && buttonsActivated[findIndex(exercise._id, exercises)]"
          dark
          class="red darken-1"
          @click="removeFromPlan(exercise._id)">
            Remove from plan
        </v-btn>
        </v-flex>
        <v-flex xs6>
          <img class="exercise-image" :src="exercise.exerciseImgUrl" />
        </v-flex>
      </v-layout>
      <v-divider class="mt-5"></v-divider>
    </div>
  </panel>
</v-flex>
</template>

<script>
import ExercisesService from '@/services/ExercisesService'
import ExercisesPlanService from '@/services/ExercisesPlanService'
import ExercisesDoneService from '@/services/ExercisesDoneService'
import {mapState} from 'vuex'
import _ from 'lodash'

export default {
  data () {
    return {
      exercises: null,
      exercisesPlan: null,
      exercisesFinished: null,
      buttonsActivated: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.exercisesPlan = (await ExercisesPlanService.index()).data
      this.exercisesFinished = (await ExercisesDoneService.index()).data
      for (let i = 0; i < this.exercises.length; i++) {
        this.buttonsActivated.push(this.containsObject(this.exercises[i], this.exercisesPlan))
      }
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler () {
        this.exercises = (await ExercisesService.showSuggestions()).data
      }
    }
  },
  methods: {
    containsObject (obj, list) {
      let exercise = _.find(list, function (val) { return _.isEqual(obj, val) })
      return _.isObject(exercise)
    },
    async addToPlan (id) {
      try {
        await ExercisesPlanService.add({
          exerciseId: id
        })
        this.toggleButton(this.findIndex(id, this.exercises))
      } catch (err) {
        console.log(err)
      }
    },
    async removeFromPlan (id) {
      try {
        let e = this.exercises[this.findIndex(id, this.exercises)]
        if (this.containsObject(e, this.exercisesFinished)) {
          await ExercisesDoneService.remove({
            exerciseId: id
          })
        }
        await ExercisesPlanService.remove({
          exerciseId: id
        })
        this.toggleButton(this.findIndex(id, this.exercises))
      } catch (err) {
        console.log(err)
      }
    },
    toggleButton (index) {
      this.buttonsActivated[index] = !this.buttonsActivated[index]
    },
    findIndex (objId, list) {
      return list.findIndex(x => x._id === objId)
    }
  }
}
</script>

<style scoped>
.exercise {
  padding: 20px;
  height: 200px;
  overflow: hidden;
}

.exercise-title {
  font-size: 30px;
}

.exercise-bodyfocus {
  font-size: 24px;
}

.exercise-duration {
  font-size: 18px;
}
.important {
  font-weight: bold;
}
.exercise-image {
    height: auto;
    width: auto;
    max-width: 100px;
    max-height: 100px;
    margin: 0 auto;
}
</style>
