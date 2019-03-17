<template>
    <div class="text-xs-center">
        <v-dialog v-model="createTodoDialog" width="500">
            <template v-slot:activator="{ on }">
                <v-btn color="pink" dark absolute bottom right fab v-on="on">
                    <v-icon>add</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Create a Homework
                </v-card-title>

                <v-card-text>

                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="Title" v-model="title" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-textarea label="Content" v-model="content" box></v-textarea>
                            </v-flex>
                            <v-flex xs12>
                                <v-menu ref="menu" v-model="due" :close-on-content-click="false" :nudge-right="40"
                                    :return-value.sync="date" lazy transition="scale-transition" offset-y full-width>
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="date" label="Pick a Deadline" prepend-icon="event"
                                            readonly v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="date" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
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
                createTodoDialog: false,
                title: null,
                content: null,
                due: null,
                teamId: this.$route.params.id
            };
        },
        methods: {
            submit() {
                this.$axios.post('http://localhost/api/v1/team/'+this.teamId+'/todos', {
                        todo_type: 1,
                        todo_title: this.title,
                        todo_content: this.content,
                        todo_due: this.due
                    })
                    .then((response) => {
                        // console.log(response.status);
                        let data = response.data;
                        if (data.status == 1) {
                            this.createTodoDialog = false;
                            this.$emit('createTodoSuccess');
                        } else {
                            alert('Create TODO Failed.');
                            console.log(data);
                        }
                    })
            }
        }
    };
</script>