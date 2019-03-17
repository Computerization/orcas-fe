<template>

  <v-container pa-0>
    <v-list two-line subheader>

      <v-subheader inset>Members</v-subheader>

      <v-list-tile v-for="member in members" :key="member.key" avatar>
        <v-list-tile-avatar>
          <v-icon :class="[member.iconClass]">{{ member.icon }}</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ member.title }}</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn icon ripple>
            <v-icon color="grey lighten-1">info</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <ToggleMemberDialog @toggleMemberSuccess="loadTeamMembers()"></ToggleMemberDialog>
  </v-container>

</template>

<script>
import ToggleMemberDialog from '../../components/ToggleMemberDialog'
  
  export default {
    data() {
      return {
        members: [],
        teamId: this.$route.params.id
      }
    },
    created() {
      // console.log(123);
      this.loadTeamMembers();
    },
    methods: {
      loadTeamMembers() {
        this.members = [];
        // console.log('api/v1/team/'+this.teamId+'/member');
        this.$axios
          .get('api/v1/team/'+this.teamId+'/members')
          .then((response) => {
            let data = response.data;
            // console.log(data);
            for (let member of data) {
              this.members.push({
                id: member.id,
                key: 'teammember'+member.id,
                icon: 'edit',
                iconClass: 'blue white--text',
                title: member.name
              });
            }
          });
      }
    },
    components: {
      ToggleMemberDialog
    }
  }
</script>