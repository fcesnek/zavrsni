import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('exercises', {
      params: {
        search: search
      }
    })
  },
  show (exerciseId) {
    return Api().get(`exercises/${exerciseId}`)
  },
  post (exercise) {
    return Api().post('exercises', exercise)
  },
  put (exercise) {
    return Api().put(`exercises/${exercise._id}`, exercise)
  },
  showSuggestions () {
    return Api().get('suggestions')
  }
}
