<template>
  <v-container class="pa-2">
    <v-layout row wrap>
      <v-flex v-for="homework in homeworks" :key="homework.id" xs12 sm6 md4 class="pa-2">
        <Homework :homework="homework" @showReplyDialog="openReplyDialog"/>
      </v-flex>
    </v-layout>
    <ReplyTodoDialog :replyTodoDialog="showReplyDialog" :todoId="replyDialogTodoId"></ReplyTodoDialog>
  </v-container>
</template>

<script>
import Homework from '../components/Homework'
import ReplyTodoDialog from '../components/ReplyTodoDialog'
  export default {
    data: () => ({
      homeworks: [],
      showReplyDialog: false,
      replyDialogTodoId: null,
    }),
    methods: {
      homeworkInit () {
        this.homeworks = [];
        this.$axios
        .get('api/v1/init')
        .then((response) => {
          let data = response.data;
          // console.log(data);
          for(let team of data){
            // console.log(team);
            for(let homework of team.todos){
              // console.log(homework);
              this.homeworks.push({
                id: homework.id,
                due: homework.todo_due,
                title: homework.todo_title,
                content: homework.todo_content
              });
            }
          }
        });
      },
      openReplyDialog (data) {
        this.replyDialogTodoId = data.todoId;
        this.showReplyDialog = true;
      }
    },
    created () {
      this.homeworkInit();
      // this.openReplyDialog();
    },
    components: {
      Homework,
      ReplyTodoDialog
    }
  }
</script>
