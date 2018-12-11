<template>
  <v-app>
    <v-container grid-list-md text-xs-center>
      <v-layout>
        <v-flex class="xs-12 ml-2">
          <exercise-search-panel />
          <exercises-panel class="mt-2" />
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import ExercisesPanel from './ExercisesPanel'
import ExerciseSearchPanel from './ExerciseSearchPanel'
import ExercisesService from '@/services/ExercisesService'
import {mapState} from 'vuex'
import _ from 'lodash'

export default {
  components: {
    ExercisesPanel,
    ExerciseSearchPanel
  },
  data () {
    return {
      exercises: null
    }
  },
  async mounted () {
    this.exercises = (await ExercisesService.index()).data
    console.log(this.exercises)
  },
  methods: {
    containsObject (obj, list) {
      let exercise = _.find(list, function (val) { return _.isEqual(obj, val) })
      return _.isObject(exercise)
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
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

.exercise-bodyfocus {
  font-size: 24px;
}

.exercise-duration {
  font-size: 18px;
}

.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>
