<template>
    <v-card class="root"
    flat
    >
        <v-row class="mb-2">
            <v-col cols="12">
            <p class="title-riset">
                Trash Bin User / User Detail
            </p>
            </v-col>
        </v-row>
        <v-row class="mb-10">
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
        <div class="mt-12">
        <v-row>
        <v-col cols="12" sm="7">
            <v-btn
            @click="$router.push('/trash-bin/user')"
            large
            min-width="152px"
            outlined
            color="primary"
            class="marginButtonCancel">
            Back
            </v-btn>
        </v-col>
        <v-col cols="12" sm="1">
            <v-dialog
              transition="dialog-top-transition"
              max-width="600"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  style="background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
                  color: white;"
                  large
                  min-width="146px"
                  outlined
                  color="white"
                  class="marginButton"
                  v-bind="attrs"
                  v-on="on"
                >Change Active</v-btn>
              </template>
              <template v-slot:default="dialog">
                <v-card>
                  <v-toolbar>
                    <v-spacer />
                    <v-toolbar-title
                    style="color: #2790CC"
                    justify-center
                  >Activate User
                    </v-toolbar-title>
                    <v-spacer/>
                  </v-toolbar>
                  <img style="display: block; margin-left: auto; margin-right: auto;"
                    :src="require('../assets/problem.png')"/>
                  <v-card-text class="justify-center"
                  style="margin-top: 10px; color: black;
                  font-size: 18px; text-align: center; font-weight: bold;"
                  >
                    Are you sure want to activate it?
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
                      @click="activeUser"
                    >Yes</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
        </v-col>
    </v-row>
    </div>
    </v-card>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
  data () {
    return {
      url: 'http://localhost:2020',
      list: [],
      status: true
    }
  },
  methods: {
    async activeUser () {
      const resp = await Vue.axios.put(this.url + '/api/trashBin/user/active/' + this.list.id, {
        status: this.status
      })
      this.$router.push('/trash-bin/user', () => {
        this.$toasted.show('User has been activated', {
          type: 'success',
          position: 'bottom-center',
          iconPack: 'mdi-checkbox-marked-circle'
        }).goAway(3000)
      })
    }
  },
  beforeMount () {
    Vue.axios.get(this.url + '/api/trashBin/user/' + this.$route.params.id)
      .then((response) => {
        console.log(response)
        this.list = response.data
      })
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
.marginForm{
    margin-top: 150px;
    margin-left: 124px;
    margin-right: 124px;
}
.marginButton{
    margin-bottom: 20px;
}
.marginButtonCancel{
    margin-right: 30px;
    margin-bottom: 20px;
}
.root{
    margin-left: 124px;
    margin-right: 124px;
}
.title-riset{
    color: #4F4F4F;
    margin-top: 20px;
}
.dataTable{
   font-size: 14px !important;
}
</style>
