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
    isConfirmButtonDisable() {
      return this.selectedPlayers.length !== 11;
    },
    isUnpickDisabled() {
      return this.substitutes.length > 0;
    }
  },
  methods: {
    ...mapActions('home', ['fetchPlayers', 'setCreatedStaff']),
    fetchData() {
      this.isLoading = true;

      this.fetchPlayers()
        .then(({ data }) => {
          this.players = data.players
            .filter((player) => player.team.club.id === 4029 && player.gender === 'male');
          this.meta = data.meta;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    confirm() {
      const params = {
        lineups: this.selectedPlayers,
        substitutes: this.substitutes,
      };

      this.setCreatedStaff(params);
      this.$router.push('/generatedSquad');
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
  <v-container class="home">
    <v-toolbar class="mb-2" flat dense>
      <v-row>
        <v-col cols="auto">
          <v-avatar size="32" outline>
            <img
              src="@/assets/bjk.svg"
              alt="Bjk"
            >
          </v-avatar>
          
          <span class="sofia-pro-title">
            Beşiktaş JK
          </span>

        </v-col>

        <v-spacer />

        <v-col class="px-0 mx-0" cols="2">
          <v-btn
            :disabled="isConfirmButtonDisable"
            depressed block
            color="#3852FF"
            class="white--text text-capitalize"
            @click="confirm"
          >
            Confirm
          </v-btn>
        </v-col>
      </v-row>
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
          :disabled="isUnpickDisabled"
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
  .home {
    background-color: white;
    border-radius: 10px;
    width: 70vw;
  }
</style>