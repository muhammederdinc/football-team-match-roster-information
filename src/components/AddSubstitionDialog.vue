<script>
export default {
  name: 'AddSubstitionDialog',
  props: {
    lineups: {
      type: Array,
      required: true,
    },
    substitutePlayers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isVisible: true,
      formData: {},
    };
  },
};
</script>

<template>
  <v-dialog
    v-model="isVisible"
    persistent
    width="500"
  >
    <v-card>
      <v-card-title class="text-h5">
        Add Substition
      </v-card-title>

      <v-card-text>
        <v-autocomplete
          v-model="formData.outPlayer"
          :items="lineups"
          outlined
          dense
          clearable
          item-text="name"
          label="Out Player"
        />

        <v-autocomplete
          v-model="formData.inPlayer"
          :items="substitutePlayers"
          outlined
          dense
          clearable
          item-text="name"
          label="In Player"
        />
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />

        <v-btn
          text small
          color="error"
          @click="$emit('closeDialog')"
        >
          Cancel
        </v-btn>

        <v-btn
          small depressed
          color="success"
        >
          I accept
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
