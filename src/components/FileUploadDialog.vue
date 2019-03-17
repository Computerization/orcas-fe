<template>
    <div class="text-xs-center">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
                <v-btn color="pink" dark absolute bottom right fab v-on="on">
                    <v-icon>add</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Choose a File
                </v-card-title>

                <v-card-text>

                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field id="fid" type="file"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>

                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click="upload()">
                        Upload
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
                dialog: false,
            };
        },
        methods: {
            upload() {
                let files = document.getElementById('fid');
                let file = files.files[0];
                console.log(files.files[0]);
                let formdata = new FormData();
                formdata.append('file', file);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                this.$axios.post('api/v1/file', formdata, config).then((res) => {
                    this.dialog = false;
                    this.$emit('uploadSuccess');
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    };
</script>