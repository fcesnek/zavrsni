import Api from '@/services/Api'

export default {
  index (params) {
    return Api().get('history', {
      params: params
    })
  },
  add (history) {
    return Api().put(`history`, history)
  },
  clear () {
    return Api().delete('history')
  }
}
