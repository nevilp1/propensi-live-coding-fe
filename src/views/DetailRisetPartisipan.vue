<template>
<span>
  <v-app-bar
      app
      color="#F4F7FA"
      elevation="0"
    >
      <div class="d-flex align-center" >
        <v-img
          alt="Pinhome Logo"
          class="shrink ml-5"
          contain
          src="../assets/pinhome.png"
          transition="scale-transition"
          width="180"
        />
      </div>
    </v-app-bar>
    <v-card color="#F4F7FA">
        <div class="ml-5 py-7">
        <v-card-title class="ph-font blue--text text--darken-3"><b>{{ this.list.researchTitle }}</b></v-card-title>
        <v-card-subtitle class="ph-font blue--text text--darken-3">Dibuat: {{ this.format_date(this.list.inputDate)}}</v-card-subtitle>
        </div>
    </v-card>
    <v-card elevation="0">
      <p class="mx-10 mt-5">{{this.list.criteria}} </p>
      <p class="mx-10"><b>Kriteria Partisipan:</b></p>
        <li class="ph-font" v-for="p in this.list.content.split('\n')"
            :key="p">{{p}}</li>
            <v-card-title class="ph-font ml-3 blue--text text--darken-3"><b>Daftar Menjadi Partisipan</b></v-card-title>
    </v-card>
    <v-card>
        <v-row class="ml-5">
            <v-col
              cols="12"
              sm="3"
            >
            <v-label for="nama">Nama <v-p style="color:red">*</v-p></v-label>
              <v-text-field
                placeholder="Nama"
                id="nama"
                :rules="NamaRules"
                v-model="nama"
                single-line
                dense
                outlined
                clearable
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="3"
            >
            <v-label for="email">Email <v-p style="color:red">*</v-p></v-label>
              <v-text-field
                placeholder="Email"
                id="email"
                :rules="EmailRules"
                v-model="email"
                single-line
                dense
                outlined
                clearable
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="3"
            >
            <v-label for="noHP">No. HP <v-p style="color:red">*</v-p></v-label>
              <v-text-field
                placeholder="No. HP"
                id="noHP"
                :rules="NoHPRules"
                v-model="noHP"
                single-line
                dense
                outlined
                clearable
                required
              ></v-text-field>
            </v-col>
        </v-row>
        <v-row class="ml-5">
            <v-col
              cols="12"
              sm="3"
            >
            <v-label for="kota"> Kota Tempat Tinggal <v-p style="color:red">*</v-p></v-label>
              <v-text-field
                placeholder="Kota Tempat Tinggal"
                id="kota"
                :rules="KotaRules"
                v-model="kota"
                single-line
                dense
                outlined
                clearable
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="3"
            >
            <v-label for="usia">Usia <v-p style="color:red">*</v-p></v-label>
              <v-text-field
                placeholder="Usia"
                id="usia"
                :rules="UsiaRules"
                v-model="usia"
                single-line
                dense
                outlined
                clearable
                required
              ></v-text-field>
            </v-col>
        </v-row>
        <v-row class="ml-8 pb-5">
          <v-btn style="background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
                      color: white;" @click="daftarPartisipan">Daftar</v-btn>
        </v-row>
    </v-card>
</span>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
Vue.use(VueAxios, axios)
export default {
  metaInfo: { title: 'Participant Recruitment Page' },
  data () {
    return {
      url: 'http://localhost:2020',
      list: undefined,
      bar: ['Log out'],
      nama: null,
      NamaRules: [
        v => !!v || 'Nama is required'
      ],
      email: null,
      EmailRules: [
        v => !!v || 'Email is required'
      ],
      noHP: null,
      NoHPRules: [
        v => !!v || 'No HP is required'
      ],
      kota: null,
      KotaRules: [
        v => !!v || 'Kota is required'
      ],
      usia: null,
      UsiaRules: [
        v => !!v || 'Usia is required'
      ]
    }
  },
  mounted () {
    Vue.axios.get(this.url + '/api/survey/' + this.$route.params.id)
      .then((resp) => {
        this.list = resp.data
        console.log(this.list)
      })
  },
  methods: {
    goToLink: function (item) {
      window.open(item.linkToForm, '_blank')
    },
    logout () {
      console.log('Logging out ...')
      localStorage.removeItem('user')
      this.$router.push('/login')
    },
    format_date (value) {
      if (value) {
        return moment(String(value)).format('ddd, DD MMM YYYY HH:mm:ss')
      }
    },
    daftarPartisipan () {
      if (this.nama.trim() !== null && this.email.trim() !== null && this.noHP.trim() !== null && this.kota.trim !== null && this.usia.trim !== null) {
        Vue.axios.post(this.url + '/api/participant/add', {
          participantName: this.nama,
          participantEmail: this.email,
          phoneNumber: this.noHP,
          domicile: this.kota,
          age: this.usia,
          inputDate: new Date(),
          id: this.$route.params.id
        })
        this.$router.push('/daftar/', () => {
          this.$toasted.show('Register was succesful!', {
            type: 'success',
            position: 'bottom-center',
            iconPack: 'mdi-checkbox-marked-circle'
          }).goAway(3000)
        })
      } else {
        this.$toasted.show('Please fill all required fields!', {
          type: 'error',
          position: 'bottom-center',
          iconPack: 'mdi-checkbox-marked-circle'
        }).goAway(3000)
      }
    }
  }
}
</script>

<style lang="scss">
.v-btn {
  text-transform: unset !important;
}
</style>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
.ph-font {
    font-family:'Source Sans Pro';
}
p {
  font-family:'Source Sans Pro'
}
#background{
    height:600px;
}
li{
    margin-left:70px;
}
.v-btn {
    font-family:'Source Sans Pro';
}
</style>
