import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/User/Register'
import Login from '@/components/User/Login'
import Exercises from '@/components/Exercises/Index'
import CreateExercise from '@/components/ViewExercise/CreateExercise'
import ViewExercise from '@/components/ViewExercise/Index'
import EditExercise from '@/components/ViewExercise/EditExercise'
import StartExercise from '@/components/ExerciseStart/StartExercise'
import PlaylistExercise from '@/components/ExerciseStart/PlaylistExercise'
import Plan from '@/components/ExercisesPlan/Plan'
import Suggestions from '@/components/Suggestions/Suggestions'
import Profile from '@/components/User/Profile'
Vue.use(Router)

export default new Router({
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/exercises',
      name: 'exercises',
      component: Exercises
    },
    {
      path: '/exercises/create',
      name: 'exercises-create',
      component: CreateExercise
    },
    {
      path: '/exercises/:exerciseId',
      name: 'exercise',
      component: ViewExercise
    },
    {
      path: '/exercises/:exerciseId/edit',
      name: 'exercise-edit',
      component: EditExercise
    },
    {
      path: '/exercises/:exerciseId/start',
      name: 'start-exercise',
      component: StartExercise
    },
    {
      path: '/exercises/playlist/:exerciseId',
      name: 'playlist-exercise',
      component: PlaylistExercise
    },
    {
      path: '/plan',
      name: 'plan',
      component: Plan
    },
    {
      path: '/suggestions',
      name: 'suggestions',
      component: Suggestions
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '*',
      redirect: 'exercises'
    }
  ]
})
