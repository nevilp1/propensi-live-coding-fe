<template>
    <v-card class="root"
    flat>
    <v-row class="mb-12">
        <!-- <v-col cols="12">
        <p class="title-riset">
            Research List / Update Research
        </p>
        </v-col> -->
        <v-breadcrumbs
          :items="breadcrumbData"
          large
          style="padding-left: 12px; margin-top:14px;"
        ></v-breadcrumbs>
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
            dense
            :rules="researchTitleRules"
            required
            outlined
            clearable
            v-model="targetRiset.researchTitle"
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
            dense
            outlined
            :rules="researchTypeRules"
            required
            clearable
            v-model="targetRiset.researchType"
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
            required
            clearable
            v-model="targetRiset.projectName"
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
          <v-text-field
            placeholder="Team"
            single-line
            dense
            outlined
            clearable
            :rules="teamRules"
            required
            v-model="targetRiset.team"
            disabled
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="5"
        >
        <v-label for="PIC">PIC <v-p style="color:red">*</v-p></v-label>
          <v-text-field
            placeholder="PIC"
            single-line
            dense
            outlined
            clearable
            required
            :rules="picRules"
            v-model="targetRiset.pic"
            disabled
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
          sm="10"
        >
        <v-label for="archetype">Archetype <v-p style="color:red">*</v-p></v-label>
          <v-autocomplete
            v-model="targetRiset.archetype"
            :items="dataTable"
            label="Archetype"
            item-value="id"
            item-text="typeName"
            single-line
            @selected="archetypeSelected"
            return-object
            required
            outlined
            :rules="archetypeRules"
            dense
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
          required
          outlined
          :rules="documentRules"
          v-model="targetRiset.researchLink"
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
          Save
        </v-btn>
      </div>
      </v-col>
    </v-row>
    </v-form>

    </v-card>
</template>

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
    list: undefined,
    valid: true,
    dataTable: [],
    tampung: [],
    vals: [],
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
    currentUser: '',
    archetype: '',
    archetype_id: '',
    targetRiset: {
      researchTitle: '',
      researchType: '',
      projectName: '',
      team: '',
      pic: '',
      archetype: '',
      researchLink: ''
    },
    breadcrumbData: [{
      text: 'Research List',
      disabled: false,
      href: '/list-riset'
    },
    {
      text: 'Research Update',
      disabled: false
    }]
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
    renderData () {
      Vue.axios.get(this.url + '/api/riset/' + this.$route.params.id)
        .then((response) => {
          this.list = response.data
          console.log(this.list)
          this.targetRiset.researchTitle = response.data.research_title
          this.targetRiset.researchType = response.data.research_type
          this.targetRiset.projectName = response.data.project_name
          this.targetRiset.team = response.data.team
          this.targetRiset.pic = response.data.pic
          this.targetRiset.researchLink = response.data.research_link
          this.date = response.data.research_date_update
          this.targetRiset.archetype = response.data.archetype
          this.archetypeSelected(response.data.archetype)
          Vue.axios.get(this.url + '/api/type')
            .then((response) => {
              this.dataTable = response.data
              if (this.dataTable === null) {
                this.dataTable = []
              }
            })
        })
      this.$nextTick(function () {
        const username = JSON.parse(localStorage.getItem('user')).username
        this.currentUser = username
      })
    },
    archetypeSelected (e) {
      this.archetype = ''
      this.archetype_id = ''
      if (e) {
        this.archetype = e
        this.archetype_id = e.id
      }
    },
    formatArchetype (e) {
      this.tampung = []
      const array = e
      for (let i = 0; i < array.length; i++) {
        this.tampung.push({
          id: array[i].id
        })
      }
    },
    formatValue (e) {
      this.vals = Object.values(e)
    },
    validate () {
      this.$refs.form.validate()
      this.postData()
    },
    postData (e) {
      console.log(this.date)
      console.warn(this.targetRiset)
      this.formatArchetype(this.targetRiset.archetype)
      this.formatValue(this.tampung)
      console.log(this.vals)
      console.log(this.targetRiset.archetype)
      console.log(this.archetype_id)
      //   console.log(this.formatValue(this.tampung.arche_id))
      Vue.axios.put(this.url + '/api/riset/' + this.$route.params.id + '/update', {
        currentUser: this.currentUser,
        archetype: this.targetRiset.archetype,
        pic: this.targetRiset.pic,
        projectName: this.targetRiset.projectName,
        researchDate: this.date,
        researchLink: this.targetRiset.researchLink,
        researchTitle: this.targetRiset.researchTitle,
        researchType: this.targetRiset.researchType,
        team: this.targetRiset.team
      })
        .then((result) => {
          console.warn(result)
          this.$router.push('/riset/detail-riset/' + this.$route.params.id, () => {
            this.$toasted.show('Research has been updated!', {
              type: 'success',
              position: 'bottom-center'
            }).goAway(3000)
          })
        })
    }
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
</style>
