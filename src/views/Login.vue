<template>
<span>
   <v-card
      class="d-flex justify-center"
      elevation="0">
      <v-card>
      </v-card>
      <v-card class="front mr-2 mb-auto mt-auto" elevation="0">
          <h1 class="mt-15 ml-7">Welcome to PinInsight</h1>
          <p class="ml-7">Sistem pengelolaan Insight PinHome</p>
      </v-card>
    <v-card elevation="0" class="mb-auto mt-auto ml-2">
    <form name="form" @submit.prevent="handleLogin">
        <v-container>
          <v-row>
            <v-spacer></v-spacer>
          </v-row>
        <v-row>
        <v-card elevation="0" class="ml-auto mr-auto mt-10">
            <h2 class="text-center mb-3">Login</h2>
          <v-text-field
          v-model="username"
            outlined
            label="Username"
            prepend-inner-icon="mdi-account-circle"
          ></v-text-field>
           <v-text-field
           outlined
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 6 characters"
            counter
            prepend-inner-icon="mdi-lock  "
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-card>
        </v-row>
        <v-row>
            <v-btn
            type="Submit"
            color="primary"
            :style="{background: gradient}"
            class="ml-auto mr-auto px-15">Login</v-btn>
        </v-row>
        <v-row>
          <a @click="daftar" class="ml-auto mr-auto mt-4">Go to Participant Page</a>
        </v-row>
        </v-container>
    </form>
    </v-card>
   </v-card>
</span>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@600&display=swap');

h1, h2, p{
  font-family: 'Source Sans Pro';
}
.d-flex{
  min-height:100vh;
}
.front{
  background-image: url('~@/assets/pinhome2.png');
  min-height:65vh;
  min-width:57vw;
}
</style>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
export default {
  metaInfo: { title: 'Login Page' },
  name: 'Login',
  data () {
    return {
      url: 'http://localhost:2020',
      colors: [
        { id: 0, hex: '#1261A0', disabled: false },
        { id: 1, hex: '#0088BB', disabled: false }
      ],
      show1: false,
      username: '',
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters'
      }
    }
  },
  computed: {
    gradient () {
      let colors = 'linear-gradient(0deg'
      this.colors.forEach(function (e) {
        colors += ',' + e.hex
      })
      colors += ')'
      return colors
    }
  },
  methods: {
    async handleLogin () {
      try {
        const response = await axios.post(this.url + '/api/auth/signin', {
          username: this.username,
          password: this.password
        })
        console.log(response)
        localStorage.setItem('user', JSON.stringify(response.data))
        //  console.log(localStorage.getItem('user'))
        if (response.data.roles.includes('ROLE_ADMIN')) {
          this.$router.push('/user')
        } else if (response.data.roles.includes('ROLE_RESEARCHER')) {
          this.$router.push('/survey')
        } else if (response.data.roles.includes('ROLE_HEAD_OF_RESEARCHER')) {
          this.$router.push('/dashboard')
        }
      } catch (error) {
        this.$toasted.show('Invalid Username or Password!', {
          type: 'error',
          position: 'bottom-center',
          iconPack: 'mdi-checkbox-marked-circle'
        }).goAway(3000)
      }
    },
    daftar () {
      this.$router.push('/daftar')
    }
  }
}
</script>
