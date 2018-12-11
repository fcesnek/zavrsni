<template>
  <v-app>
    <v-layout>
      <v-flex xs6>
        <exercise-metadata :exercise="exercise"/>
      </v-flex>
      <v-flex xs6 >
        <exercise-you-tube :youtubeId="exercise.youtubeId" class="ml-2"/>
      </v-flex>
    </v-layout>

    <v-layout class="mt-2">
      <v-flex xs6>
        <description :exercise="exercise" />
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import ExerciseMetadata from '@/components/ViewExercise/ExerciseMetadata'
import Description from '@/components/ViewExercise/Description'
import ExerciseYouTube from '@/components/ViewExercise/ExerciseYouTube'
import ExercisesService from '@/services/ExercisesService'
import ExercisesHistoryService from '@/services/ExercisesHistoryService'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      exercise: {}
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    const exerciseId = this.$store.state.route.params.exerciseId
    this.exercise = (await ExercisesService.show(exerciseId)).data

    if (this.isUserLoggedIn) {
      ExercisesHistoryService.add({
        exerciseId: exerciseId
      })
    }
  },
  components: {
    ExerciseMetadata,
    ExerciseYouTube,
    Description
  }
}
</script>

<style scoped>

</style>
