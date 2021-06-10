<template>
    <v-card
        class="root"
        flat
        >
      <v-row class="mb-6">
            <v-col cols="12"
            >
            <p class="title-riset">Trash Bin Research List</p>
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
             v-bind:href="'/trash-bin/detail-riset/' + item.id"
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
        text: 'Research Date',
        class: 'dataTable',
        sortable: true,
        value: 'research_date',
        width: '12%'
      },
      {
        text: 'Title',
        class: 'dataTable',
        sortable: true,
        value: 'title',
        width: '30%'
      },
      {
        text: 'Type',
        class: 'dataTable',
        value: 'research_type',
        width: '10%'
      },
      {
        text: 'Project Name',
        class: 'dataTable',
        sortable: true,
        value: 'project_name',
        width: '13%'
      },
      {
        text: 'Insight Amount',
        class: 'dataTable',
        align: 'center',
        sortable: true,
        value: 'insight_amount',
        width: '15%'
      },
      {
        text: 'Status',
        class: 'dataTable',
        align: 'center',
        sortable: false,
        value: 'status',
        width: '10%'
      },
      {
        text: 'Actions',
        class: 'dataTable',
        align: 'center',
        sortable: false,
        value: 'actions',
        width: '10%'
      }
      ]
    }
  },
  beforeMount () {
    Vue.axios.get(this.url + '/api/trashBin/riset')
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
