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
      <v-btn depressed color="#F4F7FA" @click="toDashboard"> Dashboard </v-btn>
      <v-btn depressed color="#F4F7FA" @click="toResearch"> Research </v-btn>
      <v-btn depressed color="#F4F7FA" @click="toInsight"> Insight </v-btn>
      <v-btn depressed color="#F4F7FA" @click="toSurvey"> Screening Survey </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="#F4F7FA"
            depressed
            v-bind="attrs"
            v-on="on"
          > Trash Bin
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title><v-btn color="white" @click="toTrashBinRiset" depressed>Research</v-btn></v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title><v-btn color="white" @click="toTrashBinInsight" depressed>Insight</v-btn></v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title><v-btn color="white" @click="toTrashBinUser" depressed>User</v-btn></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
  name: 'NavbarRiset',
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
    toInsight () {
      this.$router.push('/insight')
    },
    toSurvey () {
      this.$router.push('/survey')
    },
    toResearch () {
      this.$router.push('/list-riset')
    },
    toDashboard () {
      this.$router.push('/dashboard')
    },
    toTrashBinRiset () {
      this.$router.push('/trash-bin/riset')
    },
    toTrashBinInsight () {
      this.$router.push('/trash-bin/insight')
    },
    toTrashBinUser () {
      this.$router.push('/trash-bin/user')
    }
  }
}
</script>
