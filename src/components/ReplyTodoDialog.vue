<template>
    <div class="text-xs-center">
        <v-dialog v-model="replyTodoDialog" width="500">

            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Submit a Homework
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
                fileId: null,
                content: null,
                replyId: NaN
            };
        },
        computed: {
            replyTodoDialog: {
                get() {
                    return this.$store.state.replyTodoDialog
                },
                set(value) {
                    this.$store.commit('closeReplyDialog')
                }
            },
            todoId() {
                return this.$store.state.todoId
            },
            teamId() {
                return this.$store.state.teamId
            }

        },
        methods: {
            submit() {
                this.$axios.post('http://localhost/api/v1/team/' + this.teamId + '/todo/' + this.todoId + '/reply', {
                        reply_content: this.content
                    })
                    .then((response) => {
                        console.log(response);
                        let data = response.data;
                        this.replyId = data.id;
                        console.log(data.id);
                        // if (data.status == 1) {
                        // } else {
                        // alert('Create Reply Failed.');
                        // console.log(data);
                        // }
                        if (this.fileId) {
                            this.$axios.post('http://localhost/api/v1/reply/' + this.replyId + '/file/' + this.fileId +
                                    '/toggle', {})
                                .then((response) => {
                                    console.log(response);
                                    let data = response.data;
                                    this.replyTodoDialog = false;

                                });
                        }
                    });
                // console.log(this.replyId);
            }
        },
        // props: [
        //     'replyTodoDialog', 'todoId'
        // ]
    };
</script>