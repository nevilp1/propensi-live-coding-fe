<template>
  <v-card
    class="root"
    flat
  >
  <v-row class="mb-6">
            <v-col cols="12"
            >
            <p class="title-riset">Screening Survey List</p>
            </v-col>
        </v-row>
        <v-row class="mb-3">
            <v-col
                cols="12" sm="3"
            >
            <v-btn
              depressed
              style="background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
              color: white;"
              @click="$router.push('/survey/add')"
            >
            Create Survey +
            </v-btn>
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
      :items="items"
      :search="search"
      :items-per-page="10"
      class="elevation-2"
    >
      <template v-slot:item.inputDate="{item}">
          <!-- <p> -->
            {{ format_date(item.inputDate) }}
          <!-- </p> -->
        </template>
      <template v-slot:item.participant ="{ item }">
          <a
            @click="$router.push('/survey/participant/' + item.id)"
            class="text-decoration-underline">
            See Participants
          </a>
      </template>
      <template #item.id="{ value }">
          <v-btn
             v-bind:href="'/survey/detail/' + value"
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
import moment from 'moment'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
export default {
  metaInfo: { title: 'Survey List Page' },
  data () {
    return {
      url: 'http://localhost:2020',
      items: undefined,
      search: '',
      headers: [
        {
          text: 'Survey Date',
          align: 'start',
          sortable: true,
          value: 'inputDate',
          width: '14%',
          class: 'dataTable'
        },
        { text: 'Title', value: 'researchTitle', sortable: true, width: '30%', class: 'dataTable' },
        { text: 'PIC', value: 'picName', sortable: true, width: '13%', class: 'dataTable' },
        { text: 'Team', value: 'team', sortable: true, width: '13%', class: 'dataTable' },
        { text: 'Participants', value: 'participant', sortable: false, width: '15%', class: 'dataTable' },
        { text: 'Action', value: 'id', sortable: false, width: '15%', align: 'center', class: 'dataTable' }
      ]
    }
  },
  mounted () {
    Vue.axios.get(this.url + '/api/surveys')
      .then((resp) => {
        this.items = resp.data
      })
  },
  methods: {
    format_date (value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
      }
    },
    goToLink: function (value) {
      window.open(value, '_blank')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
.root{
  margin-left: 124px;
  margin-right: 124px;
}
.title-riset{
  color: #4F4F4F;
  margin-top: 20px;
}
.dataTable {
   font-size: 16px !important;
}
</style>
