<script>
import { mapActions } from 'vuex';

export default { /* eslint-disable */
  name: 'Home',
  data() {
    return {
      isLoading: false,
      players: [],
      meta: {},
    }
  },
  mounted() {
    this.fetchData();
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
  },
};
</script>

<template>
  <v-container style="background-color: white; border-radius: 10px">
    <v-toolbar flat dense>
      Toolbar
    </v-toolbar>

    <v-row justify="center">
      <v-col cols="4">
        <v-card
          class="pa-2"
          width="50vw"
          :loading="isLoading"
        >
          <v-card-text>
            <v-list v-if="!isLoading" subheader>
              <v-subheader class="text-h5">All Players</v-subheader>

              <v-list-item
                v-for="player in players"
                :key="player.id"
              >
                <v-list-item-avatar>
                  <v-img
                    :alt="`${player.display_name} avatar`"
                    :src="player.image_url"
                  />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    v-text="player.display_name"
                  />

                  <v-list-item-subtitle
                    v-if="player.position"
                    v-text="player.position.name"
                  />
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn small text color="success">PICK</v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col class="text-center" cols="4">
        <v-card
          class="pa-2"
          width="50vw"
        >
          <v-card-title>
            Lineup
          </v-card-title>

          <v-card-text>
            jk
          </v-card-text>
        </v-card>
      </v-col>

      <v-col class="text-center" cols="4">
        <v-card
          class="pa-2"
          width="50vw"
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
