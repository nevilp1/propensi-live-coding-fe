<template>
    <v-card class="root"
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
                <h2 class="mb-2">{{list.research_title}}</h2>
                <p>Created at: {{list.input_date}}</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="3">
                <h4>Research Date</h4>
                <p>{{list.research_date}}</p>
            </v-col>
             <v-col cols="12" sm="3">
                <h4>Research Type</h4>
                <p>{{list.research_type}}</p>
            </v-col>
            <v-col cols="12" sm="3">
                <h4>Archetype</h4>
                <div v-for="item in dataTable" v-bind:key="item.id">
                    {{item.typeName}}
                </div>
            </v-col>
            <v-col cols="12" sm="3">
                <h4>Insight Amount</h4>
                <p>{{list.insight_amount}}</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="3">
                <h4>Project Name</h4>
                <p>{{list.project_name}}</p>
            </v-col>
             <v-col cols="12" sm="3">
                <h4>Team</h4>
                <p>{{list.team}}</p>
            </v-col>
            <v-col cols="12" sm="3">
                <h4>PIC</h4>
                <p>{{list.pic}}</p>
            </v-col>
            <v-col cols="12" sm="3">
                <h4>Status</h4>
                <p>{{list.status}}</p>
            </v-col>
        </v-row>
        <v-row>

        </v-row>
        <v-row class="mb-12">
            <v-col cols="12" sm="6">
                <h4>Document</h4>
                <p>{{list.research_link}}</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="12">
            <v-data-table
                :headers="table"
                :items="listInsight"
                hide-default-footer
                class="elevation-1 mb-12"
            >
            <template v-slot:top>
                <v-toolbar
                flat>
                    <v-toolbar-title> <h5>Insight List</h5> </v-toolbar-title>
                    <v-divider
                        class="mx-4"
                        inset
                        vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-divider></v-divider>
            </template>
                <template v-slot:item="props">
                    <tr>
                        <td>{{props.index+1}}</td>
                        <td>
                            {{ props.item.insight_statement }}
                        </td>
                        <td>
                            <div v-for="archetype in props.item.insightArchetype"
                            :key="archetype.id"
                            >{{ archetype.typeName }}</div>
                        </td>
                        <td></td>
                    </tr>
                </template>
            </v-data-table>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <div class="mt-12">
        <v-row>
        <v-col cols="12" sm="7">
            <v-btn
            @click="$router.push('/trash-bin/riset')"
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
                  >Activate Research
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
                      @click="activeResearch"
                    >Yes</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
        </v-col>
    </v-row>
        </div>
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
      listInsight: [],
      listInsightArchetype: [],
      dataTable: [],
      currentUser: '',
      status: true,
      table: [{
        text: 'No',
        class: 'dataTable',
        sortable: false,
        width: '5%'
      },
      {
        text: 'Insight Statement',
        class: 'dataTable',
        sortable: false,
        width: '60%'
      },
      {
        text: 'Archetype',
        class: 'dataTable',
        sortable: false,
        width: '35%'
      }],
      breadcrumbData: [
        {
          text: 'Trash Bin Research',
          disabled: false,
          href: '/trash-bin/riset'
        },
        {
          text: 'Detail Research',
          disabled: true
        }
      ]
    }
  },
  methods: {
    async activeResearch () {
      const resp = await Vue.axios.put(this.url + '/api/trashBin/riset/' + this.list.id + '/active', {
        status: this.status
      })
      this.$router.push('/trash-bin/riset', () => {
        this.$toasted.show('Research has been activated', {
          type: 'success',
          position: 'bottom-center',
          iconPack: 'mdi-checkbox-marked-circle'
        }).goAway(3000)
      })
    }
  },
  beforeMount () {
    Vue.axios.get(this.url + '/api/trashBin/riset/' + this.$route.params.id)
      .then((response) => {
        this.list = response.data
        this.dataTable = this.list.archetype
        console.log(this.dataTable)

        Vue.axios.get(this.url + '/api/insight/risetID/trashBin/' + this.$route.params.id)
          .then((response) => {
            this.listInsight = response.data
            console.log(this.listInsight)
          })
      })
    this.$nextTick(function () {
      const username = JSON.parse(localStorage.getItem('user')).username
      this.currentUser = username
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
