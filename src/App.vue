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
          <v-col cols="auto">
            SCOUTIUM
          </v-col>

          <v-spacer />

          <v-col cols="auto">
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
  @font-face {
    font-family: "SofiaProLight";
    src: local("SofiaProLight"),
    url('./fonts/Mostardesign-SofiaProLight.otf');
  }

  @font-face {
    font-family: "SofiaProRegular";
    src: local("SofiaProRegular"),
    url('./fonts/Mostardesign-SofiaProRegular.otf');
  }

  .sofia-pro-title {
    font-size: 20px;
    font-weight: 600;
    color: #2B2C3F;
    font-family: "SofiaProLight";
  }

  .sofia-pro-subtitle {
    font-size: 16px;
    font-weight: 600;
    color: #2B2C3F;
    font-family: "SofiaProLight";
  }

  .sofia-pro-caption {
    font-size: 14px;
    color: #9699BE;
    font-family: "SofiaProRegular";
  }

  .app__bar {
    padding-left: 14vw;
    padding-right: 12vw;

      &--title {
        color: #12C990;
        font-size: 24px;
        font-family: "SofiaPro";
        font-weight: bold;
      }
  }
</style>
