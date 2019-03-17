<template>
    <div class="text-xs-center">
        <v-dialog v-model="toggleMemberDialog" width="500">
            <template v-slot:activator="{ on }">
                <v-btn color="pink" dark absolute bottom right fab v-on="on">
                    <v-icon>add</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Add a Member to This Team
                </v-card-title>

                <v-card-text>

                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="User ID" v-model="fileId" required></v-text-field>
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
                toggleMemberDialog: false,
                fileId: null,
                teamId: this.$route.params.id
            };
        },
        methods: {
            submit() {
                this.$axios.get('http://localhost/api/v1/team/'+this.teamId+'/member/'+this.fileId+'/toggle', {
                    })
                    .then((response) => {
                        // console.log(response.status);
                        let data = response.data;
                        if (data.status == 1) {
                            this.toggleMemberDialog = false;
                            this.$emit('toggleMemberSuccess');
                        } else {
                            alert('Share Member Failed.');
                            console.log(data);
                        }
                    })
            }
        }
    };
</script>