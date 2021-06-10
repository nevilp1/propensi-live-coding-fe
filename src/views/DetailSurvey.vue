<template>
<div style="margin-top: 20px;">
    <!-- <a class="title"
      @click="$router.push('/survey/')"
      >
      Screening Survey
    </a>
      / Survey Detail -->
        <v-row class="mb-12" style="margin-left: 124px">
            <v-breadcrumbs
                :items="breadcrumbData"
                large
                style="padding-left: 12px; margin-top:14px;"
              ></v-breadcrumbs>
            <!-- </v-col> -->
        </v-row>
    <v-container class="detailMargin">
    <v-row>
        <v-col
          cols="12"
          sm="6"
        >
        <h1>{{survey.researchTitle}}</h1>
        <p>Last Edited: {{ format_date (survey.inputDate) }}</p>
        </v-col>
    </v-row>
    <v-row>
        <v-col
          cols="12"
          sm="3"
        >
        <h4>Research Type </h4>
        <p>{{survey.researchType}}</p>
        </v-col>
        <v-col
          cols="12"
          sm="3"
        >
        <h4>PIC </h4>
        <p>{{survey.picName}}</p>
        </v-col>
        <v-col
          cols="12"
          sm="3"
        >
        <h4>Team </h4>
        <p>{{survey.team}}</p>
        </v-col>
    </v-row>
    <v-row>
        <v-col
          cols="12"
          sm="3"
        >
        <h4>Participants </h4>
          <a
            @click="$router.push('/survey/participant/' + survey.id)"
            class="text-decoration-underline">
            See Participants
          </a>
        </v-col>
    </v-row>
    <v-row>
        <v-col
          cols="12"
          sm="9"
        >
        <h4>Content </h4>
        <p>{{survey.content}}</p>
        </v-col>
    </v-row>
    <v-row>
        <v-col
          cols="12"
          sm="9"
        >
        <h4>Criteria </h4>
        <!-- <p>{{survey.criteria}}</p> -->
        <li class="ph-font" v-for="p in survey.criteria.split('\n')"
        :key="p">{{p}}</li>
        </v-col>
    </v-row>
    <!-- <v-row>
      <v-col
        cols="12"
        sm="3"
      >
        <v-btn
          depressed
          style="background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
          color: white;"
          class="seeParticipants"
          min-width="205px"
          @click="$router.replace('/survey/participant/' + survey.id)"
        >
          See Participants
        </v-btn>
      </v-col>
    </v-row> -->
    <v-row>
      <v-col
          cols="12"
          sm="7"
        >
        <v-btn
          @click="$router.push('/survey/')"
          outlined
          large
          min-width="152px"
          class="marginButton"
          color="primary"
          >
          Back
        </v-btn>
      </v-col>
      <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-col
                cols="12"
                sm="2"
              >
              <v-btn
                outlined
                large
                min-width="152px"
                color="error"
                class="marginButton"
                v-bind="attrs"
                v-on="on">
                Delete
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
                >Delete Screening Survey
                  </v-toolbar-title>
                  <v-spacer/>
                </v-toolbar>
                <img style="display: block; margin-left: auto; margin-right: auto;"
                  :src="require('../assets/problem.png')"/>
                <v-card-text class="justify-center"
                style="margin-top: 10px; color: black;
                font-size: 18px; text-align: center; font-weight: bold;"
                >
                  Are you sure want to delete it?
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
                    @click="deleteSurvey"
                  >Yes</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
      <v-col
          cols="12"
          sm="1"
        >
        <v-btn style="background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
              color: white;"
              large
              min-width="152px"
              class="marginButton"
              @click="editPage">Edit</v-btn>
      </v-col>
    </v-row>
    </v-container>
</div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
export default {
  metaInfo: { title: 'Surveys Details Page' },
  name: 'DetailSurvey',
  data () {
    return {
      survey: undefined,
      breadcrumbData: [
        {
          text: 'Screening Survey List',
          disabled: false,
          href: '/survey'
        },
        {
          text: 'Screening Survey Detail',
          disabled: false
        }
      ],
      url_local: 'http://localhost:2020/api/survey/'
    }
  },
  beforeMount () {
    this.getDetail()
  },
  methods: {
    getDetail: function () {
      axios.get(this.url_local + this.$route.params.id)
        .then((res) => {
          this.survey = res.data
          console.log(res.data)
        })
        .catch(err => { this.survey = err.data })
    },
    editPage () {
      this.$router.push('/survey/edit/' + this.survey.id)
    },
    async deleteSurvey () {
      const resp = await axios.delete(this.url_local + 'delete/' + this.$route.params.id, this.survey, { headers: this.authHeader })
      this.$router.push('/survey/', () => {
        this.$toasted.show('Screening Survey has been deleted!', {
          type: 'success',
          position: 'bottom-center',
          iconPack: 'mdi-checkbox-marked-circle'
        }).goAway(3000)
      })
    },
    format_date (value) {
      if (value) {
        return moment(String(value)).format('ddd, DD MMM YYYY HH:mm:ss')
      }
    },
    authHeader () {
      const login = localStorage.getItem('user')
      const user = login !== null ? JSON.parse(login) : 'not logged in'
      if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken }
      }
    }
  }
}
</script>
<style>
.detailMargin{
  margin-top: 50px;
  margin-left: 124px;
  margin-right: 124px;
}
.marginButton{
  margin-right: 30px;
  margin-bottom: 20px;
}
.tombol{
  margin-left:710px;
}
.title{
  color: #4F4F4F;
  margin-top: 20px;
  margin-left: 124px;
}
</style>
