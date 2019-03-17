<template>

  <v-container pa-0>
    <v-list two-line subheader>

      <v-subheader inset>Files</v-subheader>

      <v-list-tile v-for="file in files" :key="file.key" avatar :href="file.downloadPath">
        <v-list-tile-avatar>
          <v-icon :class="[file.iconClass]">{{ file.icon }}</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ file.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ file.subtitle }}</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn icon ripple>
            <v-icon color="grey lighten-1">info</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <ShareFileWithTeamDialog @toggleFileSuccess="loadTeamFiles()"></ShareFileWithTeamDialog>
  </v-container>

</template>

<script>
import ShareFileWithTeamDialog from '../../components/ShareFileWithTeamDialog'

  export default {
    data() {
      return {
        files: [],
        teamId: this.$route.params.id
      }
    },
    created() {
      // console.log(123);
      this.loadTeamFiles();
    },
    methods: {
      loadTeamFiles() {
        this.files = [];
        // console.log('api/v1/team/'+this.teamId+'/file');
        this.$axios
          .get('api/v1/team/'+this.teamId+'/file')
          .then((response) => {
            let data = response.data;
            // console.log(data);
            for (let file of data) {
              this.files.push({
                id: file.id,
                key: 'teamfile'+file.id,
                icon: 'assignment',
                iconClass: 'blue white--text',
                title: file.file_name,
                subtitle: file.created_at,
                downloadPath: '/api/v1/team/'+this.teamId+'/file/' + file.id
              });
            }
          });
      }
    },
    components: {
      ShareFileWithTeamDialog
    }
  }
</script>