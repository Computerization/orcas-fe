<template>
  <v-container class="pa-0">
        <v-tabs
          v-model="tabs"
          fixed-tabs
          color="blue"
          dark
        >
          <v-tabs-slider></v-tabs-slider>
          
          <v-tab
            v-for="navItem in navItems"
            :key="navItem"
            :to="navItem.to"
          >
            {{ navItem.name }}
          </v-tab>
        </v-tabs>
  <router-view></router-view>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      navItems: [
        {
          name: 'homework',
          to: 'home'
        },
        {
          name: 'file',
          to: 'file'
        },
                {
          name: 'member',
          to: 'member'
        }
      ],
    })
  }
</script>
