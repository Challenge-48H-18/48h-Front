// store/index.js
export const state = () => ({
  data: [],
});

export const mutations = {
  setData(state, data) {
    state.data = data;
  },
};

const conf = {
  header:{
    Accept:"Application/json"
  }
}
export const actions = {
  async fetchData({ commit }, $axios) {
    try {
      const data = await $axios.$get('http://thegoodnetwork.fr/index.php/api/posts',conf);
      commit('setData', data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  },
};
