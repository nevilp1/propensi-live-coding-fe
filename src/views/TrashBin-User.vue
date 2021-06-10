<template>
    <v-card
        class="root"
        flat
        >
        <v-row class="mb-6">
            <v-col cols="12"
            >
            <p class="title-riset">Trash Bin User</p>
            </v-col>
        </v-row>
        <v-row class="mb-3">
            <v-col
                cols="12" sm="3"
            >
            </v-col>
            <v-col cols="6">
            </v-col>
            <v-col
                cols="12" sm="3"
            >
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                dense
                outlined
            ></v-text-field>
            </v-col>
        </v-row>
        <v-data-table
            :headers="headers"
            :items="list"
            :search="search"
            :items-per-page="10"
            class="elevation-2 mb-12"
        >
         <template v-slot:item.actions ="{ item }">
            <v-btn
             v-bind:href="'/trash-bin/detail-user/' + item.id"
             fab
             icon
           >
            <v-icon
              medium
              color="blue darken-4"
            >mdi-information-outline</v-icon>
           </v-btn>
         </template>
        </v-data-table>
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
      list: undefined,
      search: '',
      status: 'archive',
      val: '',
      headers: [{
        text: 'ID User',
        class: 'dataTable',
        sortable: true,
        value: 'idUser',
        widht: '10%'
      },
      {
        text: 'Name',
        class: 'dataTable',
        sortable: true,
        value: 'nama',
        widht: '20%'
      },
      {
        text: 'Username',
        class: 'dataTable',
        value: 'username',
        widht: '10%'
      },
      {
        text: 'Role',
        class: 'dataTable',
        sortable: false,
        value: 'role[0].name',
        widht: '20%'
      },
      {
        text: 'Team',
        class: 'dataTable',
        align: 'center',
        sortable: false,
        value: 'team',
        widht: '10%'
      },
      {
        text: 'Status',
        class: 'dataTable',
        align: 'center',
        sortable: false,
        value: 'status',
        widht: '10%'
      },
      {
        text: 'Actions',
        class: 'dataTable',
        align: 'center',
        sortable: false,
        value: 'actions',
        widht: '10%'
      }
      ]
    }
  },
  beforeMount () {
    Vue.axios.get(this.url + '/api/trashBin/user')
      .then((resp) => {
        this.list = resp.data
        console.log(resp.data)
      })
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
.title-riset{
    color: #4F4F4F;
    margin-top: 20px;
}
.root{
    margin-left: 124px;
    margin-right: 124px;
}
.dataTable {
   font-size: 16px !important;
}
</style>
