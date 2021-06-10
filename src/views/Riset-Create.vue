<template>
    <v-card class="root"
    flat
    >
      <v-row class="mb-12">
            <!-- <v-col cols="12"> -->
            <!-- <p class="title-riset">
                Research List / Create Research
            </p> -->
            <v-breadcrumbs
                :items="breadcrumbData"
                large
                style="padding-left: 12px; margin-top:14px;"
              ></v-breadcrumbs>
            <!-- </v-col> -->
    </v-row>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
    <v-row>
      <v-col
        cols="12"
        sm="1"
      >
      </v-col>
      <v-col
          cols="12"
          sm="5"
        >
        <v-label for="researchDate">Research Date <v-p style="color:red">*</v-p></v-label>
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateFormatted"
              label="Date"
              single-line
              outlined
              readonly
              dense
              persistent-hint
              prepend-inner-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
        </v-col>
        <v-col
          cols="12"
          sm="5"
        >
        <v-label for="researchTitle">Research Title <v-p style="color:red">*</v-p></v-label>
          <v-text-field
            placeholder="Research Title"
            single-line
            :rules="researchTitleRules"
            dense
            required
            outlined
            clearable
            v-model="postRiset.researchTitle"
          ></v-text-field>
        </v-col>
    </v-row>
      <v-row>
      <v-col
        cols="12"
        sm="1"
      >
      </v-col>
        <v-col
          cols="12"
          sm="5"
        >
        <v-label for="researchType">Research Type <v-p style="color:red">*</v-p></v-label>
          <v-text-field
            placeholder="Research Type"
            single-line
            :rules="researchTypeRules"
            dense
            required
            outlined
            clearable
            v-model="postRiset.researchType"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="5"
        >
        <v-label for="projectTeam">Project Name <v-p style="color:red">*</v-p></v-label>
          <v-text-field
            placeholder="Project Team"
            single-line
            dense
            outlined
            :rules="projectNameRules"
            clearable
            v-model="postRiset.projectName"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="1"
      >
      </v-col>
        <v-col
          cols="12"
          sm="5"
        >
          <v-label for="team">Team <v-p style="color:red">*</v-p></v-label>
          <v-autocomplete
            v-model="postRiset.team"
            :items="listTeam"
            label="Team"
            item-value="team"
            item-text="team"
            single-line
            :rules="teamRules"
            outlined
            required
            dense
            clearable
          ></v-autocomplete>
        </v-col>
        <v-col
          cols="12"
          sm="5"
        >
        <v-label for="pic">PIC <v-p style="color:red">*</v-p></v-label>
          <v-autocomplete
            v-model="postRiset.pic"
            :items="listPIC"
            label="PIC"
            item-value="pic"
            item-text="pic"
            single-line
            outlined
            required
            :rules="picRules"
            dense
            clearable
          ></v-autocomplete>
        </v-col>
    </v-row>
        <v-row>
        <v-col
        cols="12"
        sm="1"
        >
      </v-col>
        <v-col
          cols="12"
          sm="10"
        >
        <v-label for="archetype">Archetype <v-p style="color:red">*</v-p></v-label>
          <v-autocomplete
            v-model="postRiset.archetype"
            :items="dataTable"
            label="Archetype"
            item-value="id"
            item-text="typeName"
            single-line
            outlined
            required
            dense
            :rules="archetypeRules"
            chips
            clearable
            small-chips
            multiple
          ></v-autocomplete>
        </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="1"
      >
      </v-col>
        <v-col
          cols="12"
          sm="10"
        >
        <v-label for="Document">Document <v-p style="color:red">*</v-p></v-label>
          <v-textarea
          placeholder="Document"
          auto-grow
          outlined
          required
          :rules="documentRules"
          v-model="postRiset.researchLink"
          ></v-textarea>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="11" sm="11">
          <div class="text-right">
            <v-btn
              @click="$router.replace('/list-riset')"
              large
              min-width="152px"
              outlined
              color="error"
              class="marginButtonCancel">
              Cancel
            </v-btn>
            <v-btn
              style="background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
              color: white;"
              color="primary"
              large
              :disabled="!valid"
              min-width="152px"
              class="marginButton"
              @click="validate"
              >
              Create
            </v-btn>
          </div>
        </v-col>
    </v-row>
    </v-form>
    </v-card>
</template>
//  <v-btn flat class="success mx-0 mt-3" click="submit">Add</v-btn>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
export default {
  name: 'FormAddRiset',
  data: vm => ({
    url: 'http://localhost:2020',
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    dataTable: [],
    valid: true,
    currentUser: '',
    listTeam: [],
    listPIC: [],
    researchTitleRules: [
      e => !!e || 'Research Title is required'
    ],
    researchTypeRules: [
      e => !!e || 'Research Type is required'
    ],
    projectNameRules: [
      e => !!e || 'Project Name is required'
    ],
    teamRules: [
      e => !!e || 'Team is required'
    ],
    picRules: [
      e => !!e || 'PIC is required'
    ],
    archetypeRules: [
      e => !!e || 'Archetype is required'
    ],
    documentRules: [
      e => !!e || 'Document is required'
    ],
    postRiset: {
      researchTitle: '',
      researchType: '',
      projectName: '',
      team: '',
      pic: '',
      archetype: '',
      researchLink: ''
    },
    breadcrumbData: [
      {
        text: 'Research List',
        disabled: false,
        href: '/list-riset'
      },
      {
        text: 'Research Create',
        disabled: false
      }
    ]
  }),
  created () {
    this.renderData()
  },
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    validate () {
      this.$refs.form.validate()
      this.postData()
    },
    renderData () {
      Vue.axios.get(this.url + '/api/type')
        .then((response) => {
          this.dataTable = response.data
          console.log(this.dataTable)
          if (this.dataTable === null) {
            this.dataTable = []
          }
        })
      Vue.axios.get(this.url + '/api/user/team')
        .then((response) => {
          this.listTeam = response.data
          console.log(this.listTeam)
        })
      Vue.axios.get(this.url + '/api/user/pic')
        .then((response) => {
          this.listPIC = response.data
          console.log(this.listPIC)
        })
      this.$nextTick(function () {
        const username = JSON.parse(localStorage.getItem('user')).username
        this.currentUser = username
      })
    },
    postData (e) {
      Vue.axios.post(this.url + '/api/addRiset', {
        currentUser: this.currentUser,
        archetype: this.postRiset.archetype,
        pic: this.postRiset.pic,
        projectName: this.postRiset.projectName,
        researchDate: this.date,
        researchLink: this.postRiset.researchLink,
        researchTitle: this.postRiset.researchTitle,
        researchType: this.postRiset.researchType,
        team: this.postRiset.team
      })
        .then((result) => {
          console.warn(result)
          this.$router.push('/list-riset', () => {
            this.$toasted.show('Research has been created', {
              type: 'success',
              position: 'bottom-center',
              iconPack: 'mdi-checkbox-marked-circle'
            }).goAway(3000)
          })
        })
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
a.v-breadcrumbs__item{
  color: #1261A0 !important;
}
div.v-breadcrumbs__item{
  color: #4F4F4F !important;
}
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
    color: #4F4F4F !important;
    margin-top: 20px;
}
</style>
