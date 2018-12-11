<template>
  <v-app>
    <v-container grid-list-md text-xs-center>
      <v-layout column>
        <v-flex xs6 offset-xs-3>
          <panel title="Log in">
            <v-text-field
              label="Email"
              v-model="email"
            ></v-text-field>
            <br>
            <v-text-field
              label="Password"
              v-model="password"
              type="password"
            ></v-text-field>
            <br>
            <v-alert
              :value="!!this.error"
              type="error"
              transition="scale-transition">
              <div v-html="error" />
            </v-alert>
            <v-btn
              class="green darken-1"
              dark
              @click="login">
              Log in
            </v-btn>
          </panel>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import UserProfileService from '@/services/UserProfileService'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await UserProfileService.login({
          email: this.email,
          password: this.password
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
  }
}
</script>

<style scoped>
</style>
