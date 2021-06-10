<template>
    <v-card
        class="root"
        flat>
        <v-row class="mb-6">
            <v-col cols="12"
            >
            <p class="title-riset">Research List</p>
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
              @click="$router.push('add-riset')"
            >
            Create Research +
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
            :items="list"
            :search="search"
            :items-per-page="10"
            class="elevation-2 mb-12"
        >
         <template v-slot:item.actions ="{ item }">
          <v-btn
             v-bind:href="'/riset/update-riset/' + item.id"
             fab
             icon
             :disabled="!(currentUser === item.user || currentUserRole === 'ROLE_HEAD_OF_RESEARCHER')"
           >
                  <v-icon
                    color="green darket-4"
                    medium
                    v-bind="attrs"
                    v-on="on"
                  >mdi-pencil</v-icon>
           </v-btn>
            <v-dialog
            transition="dialog-top-transition"
            max-width="600px"
            >
           <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="getId(item.id)"
                fab
                icon
                :disabled="!(currentUser === item.user || currentUserRole === 'ROLE_HEAD_OF_RESEARCHER')"
                v-bind="attrs"
                v-on="on"
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
                <v-spacer />
                <v-toolbar-title
                    style="color: #2790CC"
                    justify-center
                >Archive Research
                  </v-toolbar-title>
                  <v-spacer/>
                </v-toolbar>
                <img class="mt-3 mb-3" style="display: block; margin-left: auto; margin-right: auto;"
                  :src="require('../assets/problem.png')"/>
                <v-card-text class="justify-center"
                style="margin-top: 10px; color: black;
                font-size: 18px; text-align: center; font-weight: bold;"
                >
                  Are you sure want to archive it?
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn
                    min-width="152px"
                    outlined
                    color="error"
                    @click="dialog.value = false"
                    style="margin-right: 20px;"
                  >No</v-btn>
                  <v-btn
                    style="background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
                    color: white; margin-left: 20px;"
                    min-width="152px"
                    @click="archiveResearch"
                  >Yes</v-btn>
                </v-card-actions>
                </v-card>
            </template>
            </v-dialog>
            <v-btn
             v-bind:href="'/riset/detail-riset/' + item.id"
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
  name: 'ListRiset',
  data () {
    return {
      url: 'http://localhost:2020',
      list: undefined,
      search: '',
      status: false,
      val: '',
      currentUser: JSON.parse(localStorage.getItem('user')).username,
      currentUserRole: JSON.parse(localStorage.getItem('user')).roles[0],
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
        text: 'Actions',
        class: 'dataTable',
        align: 'center',
        sortable: false,
        value: 'actions',
        width: '20%'
      }
      ]
    }
  },
  methods: {
    getId (e) {
      this.val = e
      console.log(this.val)
    },
    archiveResearch () {
      Vue.axios.put(this.url + '/api/riset/archive/' + this.val, {
        status: this.status
      })
        .then((result) => {
          window.location.reload(() => {
            this.$toasted.show('Research has been created', {
              type: 'success',
              position: 'bottom-center',
              iconPack: 'mdi-checkbox-marked-circle'
            }).goAway(3000)
          })
        })
    }
  },
  mounted () {
    Vue.axios.get(this.url + '/api/listRiset')
      .then((resp) => {
        this.list = resp.data
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
.createUser-otorisasi{
  margin-bottom: 24px;
}
.dataTable {
   font-size: 16px !important;
}
</style>
