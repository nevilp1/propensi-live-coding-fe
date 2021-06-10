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
          src="../assets/pinhome.png"
          transition="scale-transition"
          width="180"
        />
      </div>
    </v-app-bar>
    <v-card color="#F4F7FA">
        <div class="ml-5 py-7">
        <v-card-title class="ph-font blue--text text--darken-3"><b>Pinhome Research</b></v-card-title>
        <v-card-subtitle class="ph-font blue--text text--darken-3   ">Temukan riset yang sesuai dengan anda dan menangkan hadiah menarik dari Pinhome</v-card-subtitle>
        </div>
    </v-card>
    <v-card class="py-6 px-10 elevation-4" v-for="item in list"
    :key="item">
        <v-card-title class="ph-font mx-12"><b>{{item.researchTitle}}</b></v-card-title>
        <v-card-subtitle class="ph-font mx-12">Tanggal dibuat: {{format_date(item.inputDate)}}</v-card-subtitle>
        <v-card-text class="ph-font mx-12">Criteria:</v-card-text>
            <li class="ph-font" v-for="p in item.content.split('\n')"
            :key="p">{{p}}</li>
        <v-btn class="primary mx-15 my-7 " @click="goToLink(item)">Daftar</v-btn>
    </v-card>
</span>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
Vue.use(VueAxios, axios)
export default {
  metaInfo: { title: 'Participant Recruitment Page' },
  data () {
    return { url: 'http://localhost:2020', list: undefined, bar: ['Log out'] }
  },
  mounted () {
    Vue.axios.get(this.url + '/api/surveys')
      .then((resp) => {
        this.list = resp.data
      })
  },
  methods: {
    goToLink: function (item) {
      // window.open(item.linkToForm, '_blank')
      this.$router.push('/daftar/' + item.id)
    },
    logout () {
      console.log('Logging out ...')
      localStorage.removeItem('user')
      this.$router.push('/login')
    },
    format_date (value) {
      if (value) {
        return moment(String(value)).format('ddd, DD MMM YYYY HH:mm:ss')
      }
    }
  }
}
</script>

<style lang="scss">
.v-btn {
  text-transform: unset !important;
}
</style>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
.ph-font {
    font-family:'Source Sans Pro';
}
#background{
    height:600px;
}
li{
    margin-left:100px;
}
.v-btn {
    font-family:'Source Sans Pro';
}
</style>
