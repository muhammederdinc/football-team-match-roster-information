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
  methods: {
    submit() {
      this.formData.outPlayer.substitutionMinute = this.formData.substitutionMinute;
      this.formData.inPlayer.substitutionMinute = this.formData.substitutionMinute;

      this.$emit('substitution', this.formData);
      this.closeDialog();
    },
    closeDialog() {
      this.$emit('closeDialog');
    },
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
        <span class="sofia-pro-title">Add Substition</span>
      </v-card-title>

      <v-card-text>
        <v-autocomplete
          v-model="formData.outPlayer"
          :items="lineups"
          dense
          outlined
          clearable
          return-object
          label="Out Player"
          item-text="display_name"
        />

        <v-autocomplete
          v-model="formData.inPlayer"
          :items="substitutePlayers"
          dense
          outlined
          clearable
          return-object
          label="In Player"
          item-text="display_name"
        />

        <v-text-field
          v-model="formData.substitutionMinute"
          placeholder="Enter Minute Of Substitution"
          label="Substitution Minute"
          type="number"
          outlined
          dense
        />
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />

        <v-btn
          text small
          color="error"
          @click="closeDialog"
        >
          Cancel
        </v-btn>

        <v-btn
          small depressed
          color="success"
          @click="submit"
        >
          I accept
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
