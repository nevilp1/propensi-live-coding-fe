<template>
<div style="margin-top: 20px;">
    <!-- <a class="title"
      @click="$router.push('/survey')"
      >
      Screening Survey
    </a>
      / Participant -->
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
        <p>Last Edited: {{ format_date (participant.inputDate) }}</p>
        </v-col>
    </v-row>
    <v-row>
        <v-col
          cols="12"
          sm="3"
        >
        <h4>Name </h4>
        <p>{{participant.participantName}}</p>
        </v-col>
        <v-col
          cols="12"
          sm="3"
        >
        <h4>Email </h4>
        <p>{{participant.participantEmail}}</p>
        </v-col>
        <v-col
          cols="12"
          sm="3"
        >
        <h4>Phone Number </h4>
        <p>{{participant.phoneNumber}}</p>
        </v-col>
    </v-row>
    <v-row>
        <v-col
          cols="12"
          sm="3"
        >
        <h4>Age </h4>
        <p>{{participant.age}}</p>
        </v-col>
        <v-col
          cols="12"
          sm="3"
        >
        <h4>Domicile </h4>
        <p>{{participant.domicile}}</p>
        </v-col>
    </v-row>
    <v-row>
        <v-col
          cols="12"
          sm="3"
        >
        <h4>Status </h4>
        <!-- <p v-if="participant.participantStatus == 1">New</p>
        <p v-if="participant.participantStatus == 2">On Going</p>
        <p v-if="participant.participantStatus == 3">Done</p>
        <p v-if="participant.participantStatus == 4">Canceled</p> -->
        <p>{{participant.participantStatus}}</p>
        </v-col>
    </v-row>
    <v-row>
        <v-col
          cols="12"
          sm="9"
        >
        <h4>Notes </h4>
        <p>{{participant.participantNotes}}</p>
        </v-col>
    </v-row>
    <v-row>
      <v-col
          cols="12"
          sm="7"
        >
        <v-btn
          @click="$router.replace('/survey/')"
          outlined
          large
          min-width="152px"
          color="primary"
          class="marginButton"
          >
          Back
        </v-btn>
      </v-col>
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
  metaInfo: { title: 'Participant Details Page' },
  name: 'DetailParticipant',
  data () {
    return {
      url: 'http://localhost:2020/api/participant/',
      participant: undefined,
      breadcrumbData: [
        {
          text: 'Screening Survey List',
          disabled: false,
          href: '/survey'
        },
        {
          text: 'Participant List',
          disabled: false,
          href: '/survey/participant/' + this.$route.params.id
        },
        {
          text: 'Participan Detail',
          disabled: false
        }
      ]
    }
  },
  beforeMount () {
    this.getDetail()
  },
  methods: {
    getDetail: function () {
      axios.get(this.url + this.$route.params.id)
        .then((res) => {
          this.participant = res.data
          console.log(res.data)
        })
        .catch(err => { this.participant = err.data })
    },
    editPage () {
      this.$router.replace('/survey/participant/edit/' + this.participant.id)
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
