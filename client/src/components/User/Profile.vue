<template>
  <v-flex>
    <panel title="Update profile">
      <v-select
        v-model="user.bodyFocus"
        :items="bodyFocusSelect"
        chips
        label="Body Focus"
        :menu-props="{ maxHeight: '400' }"
        multiple
        hint="Pick your painful back area"
        persistent-hint
      ></v-select>
      <v-text-field
        label="Age"
        v-model="user.age">
      </v-text-field>
      <v-select
        :items="genderSelect"
        label="Your gender"
        v-model="user.gender"
      ></v-select>
      <v-text-field
        label="Waist circumference"
        v-model="user.waistCircumference">
      </v-text-field>
      <v-text-field
        label="Rested heart rate"
        v-model="user.restedHeartRate">
      </v-text-field>
      <v-text-field
        label="O2 Peak"
        v-model="user.O2Peak"
        readonly>
      </v-text-field>
      <v-btn
        color="green darken-1"
        dark
        @click="update">
        Update profile
      </v-btn>
      <v-alert :value="!!this.error" type="error">
        <div v-html="error" />
      </v-alert>
    </panel>
  </v-flex>
</template>

<script>
import UserProfileService from '@/services/UserProfileService'
import ExercisesService from '@/services/ExercisesService'

export default {
  data () {
    return {
      user: {
        age: null,
        gender: '',
        waistCircumference: null,
        restedHeartRate: null,
        bodyFocus: [],
        O2Peak: null
      },
      error: null,
      genderSelect: ['Male', 'Female'],
      bodyFocusSelect: [],
      required: (value) => !!value || 'Field is required.'
    }
  },
  methods: {
    async update () {
      try {
        await UserProfileService.update(this.user)
        this.$router.push({
          name: 'exercises'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  async mounted () {
    try {
      this.user = (await UserProfileService.show(this.$store.state.user._id)).data
      let exercises = (await ExercisesService.index()).data
      for (let exercise of exercises) {
        this.bodyFocusSelect.push(exercise.bodyFocus)
      }
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style>

</style>
