<script>
import PlayerListCard from '@/components/PlayerListCard';
import { mapState } from 'vuex';

export default {
  name: 'GeneratedSquad',
  components: {
    PlayerListCard,
  },
  computed: {
    ...mapState('home', ['lineups', 'substitutes']),
  },
  created() {
    if (!this.lineups.length) this.$router.push('/');
  },
};
</script>

<template>
  <v-container class="home">
    <v-toolbar class="mb-2" flat dense>
      <v-row justify="center">
        <v-col cols="auto">
          <v-icon x-large color="#12C990">
            mdi-check-circle
          </v-icon>

          <span class="sofia-pro-subtitle">
            Squad saved successfully
          </span>
        </v-col>
      </v-row>
    </v-toolbar>

    <v-row>
      <v-col lg="4" xs="12" sm="12">
        <player-list-card>
          <v-row
            class="generated-squad__row"
            align-content="center"
            justify="center"
            fill-height
            no-gutters
          >
            <v-col cols="auto">
              <v-avatar size="48" outline>
                <img
                  src="@/assets/bjk.svg"
                  alt="Bjk"
                >
              </v-avatar>
            </v-col>

            <v-col class="text-center" cols="12">
              <span class="sofia-pro-title">
                Beşiktaş JK
              </span>
            </v-col>
          </v-row>
        </player-list-card>
      </v-col>

      <v-col lg="4" xs="12" sm="12">
        <player-list-card
          :player-list="lineups"
          title="Lineup"
          preview
        />
      </v-col>

      <v-col lg="4" xs="12" sm="12">
        <player-list-card
          :player-list="substitutes"
          title="Substitutes"
          substitutes
          preview
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
  .generated-squad {
    &__row {
      height: 55vh;
    }
  }
</style>
