<template>
  <div v-if="list !=null">
    <v-card
      class="root"
      flat
    >
    <div style="margin-top: 20px;">
        <v-row class="mb-9">
          <v-breadcrumbs
              :items="breadcrumbData"
              large
              style="padding-left: 0px; margin-top:2px;"
            ></v-breadcrumbs>
        </v-row>
    <v-row>
        <v-col cols="12" sm="12">
            <h2 class="mb-2">Insights</h2>
            <p>{{ list.insightStatement }}</p>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" sm="12">
            <h4 class="mb-2">Research</h4>
            <p>{{ list.riset }}</p>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" sm="3">
            <h4 class="mb-2">PIC</h4>
            <p>{{ list.insightPicName }}</p>
        </v-col>
        <v-col cols="12" sm="3">
            <h4 class="mb-2">Team</h4>
            <p>{{ list.insightTeamName }}</p>
        </v-col>
        <v-col cols="12" sm="3">
            <h4 class="mb-2">Archetype</h4>
                <div v-for="item in tampung" v-bind:key="item.id">
                    {{item.typeName}}
                </div>
        </v-col>
        <v-col cols="12" sm="3">
            <h4 class="mb-2">Status</h4>
            <p>Archive</p>
        </v-col>
    </v-row>
    <v-divider />
    <v-row style="margin-top: 10px;">
        <v-col cols="12" sm="7">
            <v-btn
                @click="$router.push('/trash-bin/insight')"
                large
                min-width="152px"
                outlined
                color="primary"
                >
                Back
            </v-btn>
        </v-col>
        <v-col cols="12" sm="1">
            <v-dialog
              v-model="dialog"
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
                  >Activate Insight
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
                      @click="activeInsight($route.params.id)"
                    >Yes</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
        </v-col>
    </v-row>
    </div>
    </v-card>
  </div>
  <div v-else>
    <h1>
      Data not found
    </h1>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
export default {
  beforeMount () {
    Vue.axios.get(this.url + '/api/trashBin/insight/' + this.$route.params.id)
      .then((res) => {
        this.list = res.data.result
        this.tampung = this.list.archetype
      })
    this.$nextTick(function () {
      const username = JSON.parse(localStorage.getItem('user')).username
      this.currentUser = username
    })
  },
  methods: {
    async activeInsight (id) {
      const resp = await Vue.axios.put(this.url + '/api/trashBin/insight/' + id + '/active', {
        status: this.status
      }).then((response) => {
        console.log(response.data.status)
        if (response.data.status === 200) {
          this.$router.push('/trash-bin/insight', () => {
            this.$toasted.show('Insight has been activated', {
              type: 'success',
              position: 'bottom-center',
              iconPack: 'mdi-checkbox-marked-circle'
            }).goAway(3000)
          })
        } else if (response.data.status === 400) {
          this.closeDialog(400)
          // window.location.reload()
          // this.$router.push('/trash-bin/detail-insight/' + this.$route.params.id, () => {
          // })
        }
      }).catch((e) => {
        console.log(e)
        return e
      })
    },
    closeDialog (e) {
      // this.dialog.value
      this.dialog = false
      this.$toasted.show('Insight can not be active, because Research is archived', {
        type: 'error',
        position: 'bottom-center',
        iconPack: 'mdi-checkbox-marked-circle'
      }).goAway(3000)
    }
  },
  data: () => ({
    list: [],
    tampung: [],
    dialog: '',
    breadcrumbData: [
      {
        text: 'Trash Bin Insight',
        disabled: false,
        href: '/trash-bin/insight'
      },
      {
        text: 'Detail Insight',
        disabled: true
      }
    ]
  })
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
.root{
    margin-left: 124px;
    margin-right: 124px;
}
.title-insight {
  color: #4F4F4F;
  margin-top: 20px;
}
.submit {
  background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
  color: white;
}
</style>
