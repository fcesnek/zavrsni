<template>
  <v-app>
    <v-layout>
      <v-layout column>
        <v-flex xs8 mb-3 ml-5>
          <p class="time-left">
            {{ currentExercise.title }}
          </p>
          <exercise-you-tube
            :youtubeId="currentExercise.youtubeId"
            :plWdh="640"
            :plHgh="480"
            :autoplay="autoplayObj"/>
        </v-flex>
        <v-flex xs4>
          <countdown
            :time="exerciseDuration"
            :auto-start="false"
            v-on:countdownend="showDoneBtn"
            ref="countdown">
            <template slot-scope="props">
              <div class="time-left" v-if="hasStarted">
                Time left: {{ props.minutes }} minutes, {{ props.seconds }} seconds.
              </div>
            </template>
          </countdown>
          <br>
          <v-btn
            v-if="!hasStarted"
            class="green darken-1"
            dark
            @click="startDialog"
            :disabled="dialog"
            :loading="dialog">
            Start
          </v-btn>
          <v-dialog
            v-model="dialog"
            hide-overlay
            persistent
            width="500"
          >
            <v-card
              color="green"
              dark
            >
              <v-card-text>
                Exercise starting in
                <countdown
                  :time="10 * 1000"
                  :auto-start="false"
                  ref="dialogcountdown"
                  v-on:countdownend="startExercise">
                  <template slot-scope="props">
                    <v-progress-linear
                      :value="props.seconds * 10"
                      color="white"
                    >
                    </v-progress-linear>
                    {{ props.seconds }}
                  </template>
                </countdown>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-btn
            v-if="hasStarted && !hasEnded"
            class="green darken-1"
            dark
            @click="pauseExercise">
            Pause
          </v-btn>
          <v-btn
            v-if="hasEnded"
            class="green darken-1"
            dark
            @click="resetTimer">
            Reset
          </v-btn>
          <v-btn
            v-if="hasEnded"
            class="green darken-1"
            dark
            @click="endExercise">
            Mark as finished
          </v-btn>
          <v-alert
            :value="successMsg"
            type="info"
            transition="scale-transition"
          >
            Exercise successfuly marked as finished
          </v-alert>
        </v-flex>
      </v-layout>
    <v-layout column>
    </v-layout>
      <v-flex xs4 mr-4>
        <exercises-plan></exercises-plan>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
import ExerciseYouTube from '@/components/ViewExercise/ExerciseYouTube'
import ExercisesService from '@/services/ExercisesService'
import ExercisesDoneService from '@/services/ExercisesDoneService'
import ExercisesPlan from '@/components/ExerciseStart/ExercisesPlan'

export default {
  data () {
    return {
      currentExercise: {},
      hasStarted: false,
      hasEnded: false,
      exerciseDuration: 0,
      dialog: false,
      autoplayObj: {autoplay: 1},
      successMsg: false
    }
  },
  methods: {
    startExercise () {
      this.endDialog()
      this.$refs.countdown.start()
      this.hasStarted = true
    },
    endDialog () {
      this.dialog = false
    },
    startDialog () {
      this.dialog = true
      this.$refs.dialogcountdown.start()
    },
    pauseExercise () {
      this.$refs.countdown.pause()
      this.hasStarted = false
    },
    showDoneBtn () {
      this.hasEnded = true
    },
    resetTimer () {
      this.$router.go()
    },
    async endExercise () {
      try {
        const exerciseId = this.$store.state.route.params.exerciseId
        await ExercisesDoneService.add({
          exerciseId: exerciseId
        })
        this.successMsg = true
      } catch (err) {
        console.log(err)
      }
    },
    next () {
      this.$router.push({
        name: 'start-exercise',
        params: {
          exerciseId: this.nextExercise._id
        }
      })
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
    this.currentExercise = (await ExercisesService.show(exerciseId)).data
    this.exerciseDuration = this.currentExercise.duration * 1000 * 60
  },
  components: {
    ExerciseYouTube,
    ExercisesPlan
  }
}
</script>

<style scoped>
.time-left {
  background-color: #81C784;
  font-size: 30px;
}
</style>
