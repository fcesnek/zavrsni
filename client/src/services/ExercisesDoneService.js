import Api from '@/services/Api'

export default {
  index (params) {
    return Api().get('exercise-finished', {
      params: params
    })
  },
  add (exerciseDone) {
    return Api().put(`exercise-finished`, exerciseDone)
  },
  remove (params) {
    return Api().delete(`exercise-finished/${params.exerciseId}/remove`, {params: params})
  }
}
