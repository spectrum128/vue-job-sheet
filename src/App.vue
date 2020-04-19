<template>
  <v-app>
    <v-app-bar
      app
      color="green lighten-3"
      dark
    >
      <div class="d-flex align-center">
        Job Sheet Builder
      </div>

      <v-spacer></v-spacer>

      
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {
   
  },

  data: () => ({
    //
  }),
};
</script>
