<script>
export default {
  name: 'App',
};
</script>

<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-spacer />

        <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
        />
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
