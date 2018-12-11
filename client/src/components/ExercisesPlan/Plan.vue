<template>
  <v-app>
    <v-container grid-list-md text-xs-center>
      <v-layout>
        <v-flex xs6 v-if="isUserLoggedIn">
          <exercises-detailed-plan/>
        </v-flex>
        <v-flex>
          <recently-viewed-exercises/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import ExercisesDetailedPlan from './ExercisesDetailedPlan'
import RecentlyViewedExercises from './RecentlyViewedExercises'
import ExercisesService from '@/services/ExercisesService'
import {mapState} from 'vuex'

export default {
  components: {
    ExercisesDetailedPlan,
    RecentlyViewedExercises
  },
  data () {
    return {
      exercises: null
    }
  },
  async mounted () {
    this.exercises = (await ExercisesService.index()).data
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  }
}
</script>

<style>

</style>
