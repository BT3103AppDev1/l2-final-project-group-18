import { createStore } from 'vuex'

export default createStore({
  state: {
    totalWeeklyExerciseTime: 0,
  },
  mutations: {
    setTotalWeeklyExerciseTime(state, value) {
      state.totalWeeklyExerciseTime = value
    },
  },
  actions: {
    updateTotalWeeklyExerciseTime({ commit }, value) {
      commit('setTotalWeeklyExerciseTime', value)
    },
  },
})
