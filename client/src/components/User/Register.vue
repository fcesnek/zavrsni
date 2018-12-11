<template>
  <v-container grid-list-md text-xs-center>
    <v-layout column>
  <v-flex xs6 offset-xs-3>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Account details</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 2" step="2">Personal details</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <panel title="Registration - account details">
            <form
              name="registration-form"
              autocomplete="off">
              <v-text-field
                label="Email"
                v-model="email"
              ></v-text-field>
              <br>
              <v-text-field
                label="Password"
                v-model="password"
                type="password"
                autocomplete="new-password"
              ></v-text-field>
            </form>
            <v-btn
              mt-4
              dark
              color="green darken-1"
              @click="e1 = 2"
            >
              Continue
            </v-btn>
          </panel>
        </v-stepper-content>
        <v-stepper-content step="2">
          <panel title="Registration - personal details">
            <v-select
              v-model="bodyFocus"
              :items="bodyFocusSelect"
              chips
              label="Body Focus"
              :menu-props="{ maxHeight: '400' }"
              multiple
              hint="Pick your painful back area"
              persistent-hint
            ></v-select>
            <v-text-field
              label="Your age"
              v-model="age"
            ></v-text-field>
            <v-select
              :items="genderSelect"
              label="Your gender"
              v-model="gender"
            ></v-select>
            <v-text-field
              label="Your rested heart rate (bpm)"
              v-model="restedHeartRate"
            ></v-text-field>
            <v-text-field
              label="Your waist circumference (in cm)"
              v-model="waistCircumference"
            ></v-text-field>
            <v-btn
              mt-5
              dark
              color="green darken-1"
              @click="register">
              Register
            </v-btn>
            <v-btn
              flat
              @click="e1 = 1">Cancel
            </v-btn>
          </panel>
          <v-alert :value="!!this.error" type="error">
            <div v-html="error" />
          </v-alert>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UserProfileService from '@/services/UserProfileService'
import ExercisesService from '@/services/ExercisesService'

export default {
  data () {
    return {
      email: '',
      password: '',
      age: null,
      gender: '',
      waistCircumference: null,
      restedHeartRate: null,
      error: null,
      e1: 0,
      genderSelect: ['Male', 'Female'],
      bodyFocus: [],
      bodyFocusSelect: []
    }
  },
  methods: {
    async register () {
      try {
        const response = await UserProfileService.register({
          email: this.email,
          password: this.password,
          age: this.age,
          gender: this.gender,
          restedHeartRate: this.restedHeartRate,
          waistCircumference: this.waistCircumference,
          bodyFocus: this.bodyFocus
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'exercises'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  async mounted () {
    let exercises = (await ExercisesService.index()).data
    for (let exercise of exercises) {
      this.bodyFocusSelect.push(exercise.bodyFocus)
    }
  }
}
</script>

<style scoped>
</style>
