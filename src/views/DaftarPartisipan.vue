<template>
  <v-card
    class="root"
    flat
  >
  <v-row class="mb-6">
            <!-- <v-col cols="12"
            > -->
            <v-breadcrumbs
                :items="breadcrumbData"
                large
                style="padding-left: 12px; margin-top:14px;"
              ></v-breadcrumbs>
            <!-- </v-col> -->
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
      <template #item.id="{ value }">
          <v-btn
             v-bind:href="'/survey/participant/detail/' + value"
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
  metaInfo: { title: 'Participant List Page' },
  data () {
    return {
      url: 'http://localhost:2020',
      items: undefined,
      search: '',
      breadcrumbData: [
        {
          text: 'Screening Survey List',
          disabled: false,
          href: '/survey'
        },
        {
          text: 'Participant List',
          disabled: false
        }
      ],
      headers: [
        {
          text: 'Regist Date',
          align: 'start',
          sortable: true,
          value: 'inputDate',
          width: '12%',
          class: 'dataTable'

        },
        { text: 'Name', value: 'participantName', sortable: true, width: '20%', class: 'dataTable' },
        { text: 'Email', value: 'participantEmail', sortable: true, width: '22%', class: 'dataTable' },
        { text: 'Phone Number', value: 'phoneNumber', sortable: true, width: '22%', class: 'dataTable' },
        { text: 'Status', value: 'participantStatus', sortable: false, width: '12%', class: 'dataTable' },
        { text: 'Action', value: 'id', sortable: false, width: '12%', align: 'center', class: 'dataTable' }
      ]
    }
  },
  mounted () {
    Vue.axios.get(this.url + '/api/participant/list/' + this.$route.params.id)
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
