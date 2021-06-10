<template>
<span>
    <v-app-bar
      app
      color="#F4F7FA"
      elevation="0"
    >
      <div class="d-flex align-center" >
        <v-img
          alt="Pinhome Logo"
          class="shrink ml-5"
          contain
          src="../../assets/pinhome.png"
          transition="scale-transition"
          width="180"
        />
      </div>
        <div class="d-flex align-center ml-auto">
        <v-btn depressed color="#F4F7FA" @click="toUser"> User </v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="#F4F7FA"
              depressed
              v-bind="attrs"
              v-on="on"
            > Logged in
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title><v-btn color="white" @click="logout">Logout</v-btn></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
  </v-app-bar>
  <router-view></router-view>
  </span>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      currentUser: ''
    }
  },
  mounted () {
    this.$nextTick(function () {
      const username = JSON.parse(localStorage.getItem('user')).username
      this.currentUser = username
    })
  },
  methods: {
    logout () {
      console.log('Logging out ...')
      localStorage.removeItem('user')
      this.$router.push('/login')
    },
    toUser () {
      this.$router.replace('/user')
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
</style>
