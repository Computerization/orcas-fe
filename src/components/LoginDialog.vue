<template>
  <v-layout row justify-center>
    <v-dialog v-model="loginDialog" persistent max-width="400">
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

              <v-flex xs12>
                <v-text-field label="Email" type="email" v-model="email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" type="password" v-model="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="tryLogin()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>

  export default {
    data () {
      return {
        loginDialog: false,
        email: null,
        password: null
      }
    },
    methods: {
      showLoginDialog() {
        // alert('Hi');
        this.loginDialog = true;
      },
      tryLogin() {
        // alert('Hi')
        this.$axios.post('http://localhost/api/v1/login', {
          email: this.email,
          password: this.password
        })
        .then((response) => {
          // console.log(response.status);
          let data = response.data;
          if(data.status == 1){
            this.loginDialog = false;
            this.$emit('loginSuccess');
          }else{
            alert('Login Failed');
          }
        })
      }
    }
  }
</script>