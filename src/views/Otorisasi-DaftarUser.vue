<template>
  <v-card
    class="root"
    flat
  >
  <v-container class="">
    <v-row class="mb-9">
      <v-breadcrumbs
          :items="breadcrumbData"
          large
          style="padding-left: 0px; margin-top:2px;"
        ></v-breadcrumbs>
    </v-row>
    <v-card-title>
      <v-row>
        <v-col cols="12" sm="3">
          <v-btn
        depressed
        style="background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
        color: white;"
        class="createUser-otorisasi"
        @click="$router.push('/user/create-user/')"
      >
        Create User +
          </v-btn>
        </v-col>
        <v-col cols="6"></v-col>
        <v-col cols="12" sm="3">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            outlined
            dense
            hide-details
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="list"
      :search="search"
      :items-per-page="10"
      class="elevation-1 mb-12"
    >
      <template #item.id="{ value }">
          <v-btn
             @click="$router.push('/user/detail-user/' + value)"
             icon
           >
            <v-icon
              medium
              color="blue darken-4"
            >mdi-information-outline</v-icon>
           </v-btn>
      </template>
    </v-data-table>
  </v-container>
  </v-card>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import authHeader from '../services/auth-header'
Vue.use(VueAxios, axios)
export default {
  metaInfo: { title: 'User List Page' },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data () {
    return {
      url: 'http://localhost:2020',
      list: undefined,
      search: '',
      headers: [
        {
          text: 'ID User',
          class: 'dataTable',
          align: 'start',
          sortable: true,
          value: 'idUser',
          width: '10%'
        },
        { text: 'Name', value: 'nama', class: 'dataTable', width: '15%' },
        { text: 'Username', value: 'username', class: 'dataTable', width: '15%' },
        { text: 'Role', value: 'role[0].name', class: 'dataTable', width: '30%' },
        { text: 'Team', value: 'team', class: 'dataTable', width: '15%' },
        { text: 'Action', value: 'id', class: 'dataTable', width: '10%' }
      ],
      breadcrumbData: [
        {
          text: 'User List',
          disabled: false
        }
      ]
    }
  },
  beforeMount () {
    Vue.axios.get(this.url + '/api/users', { headers: authHeader() })
      .then((resp) => {
        this.list = resp.data
        console.log(resp.data)
      })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
.title-otorisasi{
    color: #4F4F4F;
    margin-top: 20px;
}
.root{
    margin-left: 124px;
    margin-right: 124px;
}
.createUser-otorisasi{
  margin-bottom: 24px;
}
.dataTable {
   font-size: 14px !important;
}
</style>
