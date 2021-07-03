import axios from 'axios';

export default {
  fetchPlayers() {
    return axios.get('https://api.scoutium.com/api/clubs/4029/players?count=50');
  },
  setCreatedStaff({ commit }, params) {
    commit('setCreatedStaff', params);
  },
};
