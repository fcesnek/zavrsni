import Api from '@/services/Api'

export default {
  index (params) {
    return Api().get('plan', {
      params: params
    })
  },
  add (params) {
    return Api().put(`exercises/${params.exerciseId}/add`, params)
  },
  remove (params) {
    return Api().delete(`exercises/${params.exerciseId}/remove`, {params: params})
  }
}
