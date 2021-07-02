<script>
export default {
  name: 'App',
};
</script>

<template>
  <v-app id="inspire">
    <v-app-bar
      color="#02063F"
      class="app__bar"
      app
      flat
    >
      <v-container class="py-0 fill-height app__bar--title">
        <v-row>
          <v-col cols="auto" offset="2">
            SCOUTIUM
          </v-col>

          <v-spacer />

          <v-col offset="4">
            <v-avatar
              class="mr-10"
              color="grey darken-1"
              size="32"
            >
              <img
                alt="Avatar"
                src="https://avatars0.githubusercontent.com/u/9064060"
              >
            </v-avatar>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
  .app__bar {
    &--title {
      color: #12C990;
      font-size: 24px;
      font-family: "SofiaPro, Regular, 20px";
      font-weight: bold;
    }
  }
</style>
