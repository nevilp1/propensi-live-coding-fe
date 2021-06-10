<template>
  <v-card
    class="root"
    flat
  >
    <v-row class="mb-6">
                <v-col cols="12"
                >
                <p class="title-riset">Trash Bin Insight List</p>
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
    <v-card>

      <div v-if="items !=null">
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="10"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:item.inputDate="{item}">
            <p style="margin-top: 15px;">
              {{ format_date(item.inputDate) }}
            </p>
          </template>
          <template v-slot:item.riset="{item}">
            <p style="margin-top: 15px;" v-if="item.riset===null">
              -
            </p>
            <p style="margin-top: 15px;" v-else>
              {{item.riset}}
            </p>
          </template>
          <template v-slot:item.status="{item}">
            <p v-if="item.status === false" style="margin-top: 15px;">
              Archive
            </p>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
             v-bind:href="'/trash-bin/detail-insight/' + item.id"
             icon
           >
            <v-icon
              medium
              color="blue darken-4"
            >mdi-information-outline</v-icon>
           </v-btn>
          </template>
        </v-data-table>
      </div>
      <div v-else>
        <v-data-table
          item-key="name"
          class="elevation-1"
          loading
          loading-text="Loading... Please wait"
        ></v-data-table>
      </div>
    </v-card>
  </v-card>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'

Vue.use(VueAxios, axios)
export default {
  metaInfo: { title: 'Insight List Page' },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  beforeMount () {
    Vue.axios.get('http://localhost:2020/api/trashBin/insight')
      .then((res) => {
        this.items = res.data.result
      })
  },
  methods: {
    format_date (value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
      }
    }
  },
  data: () => ({
    headers: [
      {
        text: 'Insight Date',
        align: 'start',
        sortable: true,
        value: 'inputDate',
        width: '12%',
        class: 'dataTable'
      },
      {
        text: 'Insight Statement',
        value: 'insightStatement',
        width: '30%',
        class: 'dataTable'
      },
      {
        text: 'PIC',
        value: 'insightPicName',
        width: '10%',
        class: 'dataTable'
      },
      {
        text: 'Research',
        value: 'riset',
        width: '20%',
        class: 'dataTable'
      },
      {
        text: 'Team',
        value: 'insightTeamName',
        width: '8%',
        class: 'dataTable'
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
        value: 'actions',
        align: 'center',
        sortable: false,
        width: '10%',
        class: 'dataTable'
      }
    ],
    breadcrumbData: [
      {
        text: 'Trash Bin Insight',
        disabled: false
      }
    ],
    items: undefined,
    search: '',
    submitted: false,
    alert: false,
    alertDelete: false,
    delete: false,
    dialog: false
  })
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');

.root {
  margin-left: 124px;
  margin-right: 124px;
}

.title-riset {
  color: #4F4F4F;
  margin-top: 20px;
}
.searchBarInput {
  width: 280px;
}
.dataTable {
   font-size: 16px !important;
}

</style>
