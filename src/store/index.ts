import { createStore } from "vuex";

export default createStore({
  state: {
    userData: null,
    token: null,
  },
  getters: {},
  mutations: {
    logout: (state) => {
      state.token = null;
      state.userData = null;
    },
  },
  actions: {
    storeToken: ({ state }, value) => {
      state.token = value;
    },
    storeUserData: ({ state }, value) => {
      state.userData = value;
    },
  },
  modules: {},
});
