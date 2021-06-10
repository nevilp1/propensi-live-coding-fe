<template>
    <v-card class="root"
    flat
    >
    <v-row>
        <v-col cols="12"
        >
        <h1 class="title text-center">Create Research</h1>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12"
        >
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12"
        >
        </v-col>
    </v-row>
    <v-container class="">
    <v-form>
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
        <v-label for="researchDate">Research Date<v-p style="color:red">*</v-p></v-label>
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
            dense
            outlined
            clearable
            v-model="postRiset.researchType"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="5"
        >
        <v-label for="projectTeam">Project Team <v-p style="color:red">*</v-p></v-label>
          <v-text-field
            placeholder="Project Team"
            single-line
            dense
            outlined
            clearable
            v-model="postRiset.projectName"
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
            v-model="postRiset.team"
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
            v-model="postRiset.pic"
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
        <v-label for="archetype">Archetype<v-p style="color:red">*</v-p></v-label>
          <v-autocomplete
            v-model="postRiset.archetype"
            :items="dataTable"
            label="Archetype"
            item-value="id"
            item-text="typeName"
            single-line
            outlined
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
        <v-label for="researchLink">Research Link<v-p style="color:red">*</v-p></v-label>
          <v-textarea
          placeholder="Research Link"
          auto-grow
          outlined
          v-model="postRiset.researchLink"
          ></v-textarea>
        </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="11"
      >
      <div class="text-right">
      <v-btn
        x-large
        min-width="100px"
        outlined
        color="error"
        class="marginButtonCancel">
        Cancel
      </v-btn>
      <v-btn
        color="primary"
        x-large
        min-width="100px"
        class="marginButton"
        @click="postData"
        >
        Create
      </v-btn>
      </div>
      </v-col>
    </v-row>
    </v-form>
    </v-container>
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
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    // items: ['Agent Primary', 'Agent Secondary', 'Agent Pinhome', 'Agent NonPinhome', 'Customer'],
    postRiset: {
      researchTitle: '',
      researchType: '',
      projectName: '',
      team: '',
      pic: '',
      archetype: '',
      researchLink: ''
    }
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
      Vue.axios.get('http://localhost:2020/api/type')
        .then((response) => {
          this.dataTable = response.data
          if (this.dataTable === null) {
            this.dataTable = []
          }
        })
    },
    postData () {
      console.log(this.date)
      console.warn(this.postRiset)
      // var arrArchetype = []
      // // for (let i = 0; i < this.postRiset.archetype.length; i++) {
      // //   arrArchetype[i] = this.postRiset.archetype[i];
      // // }
      console.log(this.arrArchetype)
      console.log(this.postRiset.archetype)
      Vue.axios.post('http:localhost:2020/api/addRiset', {
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
}
.marginButtonCancel{
  margin-right: 30px;
  margin-bottom: 20px;
}
.title{
    margin-top: 80px;
    color: grey;
}
.root{
    margin-left: 124px;
    margin-right: 124px;
}
</style>
