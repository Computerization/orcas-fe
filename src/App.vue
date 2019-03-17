<template>
  <v-app id="sandbox">
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      absolute
      overflow
      app
    >
    

     <v-list class="pt-0" subheader>
      <v-subheader>Account</v-subheader>
      <v-list-tile
        v-for="drawerItem in drawerItems"
        :key="drawerItem.title"
        :to="drawerItem.to"
      >
        <v-list-tile-action>
          <v-icon>{{ drawerItem.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ drawerItem.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-divider></v-divider>

     <v-list subheader>
          <v-subheader>Classes</v-subheader>
          <v-list-tile
            v-for="teamItem in teamItems"
            :key="teamItem.title"
            :to="teamItem.to"
            avatar
          >
            <!-- <v-list-tile-avatar>
              <img :src="teamItem.avatar">
            </v-list-tile-avatar> -->

            <v-list-tile-content>
              <v-list-tile-title v-html="teamItem.teamName"></v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>
        </v-list>

    </v-navigation-drawer>

    <v-toolbar app absolute>
      <v-toolbar-side-icon
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-toolbar-side-icon>
      <v-toolbar-title>SAM Evolution</v-toolbar-title>
      
    </v-toolbar>

    <v-content>
      <v-container fluid class="pa-0">

        <router-view></router-view>

      </v-container>
    </v-content>
    <!-- <v-footer inset app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
    <loginDialog ref="loginDialog" @loginSuccess="globalInit"></loginDialog>
  </v-app>
</template>

<script>

import loginDialog from './components/LoginDialog';

export default {
    data: () => ({
      primaryDrawer: {
        model: null,
      },
      tabs: null,
      teamItems: [],
      drawerItems: [
          { title: 'Home', icon: 'dashboard', to: '/' },
          { title: 'Calendar', icon: 'dashboard', to: '/calendar' },
          { title: 'Files', icon: 'dashboard', to: '/file' },
          { title: 'Forms', icon: 'dashboard', to: '/form' },
          { title: 'Reservations', icon: 'dashboard', to: '/reservation' }
        ],
      right: null,
      
    }),
    mounted: function () {
      this.$axios
        .get('api/v1/user')
        .then((response) => {
          let data = response.data;
            let status = data.status;
            if(status == 0){
              this.showLoginDialog();
            }else{
              this.globalInit();
            }
        });

    },
    methods: {
      showLoginDialog () {
        this.$refs.loginDialog.showLoginDialog();
      },
      globalInit () {
        // alert('Login Success');
        this.$axios
        .get('api/v1/init')
        .then((response) => {
          let data = response.data;
          console.log(data);
          for(let team of data){
            this.teamItems.push({
              teamName: team.team_name,
              id: team.id,
              to: '/team/'+team.id+'/'
            })
          }
        });
      },
      // loadTeam (teamId) {
        // alert(teamId);
      // }
    },
    components:{
      loginDialog
    }
  }
</script>
