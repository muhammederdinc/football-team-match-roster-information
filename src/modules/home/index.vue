<script>
import { mapActions } from 'vuex';
import PlayerListCard from '../../components/PlayerListCard';

export default { /* eslint-disable */
  name: 'Home',
  components: {
    PlayerListCard,
  },
  data() {
    return {
      isLoading: false,
      players: [],
      selectedPlayers: [],
      meta: {},
    }
  },
  mounted() {
    this.fetchData();
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
          @pickOrUnpick="pickPlayer"
        />
      </v-col>

      <v-col cols="4">
        <player-list-card
          :player-list="selectedPlayers"
          :loading="isLoading"
          title="Lineup"
          @pickOrUnpick="unPickPlayer"
        />
      </v-col>

      <v-col class="text-center" cols="4">
        <v-card
          class="pa-2"
          width="50vw"
          height="60vh"
        >
          <v-card-title>
            Substitutes
          </v-card-title>

          <v-card-text>
            jk
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
  .players {
    background-color: white;
    border-radius: 10px;
    width: 70vw;
  }
</style>