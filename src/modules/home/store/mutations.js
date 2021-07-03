export default {
  setCreatedStaff(state, { lineups = [], substitutes = [] }) {
    state.lineups = lineups;
    state.substitutes = substitutes;
  },
};
