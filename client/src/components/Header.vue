<template>
  <v-toolbar fixed class="green darken-1" dark>
    <v-toolbar-title class="mr-4">
      <router-link
        tag="span"
        :to="{
          name: 'root'
        }">
          <v-icon class="home">home</v-icon>
      </router-link>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn
        flat
        dark
        @click="goToRoute('exercises')">
        Browse Exercises
      </v-btn>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat
        dark
        class="green darken-1"
        @click="goToRoute('plan')"
        >
        Exercise Plan
      </v-btn>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat
        dark
        class="green darken-1"
        @click="goToRoute('suggestions')"
        >
        Suggestions
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        flat
        dark
        v-if="!$store.state.isUserLoggedIn"
        :to="{
          name: 'login'
        }">
        Log in
      </v-btn>
      <v-btn
        flat
        dark
        v-if="!$store.state.isUserLoggedIn"
        :to="{
          name: 'register'
        }">
        Register
      </v-btn>
      <v-btn
        flat
        v-if="$store.state.isUserLoggedIn"
        @click="goToRoute('profile')">
          Profile ({{$store.state.user.email}})
      </v-btn>
      <v-btn
        flat
        dark
        v-if="$store.state.isUserLoggedIn"
        @click="logout">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    },
    goToRoute (route) {
      this.$router.push({
        name: route
      })
    }
  }
}
</script>

<style scoped>
 .home {
   cursor: pointer;
 }
 .home:hover {
   color: #333;
 }
</style>
