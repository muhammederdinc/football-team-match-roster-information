<script>
export default {
  name: 'App',
};
</script>

<template>
  <v-app id="inspire">
    <v-app-bar
      color="nightBlue"
      class="app-bar"
      app
      flat
    >
      <v-container class="py-0 fill-height app-bar__container">
        <v-row>
          <v-col cols="auto">
            Create Football Team
          </v-col>

          <v-spacer />

          <v-col class="d-none d-sm-flex" cols="auto">
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
  .app-bar {
    padding-left: 14vw;
    padding-right: 12vw;

      &__container {
        color: #12C990;
        font-size: 24px;
        font-family: "SofiaProBold";
      }
  }
</style>
