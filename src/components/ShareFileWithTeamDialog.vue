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
                    Share a File with Team
                </v-card-title>

                <v-card-text>

                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="File ID" v-model="fileId" required></v-text-field>
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
                fileId: null,
                teamId: this.$route.params.id
            };
        },
        methods: {
            submit() {
                this.$axios.post('http://localhost/api/v1/team/'+this.teamId+'/file/'+this.fileId, {
                    })
                    .then((response) => {
                        // console.log(response.status);
                        let data = response.data;
                        if (data.status == 1) {
                            this.createTodoDialog = false;
                            this.$emit('toggleFileSuccess');
                        } else {
                            alert('Share File Failed.');
                            console.log(data);
                        }
                    })
            }
        }
    };
</script>