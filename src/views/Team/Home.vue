<template>
  <v-container class="pa-2">
    <v-layout row wrap>
      <v-flex v-for="homework in teamHomeworks" :key="homework.id" xs12 sm6 md4 class="pa-2">
        <Homework :homework="homework" />
      </v-flex>
    </v-layout>
    <CreateHomeworkDialog @createTodoSuccess="teamHomeworkInit()"></CreateHomeworkDialog>
  </v-container>
</template>

<script>
import Homework from '../../components/Homework'
import CreateHomeworkDialog from '../../components/CreateHomeworkDialog'
  export default {
    data: () => ({
      teamHomeworks: []
    }),
    methods: {
      teamHomeworkInit () {
        this.teamHomeworks = [];
        this.$axios
        .get('api/v1/team/'+this.$route.params.id+'/todos')
        .then((response) => {
          let data = response.data;
          console.log(data);
            for(let homework of data){
              this.teamHomeworks.push({
                id: homework.id,
                due: homework.todo_due,
                title: homework.todo_title,
                content: homework.todo_content
              });
            }
        });
      }
    },
    created () {
      // alert('Hi');
      // // console.log(this.$route.params.id);
      this.teamHomeworkInit();
    },
    components: {
      Homework,
      CreateHomeworkDialog
    }
  }
</script>
