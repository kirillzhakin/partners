import Vue from "vue";
import Vuex from "vuex";
import { getRequests, updateRequest } from "@/api/partnerRequests";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    requests: [],
    loading: false,
    error: null,
  },
  mutations: {
    SET_REQUESTS(state, requests) {
      state.requests = requests;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    UPDATE_REQUEST(state, updatedRequest) {
      const req = state.requests.find((r) => r.id === updatedRequest.id);

      if (req) {
        Object.assign(req, updatedRequest);
      }
    },
  },
  actions: {
    async fetchRequests({ commit }) {
      commit("SET_LOADING", true);
      try {
        const { data } = await getRequests();
        console.log(data);
        commit("SET_REQUESTS", data);
        commit("SET_ERROR", null);
      } catch (err) {
        commit("SET_ERROR", "Ошибка загрузки данных");
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async changeRequest({ commit }, data) {
      commit("SET_LOADING", true);
      try {
        await updateRequest(data.id, data);
        commit("UPDATE_REQUEST", data);
      } catch (err) {
        console.error(err);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  getters: {
    isLoading: (state) => state.loading,
    isError: (state) => state.error,
    filteredRequests: (state) => (search, status) => {
      return state.requests.filter((r) => {
        const matchesSearch =
          r.name.toLowerCase().includes(search.name.toLowerCase()) &&
          r.city.toLowerCase().includes(search.city.toLowerCase());
        const matchesStatus = status ? r.status === status : true;
        return matchesSearch && matchesStatus;
      });
    },
  },
});
