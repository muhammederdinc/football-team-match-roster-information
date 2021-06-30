<script>
export default {
  name: 'PlayerListCard',
  props: {
    playerList: {
      type: Array,
      required: true,
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
  },
};
</script>

<template>
  <v-card
    id="scroll-target"
    class="overflow-y-auto"
    height="60vh"
    width="50vw"
    :loading="loading"
  >
    <v-card-text>
      <v-list v-if="!loading" subheader>
        <v-subheader
          v-if="title"
          v-text="title"
          class="text-h5"
        />

        <v-list-item
          v-for="player in playerList"
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
            />

            <v-list-item-subtitle
              v-if="player.position"
              v-text="player.position.name"
            />
          </v-list-item-content>

          <v-list-item-action>
            <v-btn small text color="primary">
              PICK
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
