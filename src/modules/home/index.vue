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
    },
    isSubstitutesCardActive() {
      return this.selectedPlayers.length < 11;
    },
    isLineupCardMessageVisible() {
      return !this.selectedPlayers.length;
    },
  },
  methods: {
    ...mapActions('home', ['fetchPlayers', 'setCreatedStaff']),
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
    confirm() {
      const params = {
        lineups: this.selectedPlayers,
        substitutes: this.substitutes,
      };

      this.setCreatedStaff(params);
      this.$router.push('/generated-squad');
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
  <v-container class="home mt-5 pa-5">
    <v-toolbar class="mb-2" flat dense>
      <v-row no-gutters>
        <v-col cols="auto">
          <v-avatar size="32" outline>
            <img
              src="@/assets/fb.svg"
              alt="FB"
            >
          </v-avatar>
        </v-col>

        <v-col cols="auto" class="d-none d-sm-flex pl-1">
          <span class="sofia-pro-title">
            Fenerbahçe
          </span>
        </v-col>

        <v-spacer />

        <v-col class="px-0 mx-0" lg="2" md="2" xs="12" sm="4">
          <v-btn
            :disabled="isConfirmButtonDisable"
            depressed block
            color="lightRoyalBlue"
            class="white--text text-capitalize"
            @click="confirm"
          >
            Confirm
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>

    <v-row justify="center">
      <v-col lg="4" xs="12" sm="12">
        <player-list-card
          :player-list="players"
          :loading="isLoading"
          :disabled="isDisabledPickPlayerButton"
          title="All Players"
          all-players
          @pickOrUnpick="pickPlayer"
        />
      </v-col>

      <v-col lg="4" xs="12" sm="12">
        <player-list-card
          v-if="isLineupCardVisible"
          :player-list="selectedPlayers"
          :preview="isUnpickDisabled"
          :show-default-message="isLineupCardMessageVisible"
          title="Lineup"
          defaultMessage="You haven't selected any player for lineup yet."
          @pickOrUnpick="unPickPlayer"
        />
      </v-col>

      <v-col lg="4" xs="12" sm="12">
        <player-list-card
          :player-list="substitutes"
          :preview="isSubstitutesCardActive"
          :show-default-message="isSubstitutesCardActive"
          substitutes
          title="Substitutes"
          defaultMessage="Please pick 11 players for lineup before creating any substitutions"
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

    @media only screen and (max-width: 600px) {
      width: 100%;
    }
  }
</style>