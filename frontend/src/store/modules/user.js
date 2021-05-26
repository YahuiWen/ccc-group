import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
//   login({ mobile: username.trim(), password: password }).then(response => {
// //此处的mobile 是username改的,因为后端的参数是mobile
//     const { data } = response
//     commit('SET_TOKEN', data.token)//去掉.token,和后端对应
//     setToken(data.token)//去掉.token,和后端对应
//     resolve()
//   },
//
// //修改token标识,和后端对应
//   config.headers['Authorization'] = getToken()
//
// //去除登出操作的后端接口访问
// //去除后,变成纯前端的退出登录
// //  user/logout
// logout({ commit, state }) {
//   return new Promise((resolve, reject) => {
//
//     // logout(state.token).then(() => {
//
//     removeToken() // 去除token
//     resetRouter()
//     commit('RESET_STATE')
//     resolve()
//
//     /*      }
//     ).catch(error => {
//       reject(error)
//     })*/
//
//   })
// },


  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

