<template>
    <v-card class="root"
    flat
    >
        <v-row class="mb-2">
            <!-- <v-col cols="12">
            <p class="title-riset">
                Research List / Research Detail
            </p>
            </v-col> -->
            <v-breadcrumbs
                :items="breadcrumbData"
                large
                style="padding-left: 12px; margin-top:14px;"
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
                <a :href="list.research_link" target="_blank">{{list.research_link}}</a>
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
                    <v-dialog
                        v-model="dialog"
                        transition="dialog-top-transition"
                        max-width="600px"
                    >
                    <template v-slot:activator="{ on, attrs}">
                        <v-btn
                            style="background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
                                color: white;"
                            color="primary"
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                        >+ Add Insight
                        </v-btn>
                    </template>
                    <template>
                    <v-card>
                        <v-toolbar class="mb-12">
                            <v-spacer />
                            <v-toolbar-title
                                style="color: #2790CC"
                                justify-center
                            >Add Insight for this Research
                            </v-toolbar-title>
                            <v-spacer/>
                        </v-toolbar>
                        <v-card-text>
                            <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                            ><v-row>
                                    <v-col>
                                        <v-label for="insightStatement">Insight Statement <v-p style="color:red">*</v-p></v-label>
                                        <v-text-field
                                            v-model="postInsight.insightStatement"
                                            placeholder="Insight Statement"
                                            single-line
                                            dense
                                            :rules="insightStatementRules"
                                            required
                                            outlined
                                            clearable
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <!-- fungsi return-objet pada autocomplete untuk melakukan agar data yang dikirim returnnya sesuai dengan object data tersebut -->
                                        <v-label for="archetype">Archetype <v-p style="color:red">*</v-p></v-label>
                                        <v-autocomplete
                                            v-model="postInsight.archetype"
                                            :items="dataTable"
                                            label="Archetype"
                                            item-value="id"
                                            item-text="typeName"
                                            single-line
                                            return-object
                                            outlined
                                            :rules="archetypeRules"
                                            required
                                            dense
                                            chips
                                            clearable
                                            small-chips
                                            multiple
                                        ></v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-row class="justify-center">
                                    <v-card-actions class="justify-center">
                                    <v-btn
                                        min-width="152px"
                                        outlined
                                        color="error"
                                        @click="dialogChange"
                                        style="margin-right: 20px;"
                                    >Cancel</v-btn>
                                    <v-btn
                                        style="background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
                                        color: white; margin-left: 20px;"
                                        min-width="152px"
                                        :disabled="!valid"
                                        @click="validate"
                                    >Save</v-btn>
                                    </v-card-actions>
                                </v-row>
                            </v-form>
                        </v-card-text>
                    </v-card>
                    </template>
                    </v-dialog>
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
                        <td style="text-align:center">
                            <template>
                            <v-btn
                                v-bind:href="'/insight/detail/' + props.item.id"
                                fab
                                icon
                            >
                                <v-icon
                                color="blue darken-4"
                                medium
                                >mdi-information-outline</v-icon>
                            </v-btn>
                            </template>
                        </td>
                    </tr>
                </template>
            </v-data-table>
            <!-- <v-simple-table>
                <template>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Insight Statement</th>
                            <th>Archetype</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in listInsight"
                        :key="item.id"
                        >
                        <td> {{index+1}} </td>
                        <td>{{item.insight_statement}}</td>
                        <td> <div v-for="archetype in item.insightArchetype" :key="archetype.id"> {{archetype.typeName}} </div></td>
                        <td></td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table> -->
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <div class="mt-12">
        <v-row>
        <v-col cols="12" sm="7">
            <v-btn
            @click="$router.replace('/list-riset')"
            large
            min-width="152px"
            outlined
            color="primary"
            class="marginButtonCancel">
            Back
            </v-btn>
        </v-col>
        <v-dialog
            transition="dialog-top-transition"
            max-width="600px"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-col cols="12" sm="2">
                    <!-- belum di buat archivenya -->
                    <v-btn
                    large
                    min-width="152px"
                    outlined
                    color="error"
                    class="marginButtonCancel"
                    v-bind="attrs"
                    v-on="on">
                    Archive
                    </v-btn>
                </v-col>
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
        <v-col cols="12" sm="1">
            <v-btn
                style="background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
                color: white;"
                color="primary"
                large
                min-width="152px"
                class="marginButton"
                @click="editPage"
                >
                Edit
            </v-btn>
        </v-col>
    </v-row>
        </div>
    </v-card>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
  name: 'DetailRiset',
  data () {
    return {
      url: 'http://localhost:2020',
      list: [],
      valid: true,
      listInsight: [],
      listInsightArchetype: [],
      dataTable: [],
      currentUser: '',
      dialog: '',
      insightStatementRules: [
        e => !!e || 'Insight Statement is required'
      ],
      archetypeRules: [
        e => !!e || 'Archetype is required'
      ],
      postInsight: {
        insightStatement: '',
        archetype: ''
      },
      status: false,
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
        width: '50%'
      },
      {
        text: 'Archetype',
        class: 'dataTable',
        sortable: false,
        width: '20%'
      },
      {
        text: 'Actions',
        class: 'dataTable',
        sortable: false,
        value: 'actions',
        align: 'center',
        width: '20%'
      }],
      breadcrumbData: [{
        text: 'Research List',
        disabled: false,
        href: '/list-riset'
      },
      {
        text: 'Research Detail',
        disabled: false
      }]
    }
  },
  methods: {
    editPage () {
      this.$router.replace('/riset/update-riset/' + this.list.id)
    },
    validate () {
      this.$refs.form.validate()
      this.simpanInsight()
    },
    archiveResearch () {
      Vue.axios.put(this.url + '/api/riset/archive/' + this.$route.params.id, {
        status: this.status
      })
        .then((result) => {
          console.warn(result)
          this.$router.replace('/list-riset', () => {
            this.$toasted.show('Research has been archived!', {
              type: 'success',
              position: 'bottom-center',
              iconPack: 'mdi-checkbox-marked-circle'
            }).goAway(3000)
          })
        })
    },
    dialogChange () {
      this.dialog = false
      this.postInsight.insightStatement = ''
      this.postInsight.archetype = ''
    },
    simpanInsight () {
      Vue.axios.post(this.url + '/api/add/insight/risetID/' + this.list.id, {
        insightStatement: this.postInsight.insightStatement,
        archetype: this.postInsight.archetype,
        userCreate: this.currentUser
      }).then((response) => {
        console.warn(response)
        this.dialogChange()
        window.location.reload()
      }).catch((e) => {
        console.log(e)
        return e
      })
    }
  },
  mounted () {
    Vue.axios.get(this.url + '/api/riset/' + this.$route.params.id)
      .then((response) => {
        this.list = response.data
        this.dataTable = this.list.archetype
        console.log(this.dataTable)

        Vue.axios.get(this.url + '/api/insight/risetID/' + this.$route.params.id)
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
.marginButton{
    margin-bottom: 20px;
    margin-top: 0px !important;
}
.marginButtonCancel{
    margin-right: 30px;
    margin-bottom: 20px;
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
