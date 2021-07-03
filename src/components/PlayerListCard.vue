<script>
export default {
  name: 'PlayerListCard',
  props: {
    playerList: {
      type: Array,
      required: false,
      default: () => [],
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    substitutes: {
      type: Boolean,
      required: false,
      default: false,
    },
    allPlayers: {
      type: Boolean,
      required: false,
      default: false,
    },
    preview: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    isAddSubstitutesButtonVisible() {
      return this.playerList.filter((player) => player.substitutionMinute > -1).length < 5;
    },
  },
  methods: {
    emitPickOrUnpick(player, index) {
      const params = {
        ...player,
        index,
      };

      this.$emit('pickOrUnpick', params);
    },
    isSubstitutionMinuteVisible(player) {
      return player.substitutionMinute > -1 && !this.allPlayers;
    },
  },
};
</script>

<template>
  <v-card
    id="scroll-target"
    class="overflow-y-auto"
    height="65vh"
    width="50vw"
    :loading="loading"
  >
    <v-card-text>
      <v-list v-if="!loading" subheader>
        <v-subheader v-if="title">
          <span class="sofia-pro-title"> {{ title }} </span>
        </v-subheader>

        <v-list-item
          v-for="(player, index) in playerList"
          :key="player.id"
        >
          <v-list-item-avatar>
            <v-img
              :alt="player.display_name"
              :src="player.image_url"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              v-text="player.display_name"
              class="sofia-pro-subtitle"
            />

            <v-list-item-subtitle v-if="player.position">
              <span class="sofia-pro-caption"> {{ player.position.name }} </span>
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <span v-if="isSubstitutionMinuteVisible(player)">
              <v-icon v-if="substitutes" color="success">mdi-arrow-up</v-icon>
              <v-icon v-else color="error">mdi-arrow-down</v-icon>

              {{ player.substitutionMinute }}'
            </span>

            <v-btn
              v-else-if="!isSubstitutionMinuteVisible(player) && !preview"
              small text
              color="primary"
              :disabled="disabled"
              @click="emitPickOrUnpick(player, index)"
            >
              PICK
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-btn
        v-if="substitutes && isAddSubstitutesButtonVisible"
        small text
        color="#12C990"
        @click="$emit('addSubstition')"
      >
        <v-icon small>
          mdi-plus
        </v-icon>

        Add Substitutes
      </v-btn>
    </v-card-text>
  </v-card>
</template>
