<template>
  <panel title="Exercise Data">
    <v-layout>
      <v-flex xs6>
        <div class="exercise-title">
          {{exercise.title}}
        </div>
        <div class="exercise-duration">
          Duration: {{exercise.duration}} minutes
        </div>
        <div class="exercise-oxygen">
          <span class="important">Minimum recommended VO2: {{exercise.minO2}} </span>[mL / (kg*minute)]
        </div>
        <v-btn
          v-if="isUserLoggedIn && user.isAdmin"
          dark
          class="green darken-1"
          :to="{
            name: 'exercise-edit',
            params () {
              return {
                exerciseId: exercise._id
              }
            }
          }">
            Edit exercise
        </v-btn>
        <v-btn
          v-if="isUserLoggedIn"
          dark
          class="green darken-1"
          :to="{
            name: 'start-exercise',
            params () {
              return {
                exerciseId: exercise._id
              }
            }
          }">
            Start exercise
        </v-btn>
        <v-btn
          v-if="isUserLoggedIn && !isInPlan"
          dark
          class="green darken-1"
          @click="addToPlan">
            Add to plan
        </v-btn>
        <v-btn
          v-if="isUserLoggedIn && isInPlan"
          dark
          class="green darken-1"
          @click="removeFromPlan">
            Remove from plan
        </v-btn>
      </v-flex>

      <v-flex xs6>
        <img class="album-image" :src="exercise.exerciseImgUrl" />
        <br>
        Body focus: {{exercise.bodyFocus}}
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import ExercisesPlanService from '@/services/ExercisesPlanService'
export default {
  props: [
    'exercise'
  ],
  data () {
    return {
      isInPlan: false
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  watch: {
    async exercise () {
      if (!this.isUserLoggedIn) {
        return
      }

      try {
        const plan = (await ExercisesPlanService.index({
          exerciseId: this.$store.state.route.params.exerciseId
        })).data
        this.isInPlan = !!plan.length
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    async addToPlan () {
      try {
        await ExercisesPlanService.add({
          exerciseId: this.$store.state.route.params.exerciseId
        })
        this.isInPlan = !this.isInPlan
      } catch (err) {
        console.log(err)
      }
    },
    async removeFromPlan () {
      try {
        await ExercisesPlanService.remove({
          exerciseId: this.$store.state.route.params.exerciseId
        })
        this.isInPlan = !this.isInPlan
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.exercise {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}

.exercise-title {
  font-size: 30px;
}

.important {
  font-weight: bold;
}
.exercise-duration {
  font-size: 22px;
}

.exercise-oxygen {
  font-size: 15px;
}

.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>
