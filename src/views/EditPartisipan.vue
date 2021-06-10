<template>
  <div style="margin-top: 20px;">
      <!-- <a class="title"
        @click="$router.push('/survey/')"
        >
        Screening Survey
      </a> -->
        <!-- / Edit Participant -->
        <v-row class="mb-12" style="margin-left: 124px">
            <v-breadcrumbs
                :items="breadcrumbData"
                large
                style="padding-left: 12px; margin-top:14px;"
              ></v-breadcrumbs>
            <!-- </v-col> -->
        </v-row>
    <v-container class="formMargin">
    <v-form
      @submit="onSubmit"
      @cancel="onCancel"
    >
    <v-row>
        <v-col
          cols="12"
          sm="3"
        >
        <v-label for="participantName">Name </v-label>
          <v-text-field
            placeholder="Participant Name"
            id="participantName"
            v-model="participantName"
            single-line
            dense
            outlined
            clearable
            required
            disabled
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="3"
        >
        <v-label for="participantEmail">Email </v-label>
          <v-text-field
            placeholder="Email"
            id="participantEmail"
            v-model="participantEmail"
            single-line
            dense
            outlined
            clearable
            required
            disabled
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="3"
        >
        <v-label for="team">Phone Number </v-label>
          <v-text-field
            placeholder="Phone Number"
            id="phoneNumber"
            v-model="phoneNumber"
            single-line
            dense
            outlined
            clearable
            required
            disabled
          ></v-text-field>
        </v-col>
    </v-row>
        <v-row>
        <v-col
          cols="12"
          sm="3"
        >
        <v-label for="age">Age </v-label>
          <v-text-field
            placeholder="Age"
            id="age"
            v-model="age"
            single-line
            dense
            outlined
            clearable
            required
            disabled
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="3"
        >
        <v-label for="domicile">Domicile </v-label>
          <v-text-field
            placeholder="Domicile"
            id="domicile"
            v-model="domicile"
            single-line
            dense
            outlined
            clearable
            required
            disabled
          ></v-text-field>
        </v-col>
    </v-row>
        <v-row>
        <v-col
          cols="12"
          sm="3"
        >
        <v-label for="participantStatus">Status </v-label>
          <v-select
            placeholder="Status"
            id="participantStatus"
            v-model="participantStatus"
            :items="items"
            item-value="id"
            item-text="status"
            :rules="participantStatusRules"
            single-line
            dense
            outlined
            required
          >
          <!-- <option value = 1>New </option>
          <option value = 2>On Going </option>
          <option value = 3>Done </option>
          <option value = 4>Canceled </option> -->
          </v-select>
        </v-col>
    </v-row>
    <v-row>
        <v-col
          cols="12"
          sm="9"
        >
        <v-label for="participantNotes">Notes </v-label>
          <v-textarea
            placeholder="Notes"
            id="participantNotes"
            v-model="participantNotes"
            single-line
            dense
            outlined
            clearable
            required
          ></v-textarea>
        </v-col>
    </v-row>
    <v-row>
      <!-- <v-col
          cols="12"
          sm="8"
        >
        <p></p>
      </v-col> -->
      <v-col
          cols="12"
        >
        <div class="tombol">
        <v-btn
          @click="$router.push('/survey/participant/detail/' + list.id)"
          large
          min-width="152px"
          outlined
          color="error"
          class="marginButton">
          Cancel
        </v-btn>
      <!-- </v-col>
      <v-col -->
          <!-- cols="12"
          sm="1"
        > -->
        <v-btn style="background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
              color: white;"
              large
              min-width="152px"
              class="marginButton"
              @click="onSubmit"
              >Save</v-btn>
        </div>
      </v-col>
    </v-row>
    </v-form>
    </v-container>
  </div>

</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
export default {
  name: 'EditParticipant',
  metaInfo: { title: 'Participant Edit Page' },
  data () {
    return {
      url: 'http://localhost:2020',
      list: undefined,
      participant: undefined,
      id: null,
      participantName: '',
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
          text: 'Participant Edit',
          disabled: false
        }
      ],
      participantEmail: '',
      phoneNumber: '',
      age: '',
      domicile: '',
      participantStatus: '',
      items: ['New', 'On Going', 'Done', 'Canceled'],
      participantStatusRules: [
        v => !!v || 'Status is required'
      ],
      participantNotes: ''
    }
  },
  beforeMount () {
    Vue.axios.get(this.url + '/api/participant/' + this.$route.params.id)
      .then((res) => {
        this.list = res.data
        this.id = res.data.id
        this.participantName = res.data.participantName
        this.participantEmail = res.data.participantEmail
        this.phoneNumber = res.data.phoneNumber
        this.age = res.data.age
        this.domicile = res.data.domicile
        this.participantStatus = res.data.participantStatus
        // var tempStatus = res.data.participantStatus
        // if (tempStatus === 1) {
        //   this.status = 'New'
        // }
        // if (tempStatus === 2) {
        //   this.status = 'On Going'
        // }
        // if (tempStatus === 3) {
        //   this.status = 'Done'
        // }
        // if (tempStatus === 4) {
        //   this.status = 'Canceled'
        // }
        this.participantNotes = res.data.participantNotes
      })
  },
  methods: {
    async onSubmit () {
      const result = await axios.put(this.url + '/api/participant/update/' + this.$route.params.id, {
        id: this.id,
        participantName: this.participantName,
        participantEmail: this.participantEmail,
        phoneNumber: this.phoneNumber,
        age: this.age,
        domicile: this.domicile,
        participantStatus: this.participantStatus,
        participantNotes: this.participantNotes,
        inputDate: '2020-01-01'
      }, { headers: this.authHeader() }
      )
      console.log('Response' + result)
      this.$router.replace('/survey/participant/detail/' + this.id, () => {
        this.$toasted.show('Participant has been updated!', {
          type: 'success',
          position: 'bottom-center',
          iconPack: 'mdi-checkbox-marked-circle'
        }).goAway(3000)
      })
    },
    onCancel () {
      this.$router.replace('/survey/participant/detail/' + this.id)
    },
    // validate () {
    //   this.$refs.form.validate()
    //   this.onSubmit()
    // },
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
.formMargin{
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
