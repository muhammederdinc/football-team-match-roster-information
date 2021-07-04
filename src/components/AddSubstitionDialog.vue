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
      isValid: true,
      formData: {},
      substitutionMinuteRules: [
        (v) => !!v || 'Substitution minute is required',
        (v) => (v >= 0 && v <= 90) || 'The entered value must be between 0 and 90',
      ],
    };
  },
  computed: {
    isSubmitButtonDisable() {
      const { outPlayer, inPlayer, substitutionMinute } = this.formData;
      const substitutionMinuteRule = substitutionMinute >= 0 && substitutionMinute <= 90;

      return !(outPlayer && inPlayer && substitutionMinuteRule);
    },
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.formData.outPlayer.substitutionMinute = this.formData.substitutionMinute;
        this.formData.inPlayer.substitutionMinute = this.formData.substitutionMinute;

        this.$emit('substitution', this.formData);
        this.closeDialog();
      }
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
    width="350"
  >
    <v-card>
      <v-card-title class="text-h5 py-2">
        <span class="sofia-pro-subtitle">Add Substition</span>
      </v-card-title>

      <v-card-text class="pb-1 my-0">
        <v-form
          v-model="isValid"
          ref="form"
        >
          <v-row no-gutters>
            <v-col class="pb-2" cols="12">
              <span class="sofia-pro-form">
                OUT PLAYER
              </span>

              <v-autocomplete
                v-model="formData.outPlayer"
                :items="lineups"
                :rules="[v => !!v || 'Out player is required']"
                dense
                outlined
                clearable
                return-object
                hide-details="auto"
                item-text="display_name"
                placeholder="Enter player name"
              />
            </v-col>

            <v-col class="pb-2" cols="12">
              <span class="sofia-pro-form">
                IN PLAYER
              </span>

              <v-autocomplete
                v-model="formData.inPlayer"
                :items="substitutePlayers"
                :rules="[v => !!v || 'In player is required']"
                dense
                outlined
                clearable
                return-object
                hide-details="auto"
                item-text="display_name"
                placeholder="Enter player name"
              />
            </v-col>

            <v-col>
              <span class="sofia-pro-form">
                SUBSTITUTION MINUTE
              </span>

              <v-text-field
                v-model="formData.substitutionMinute"
                :rules="substitutionMinuteRules"
                placeholder="Enter Minute Of Substitution"
                hide-details="auto"
                outlined
                dense
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="px-6 py-3">
        <v-spacer />

        <v-btn
          text x-small
          color="error"
          @click="closeDialog"
        >
          Cancel
        </v-btn>

        <v-btn
          small depressed
          :disabled="isSubmitButtonDisable"
          color="lightRoyalBlue"
          width="100px"
          class="pa-4 white--text text-capitalize"
          @click="submit"
        >
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
