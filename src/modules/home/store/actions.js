import axios from 'axios';

export default {
  fetchPlayers() {
    return axios.get('https://api.scoutium.com/api/clubs/4031/players?count=30');
  },
  setCreatedStaff({ commit }, params) {
    commit('setCreatedStaff', params);
  },
};
