import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  update (profileInfo) {
    return Api().put('update-profile', profileInfo)
  },
  show () {
    return Api().get('profile')
  }
}
