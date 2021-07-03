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

    <v-row justify="center">
      <v-col cols="4">
        <player-list-card
        />
      </v-col>

      <v-col cols="4">
        <player-list-card
          :player-list="lineups"
          title="Lineup"
          preview
        />
      </v-col>

      <v-col cols="4">
        <player-list-card
          :player-list="substitutes"
          title="Substitutes"
          preview
        />
      </v-col>
    </v-row>
  </v-container>
</template>
