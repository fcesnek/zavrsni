<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Exercise Data">
        <v-text-field
          label="Title"
          required
          :rules="[required]"
          v-model="exercise.title">
        </v-text-field>
        <v-text-field
          label="Body focus"
          required
          :rules="[required]"
          v-model="exercise.bodyFocus">
        </v-text-field>
        <v-text-field
          label="Duration (in minutes)"
          required
          :rules="[required]"
          v-model="exercise.duration">
        </v-text-field>
        <v-text-field
          label="Exercise image"
          required
          :rules="[required]"
          v-model="exercise.exerciseImgUrl">
        </v-text-field>
        <v-text-field
          label="YouTube ID"
          required
          :rules="[required]"
          v-model="exercise.youtubeId">
        </v-text-field>
        <v-text-field
          label="Minimal recommended VO2 [mL / (kg*minute)]"
          required
          :rules="[required]"
          v-model="exercise.minO2">
        </v-text-field>
      </panel>
    </v-flex>
    <v-flex xs8>
      <panel title="Exercise Data" class="ml-4">
        <v-text-field
          label="Description"
          required
          :rules="[required]"
          multi-line
          v-model="exercise.description">
        </v-text-field>
      </panel>
      <v-alert
        class="ml-4"
        :value="!!this.error"
        type="error"
        transition="scale-transition">
        <div v-if="error">
          {{error}}
        </div>
      </v-alert>
      <v-btn
        dark
        class="green darken-1"
        @click="save">
          Save exercise
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import ExercisesService from '@/services/ExercisesService'
import _ from 'lodash'

export default {
  data () {
    return {
      exercise: {
        title: null,
        bodyFocus: null,
        duration: null,
        exerciseImgUrl: null,
        youtubeId: null,
        description: null,
        minO2: null
      },
      error: null,
      required: (value) => !!value || 'Field is required.'
    }
  },
  methods: {
    async save () {
      this.error = null
      let subsetExercise = _.pick(this.exercise, ['title', 'bodyFocus', 'duration', 'exerciseImgUrl', 'youtubeId', 'description', 'minO2'])
      const areAllFieldsFilledIn = Object
        .keys(subsetExercise)
        .every(key => !!subsetExercise[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all required fields.'
        return
      }
      const exerciseId = this.$store.state.route.params.exerciseId
      try {
        await ExercisesService.put(this.exercise)
        this.$router.push({
          name: 'exercise',
          params: {
            exerciseId: exerciseId
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    try {
      const exerciseId = this.$store.state.route.params.exerciseId
      this.exercise = (await ExercisesService.show(exerciseId)).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>

</style>
