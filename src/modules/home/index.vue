<script>
import { mapActions } from 'vuex';
import PlayerListCard from '@/components/PlayerListCard';
import AddSubstitionDialog from '@/components/AddSubstitionDialog';

export default { /* eslint-disable */
  name: 'Home',
  components: {
    PlayerListCard,
    AddSubstitionDialog,
  },
  data() {
    return {
      isLoading: false,
      isAddSubstitionDialogVisible: false,
      isLineupCardVisible: true,
      substitutes: [],
      players: [],
      lineups: [],
      selectedPlayers: [],
      substitutePlayers: [],
      meta: {},
    }
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    selectedPlayers(newSelectedPlayers) {
      this.substitutePlayers = this.players
          .filter(({ id: id1 }) => !this.selectedPlayers
            .some(({ id: id2 }) => id2 === id1));

      this.lineups = newSelectedPlayers;
    },
  },
  computed: {
    isDisabledPickPlayerButton() {
      return this.selectedPlayers.length >= 11;
    },
  },
  methods: {
    ...mapActions('home', ['fetchPlayers']),
    fetchData() {
      this.isLoading = true;

      this.fetchPlayers()
        .then(({ data }) => {
          this.players = data.players;
          this.meta = data.meta;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    pickPlayer(playerParams) {
      const { index, ...player } = playerParams;

      this.players = [
        ...this.players.slice(0, index),
        ...this.players.slice(index + 1),
      ];

      this.selectedPlayers.push(player);
    },
    unPickPlayer(playerParams) {
      const { index, ...player } = playerParams;

      this.selectedPlayers = [
        ...this.selectedPlayers.slice(0, index),
        ...this.selectedPlayers.slice(index + 1),
      ];

      this.players.push(player);
    },
    addSubstitution(substitutionParams) {
      this.isLineupCardVisible = false;
      this.substitutes.push(substitutionParams.inPlayer);
      this.lineups = this.lineups.filter(player => player.id !== substitutionParams.outPlayer.id);
      this.substitutePlayers = this.substitutePlayers.filter(player => player.id !== substitutionParams.inPlayer.id);
      this.$nextTick(() => { this.isLineupCardVisible = true });
    },
  },
};
</script>

<template>
  <v-container class="players">
    <v-toolbar flat dense>
      Toolbar
    </v-toolbar>

    <v-row justify="center">
      <v-col cols="4">
        <player-list-card
          :player-list="players"
          :loading="isLoading"
          :disabled="isDisabledPickPlayerButton"
          title="All Players"
          all-players
          @pickOrUnpick="pickPlayer"
        />
      </v-col>

      <v-col cols="4">
        <player-list-card
          v-if="isLineupCardVisible"
          :player-list="selectedPlayers"
          :loading="isLoading"
          title="Lineup"
          @pickOrUnpick="unPickPlayer"
        />
      </v-col>

      <v-col cols="4">
        <player-list-card
          :player-list="substitutes"
          :loading="isLoading"
          title="Substitutes"
          substitutes
          @pickOrUnpick="unPickPlayer"
          @addSubstition="isAddSubstitionDialogVisible = true"
        />
      </v-col>
    </v-row>

    <add-substition-dialog
      v-if="isAddSubstitionDialogVisible"
      :lineups="lineups"
      :substitute-players="substitutePlayers"
      @closeDialog="isAddSubstitionDialogVisible = false"
      @substitution="addSubstitution"
    />
  </v-container>
</template>

<style lang="scss">
  .players {
    background-color: white;
    border-radius: 10px;
    width: 70vw;
  }
</style>