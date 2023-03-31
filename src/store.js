import { createStore } from 'vuex'

export default createStore({
  state: {
    totalWeeklyExerciseTime: 0,
    totalDailyCaloriesIntake: 0,
  },
  mutations: {
    setTotalWeeklyExerciseTime(state, value) {
      state.totalWeeklyExerciseTime = value
    },
    setTotalDailyCaloriesIntake(state, value) {
      state.totalDailyCaloriesIntake = value
    },
  },
  actions: {
    updateTotalWeeklyExerciseTime({ commit }, value) {
      commit('setTotalWeeklyExerciseTime', value)
    },
    updateTotalDailyCaloriesIntake({ commit }, value) {
      commit('setTotalDailyCaloriesIntake', value)
    },
  },
})
