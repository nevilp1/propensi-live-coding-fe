<template>
  <v-card
    class="root"
    flat
  >
         <v-row class="mb-6">
            <v-col cols="12"
            >
            <p class="title-riset">Insight List</p>
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
              @click="$router.push('/insight/add')"
            >
            Create Insight +
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

    <v-card>

      <div v-if="items !=null">
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="10"
          :search="search"
          class="elevation-1  mb-12"
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
          <template v-slot:item.actions="{item}">
            <v-btn
              class="elevation-0"
              v-bind:href="'/insight/update/' + item.id"
              color="success"
              icon
              fab
              medium
              v-bind="attrs"
              v-on="on"
              :disabled="!(currentUser === item.username || currentUserRole === 'ROLE_HEAD_OF_RESEARCHER')"
            >
              <v-icon
                color="green darket-4"
                medium
              >mdi-pencil</v-icon>
            </v-btn>
            <v-dialog
              transition="dialog-top-transition"
              max-width="600"
            >
              <template v-slot:activator="{ on, attrs } " >
                <v-btn
                  class="elevation-0"
                  color="error"
                  icon
                  fab
                  medium
                  v-bind="attrs"
                  v-on="on"
                  :disabled="!(currentUser === item.username || currentUserRole === 'ROLE_HEAD_OF_RESEARCHER')"
                >
                <v-icon
                  color="red darken-4"
                  medium
                >mdi-delete</v-icon>
                </v-btn>
              </template>
              <template v-slot:default="dialog">
                <v-card>
                  <v-toolbar>
                    <v-spacer/>
                    <v-toolbar-title
                      style="color: #2790CC"
                      justify-center
                    > Archive Insight
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
                    >No
                    </v-btn>
                    <v-btn
                      style="background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
                      color: white; margin-left: 20px;"
                      min-width="200px"
                      @click="archiveInsight(item.id)"
                    >Yes
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
           <v-btn
             v-bind:href="'/insight/detail/' + item.id"
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
  mounted () {
    Vue.axios.get('http://localhost:2020/api/insights').then((res) => {
      this.items = res.data.result
      console.log(res.data.result)
    })
  },
  methods: {
    format_date (value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
      }
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    archiveInsight (id) {
      Vue.axios.post(this.url + '/api/insight/delete/' + id).then((res) => {
        if (res.data.status === 200) {
          this.$toasted.show('Insight has been archived!', {
            type: 'success',
            position: 'bottom-center',
            iconPack: 'mdi-checkbox-marked-circle'
          }).goAway(3000)
          window.location.reload()
        }
      })
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
        text: 'Actions',
        value: 'actions',
        align: 'center',
        sortable: false,
        width: '20%',
        class: 'dataTable'
      }
    ],
    items: undefined,
    currentUser: JSON.parse(localStorage.getItem('user')).username,
    currentUserRole: JSON.parse(localStorage.getItem('user')).roles[0],
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

.createInsight {
  margin-bottom: 24px;
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
