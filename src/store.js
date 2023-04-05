import { createStore } from 'vuex'

export default createStore({
  state: {
    totalWeeklyExerciseTime: 0,
    totalDailyCaloriesIntake: 0,
    totalWeeklyCaloriesBurnt: 0,
  },
  mutations: {
    setTotalWeeklyExerciseTime(state, value) {
      state.totalWeeklyExerciseTime = value
    },
    setTotalDailyCaloriesIntake(state, value) {
      state.totalDailyCaloriesIntake = value
    },
    setTotalWeeklyCaloriesBurnt(state, value) {
      state.totalWeeklyCaloriesBurnt = value
    },
  },
  actions: {
    updateTotalWeeklyExerciseTime({ commit }, value) {
      commit('setTotalWeeklyExerciseTime', value)
    },
    updateTotalDailyCaloriesIntake({ commit }, value) {
      commit('setTotalDailyCaloriesIntake', value)
    },
    updateTotalWeeklyCaloriesBurnt({ commit }, value) {
      commit('setTotalWeeklyCaloriesBurnt', value)
    },
  },
})
