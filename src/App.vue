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
        v-for="item in items"
        :key="item.title"
        @click=""
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-divider></v-divider>

     <v-list subheader>
          <v-subheader>Classes</v-subheader>
          <v-list-tile
            v-for="drawerItem in drawerItems"
            :key="drawerItem.title"
            @click=""
            avatar
          >
            <v-list-tile-avatar>
              <img :src="drawerItem.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="drawerItem.title"></v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>
        </v-list>

    </v-navigation-drawer>

    <v-toolbar app absolute tabs>
      <v-toolbar-side-icon
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-toolbar-side-icon>
      <v-toolbar-title>SAM Evolution</v-toolbar-title>
      <template v-slot:extension>
        <v-tabs
          v-model="tabs"
          fixed-tabs
          color="transparent"
        >
          <v-tabs-slider></v-tabs-slider>
          
          <v-tab
            v-for="navItem in navItems"
            :key="navItem"
          >
            {{ navItem }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <!-- <v-layout align-center justify-center> -->
          <!-- <v-flex xs10>
            <v-card>
              <h1>Hello</h1>
            </v-card>
          </v-flex> -->

          <!-- Calendars -->
          <!-- Hello -->


        <!-- </v-layout> -->


        <v-layout wrap>
          <v-flex
            xs12
            class="mb-3"
          >
            <v-sheet height="500">
              <v-calendar
                ref="calendar"
                v-model="start"
                :type="type"
                :end="end"
                color="primary"
              ></v-calendar>
            </v-sheet>
          </v-flex>

          <v-flex
            sm4
            xs12
            class="text-sm-left text-xs-center"
          >
            <v-btn @click="$refs.calendar.prev()">
              <v-icon
                dark
                left
              >
                keyboard_arrow_left
              </v-icon>
              Prev
            </v-btn>
          </v-flex>
          <v-flex
            sm4
            xs12
            class="text-xs-center"
          >
            <v-select
              v-model="type"
              :items="typeOptions"
              label="Type"
            ></v-select>
          </v-flex>
          <v-flex
            sm4
            xs12
            class="text-sm-right text-xs-center"
          >
            <v-btn @click="$refs.calendar.next()">
              Next
              <v-icon
                right
                dark
              >
                keyboard_arrow_right
              </v-icon>
            </v-btn>
          </v-flex>
        </v-layout>


      </v-container>
    </v-content>
    <v-footer inset app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      primaryDrawer: {
        model: null,
      },
      navItems: [
        'home', 'homework', 'calendars', 'forms', 'reservations'
      ],
      tabs: null,
      drawerItems: [
        { active: true, title: 'Math Wade', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { active: true, title: 'Math HLC 12th Grade', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { title: 'Chemistry SL 12th Grade', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { title: 'Physics HL 12th Grade', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' }
      ],
      items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
      right: null,

      //calendars
      type: 'month',
      start: '2019-01-01',
      end: '2019-01-06',
      typeOptions: [
        { text: 'Day', value: 'day' },
        { text: '4 Day', value: '4day' },
        { text: 'Week', value: 'week' },
        { text: 'Month', value: 'month' },
        { text: 'Custom Daily', value: 'custom-daily' },
        { text: 'Custom Weekly', value: 'custom-weekly' }
      ]
      
    })
  }
</script>
