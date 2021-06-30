<script>
export default { /* eslint-disable */
  name: 'Home',
  data() {
    return {
      recent: [
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Jason Oner',
        },
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Mike Carlson',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Cindy Baker',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Ali Connors',
        },
      ],
    }
  },
};
</script>

<template>
  <v-container style="background-color: white; border-radius: 10px">
    <v-toolbar flat dense>
      Toolbar
    </v-toolbar>

    <v-row justify="center">
      <v-col class="text-center" cols="4">
        <v-card
          class="pa-2"
          width="50vw"
        >
          <v-card-text>
            <v-list subheader>
              <v-subheader class="text-h5">All Players</v-subheader>

              <v-list-item
                v-for="chat in recent"
                :key="chat.title"
              >
                <v-list-item-avatar>
                  <v-img
                    :alt="`${chat.title} avatar`"
                    :src="chat.avatar"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="chat.title"></v-list-item-title>
                  <v-list-item-subtitle>Test</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn small text color="success">PICK</v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col class="text-center" cols="4">
        <v-card
          class="pa-2"
          width="50vw"
        >
          <v-card-title>
            Lineup
          </v-card-title>

          <v-card-text>
            jk
          </v-card-text>
        </v-card>
      </v-col>

      <v-col class="text-center" cols="4">
        <v-card
          class="pa-2"
          width="50vw"
        >
          <v-card-title>
            Substitutes
          </v-card-title>

          <v-card-text>
            jk
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
