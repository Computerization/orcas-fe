<template>
    <div class="text-xs-center">
        <v-dialog v-model="replyTodoDialog" width="500">

            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Add a Member to This Team
                </v-card-title>

                <v-card-text>

                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="Todo ID" v-model="todoId" readonly></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="File ID" v-model="fileId"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-textarea label="Content" v-model="content" box></v-textarea>
                            </v-flex>
                        </v-layout>
                    </v-container>

                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click="submit()">
                        Submit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                replyTodoDialog: false,
                todoId: null,
                teamId: this.$route.params.id
            };
        },
        methods: {
            submit() {
                this.$axios.post('http://localhost/api/v1/team/'+this.teamId+'/file/'+this.fileId+'/toggle', {
                        
                    })
                    .then((response) => {
                        // console.log(response.status);
                        let data = response.data;
                        if (data.status == 1) {
                            this.replyTodoDialog = false;
                            this.$emit('toggleMemberSuccess');
                        } else {
                            alert('Share Member Failed.');
                            console.log(data);
                        }
                    })
            }
        },
        props: [
            'replyTodoDialog', 'todoId'
        ]
    };
</script>