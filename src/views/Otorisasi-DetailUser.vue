<template>
  <v-card class="root-otorisasi" flat>
    <v-container>
    <v-row class="mb-9">
      <v-breadcrumbs
          :items="breadcrumbData"
          large
          style="padding-left: 0px; margin-top:2px;"
        ></v-breadcrumbs>
    </v-row>
        <v-row>
            <v-col cols="12" sm="12">
                <h2 class="mb-2">{{list.nama}}</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="3">
                <h4>ID User</h4>
                <p>ID-{{list.id}}</p>
            </v-col>
             <v-col cols="12" sm="3">
                <h4>Team</h4>
                <p>{{list.team}}</p>
            </v-col>
            <v-col cols="12" sm="3">
                <h4>Username</h4>
                <p>{{list.username}}</p>
            </v-col>
            <v-col cols="12" sm="3">
                <h4>Email</h4>
                <p>{{list.email}}</p>
            </v-col>
        </v-row>
        <v-row>
             <v-col cols="12" sm="3">
                <h4>Role</h4>
                <p>{{list.role[0].name.substring(5)}}</p>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row style="margin-top: 30px;">
            <v-col
              cols="12"
            >
            <v-btn
                large
                min-width="152px"
                outlined
                color="primary"
                class="marginButtonLeft"
                @click="$router.push('/user/')">
                Back
            </v-btn>
            <v-dialog
              transition="dialog-top-transition"
              max-width="600"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  large
                  min-width="146px"
                  outlined
                  color="error"
                  class="marginButton"
                  v-bind="attrs"
                  v-on="on"
                >Archive</v-btn>
              </template>
              <template v-slot:default="dialog">
                <v-card>
                  <v-toolbar>
                    <v-spacer />
                    <v-toolbar-title
                    style="color: #2790CC"
                    justify-center
                  >Archive User
                    </v-toolbar-title>
                    <v-spacer/>
                  </v-toolbar>
                  <img style="display: block; margin-left: auto; margin-right: auto;"
                    :src="require('../assets/problem.png')"/>
                  <v-card-text class="justify-center"
                  style="margin-top: 10px; color: black;
                  font-size: 18px; text-align: center; font-weight: bold;"
                  >
                    Are you sure want to archive it?
                  </v-card-text>
                  <v-card-actions class="justify-center">
                    <v-btn
                      min-width="200px"
                      outlined
                      color="error"
                      @click="dialog.value = false"
                      style="margin-right: 20px;"
                    >No</v-btn>
                    <v-btn
                      style="background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
                      color: white; margin-left: 20px;"
                      min-width="200px"
                      @click="archiveUser"
                    >Yes</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
              <v-btn
                style="background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
                color: white;"
                large
                min-width="146px"
                class="marginButton"
                @click="$router.push('/user/edit-user/' + list.id)"
                >
                Edit
              </v-btn>
            </v-col>
          </v-row>
    </v-container>
  </v-card>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toasted from 'vue-toasted'
Vue.use(Toasted)
Vue.use(VueAxios, axios)
export default {
  metaInfo: { title: 'User Details Page' },
  data () {
    return {
      url: 'http://localhost:2020',
      list: undefined,
      items: [
        { text: 'Name', value: 'nama' },
        { text: 'ID User', value: 'id' },
        { text: 'Team', value: 'team' },
        { text: 'Username', value: 'username' },
        { text: 'Email', value: 'email' },
        { text: 'Role', value: 'role' }
      ],
      breadcrumbData: [
        {
          text: 'User List',
          disabled: false,
          href: '/user'
        },
        {
          text: 'Detail User',
          disabled: true
        }
      ]
    }
  },
  mounted () {
    Vue.axios.get(this.url + '/api/user/' + this.$route.params.id)
      .then((resp) => {
        this.list = resp.data
        console.log(resp.data)
      })
  },
  methods: {
    async archiveUser () {
      console.log('MAshoook')
      const resp = await axios.put(this.url + '/api/user/' + this.$route.params.id + '/archive', this.user)
      this.$router.push('/user/', () => {
        this.$toasted.show('User has been archived!', {
          type: 'success',
          position: 'bottom-center',
          iconPack: 'mdi-checkbox-marked-circle'
        }).goAway(3000)
      })
    }
  }

}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
.root-otorisasi{
  margin-left: 124px;
  margin-right: 124px;
}
.marginButtonLeft{
  margin-right: 502px;
  margin-bottom: 20px;
}
.marginButton{
  margin-top: 50px;
  margin-right: 30px;
  margin-bottom: 20px;
}
.title-otorisasi{
  color: #4F4F4F;
  margin-top: 20px;
}
</style>
