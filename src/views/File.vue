<template>

  <v-container pa-0>
    <v-list two-line subheader>

      <v-subheader inset>Files</v-subheader>

      <v-list-tile v-for="file in files" :key="file.id" avatar :href="file.downloadPath">
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
    <FileUploadDialog @uploadSuccess="loadFiles()"></FileUploadDialog>
  </v-container>

</template>

<script>

import FileUploadDialog from '../components/FileUploadDialog'

  export default {
    data() {
      return {
        files: []
      }
    },
    created() {
      this.loadFiles();
    },
    methods: {
      loadFiles() {
        this.files = [];
        this.$axios
          .get('api/v1/file')
          .then((response) => {
            let data = response.data;
            // console.log(data);
            for (let file of data) {
              this.files.push({
                id: file.id,
                icon: 'assignment',
                iconClass: 'blue white--text',
                title: file.file_name,
                subtitle: file.created_at,
                downloadPath: '/api/v1/file/' + file.id
              });
            }
          });
      }
    },
    components: {
      FileUploadDialog
    }
  }
</script>