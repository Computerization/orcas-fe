<template>
<v-card
    class="mx-auto"
    >
    <v-card-title primary-title class="blue pa-3">
        <h4 class="font-weight-bold display-1 white--text">
            {{ homework.title }}
        </h4>
        <!-- <div> {{ homework.content }} </div> -->
    </v-card-title>
    <v-card-text>
        {{ homework.content }}
    </v-card-text>

    <v-divider></v-divider>

    <v-list-tile
        v-for="file in homework.files"
        :key="file.name"
        :to="file.url"
        class="orange--text"
      >
        <v-list-tile-action>
          <v-icon>attachment</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ file.name }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    <v-card-actions>
        <v-btn flat color="blue" @click="showReplyDialog(homework.id)">Submit</v-btn>
        <v-btn flat color="blue" @click="showReplyListDialog()">All Replies</v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
export default {
    data: () => ({
        
    }),
    methods: {
      showReplyDialog () {
        this.$store.commit('showReplyDialog', this.homework);
      },
      showReplyListDialog () {
        this.$store.commit('showReplyListDialog', this.homework);
      }
    },
    props: [
        "homework"
    ]
}
</script>