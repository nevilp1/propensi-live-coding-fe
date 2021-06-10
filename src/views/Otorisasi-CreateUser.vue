<template>
  <v-card class="root"
  flat
  >
    <v-container class="">
    <v-row class="mb-9">
      <v-breadcrumbs
          :items="breadcrumbData"
          large
          style="padding-left: 0px; margin-top:2px;"
        ></v-breadcrumbs>
    </v-row>
      <v-container class="marginForm-otorisasi">
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
            <v-label for="username">Username <v-p style="color:red">*</v-p></v-label>
              <v-text-field
                placeholder="Username"
                single-line
                dense
                outlined
                clearable
                v-model="username"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="5"
            >
            <v-label for="role">Role<v-p style="color:red">*</v-p></v-label>
              <v-autocomplete
                v-model="role"
                :items="items"
                label="Role"
                item-value="id"
                item-text="roleName"
                single-line
                outlined
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
              sm="3"
            >
            <v-label for="email">Email <v-p style="color:red">*</v-p></v-label>
              <v-text-field
                placeholder="Email"
                single-line
                dense
                outlined
                clearable
                v-model="email"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="3"
            >
            <v-label for="nama">Name <v-p style="color:red">*</v-p></v-label>
              <v-text-field
                placeholder="Name"
                single-line
                dense
                outlined
                clearable
                v-model="nama"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="3"
            >
            <v-label for="team">Team <v-p style="color:red">*</v-p></v-label>
              <v-text-field
                placeholder="Team"
                single-line
                dense
                outlined
                clearable
                v-model="team"
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
              sm="3"
            >
            <v-label for="password">Password <v-p style="color:red">*</v-p></v-label>
              <v-text-field
                outlined
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                placeholder="Password"
                hint="At least 6 characters"
                counter
                dense
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="3"
            >
            <v-label for="repassword">Re-Password <v-p style="color:red">*</v-p></v-label>
              <v-text-field
                outlined
                v-model="repassword"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min, passwordConfirmationRule]"
                :type="show2 ? 'text' : 'password'"
                placeholder="Re-Password"
                hint="Password match"
                counter
                dense
                @click:append="show2 = !show2"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="11" sm="11"
            >
            <div class="text-right">
              <v-btn
                large
                min-width="152px"
                outlined
                color="error"
                class="marginButton"
                @click="$router.push('/user/')">
                Cancel
              </v-btn>
              <v-btn
                style="background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
                color: white;"
                large
                max-width="152px"
                class="marginButton"
                @click="postData"
                >
                Create Account
              </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-container>
  </v-card>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
export default {
  metaInfo: { title: 'Create User Page' },
  data () {
    return {
      url: 'http://localhost:2020',
      show1: false,
      show2: false,
      username: '',
      email: '',
      nama: '',
      team: '',
      role: '',
      items: ['Admin', 'Head of Product Design & Research', 'Researcher'],
      password: '',
      repassword: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters'
      },
      breadcrumbData: [
        {
          text: 'User List',
          disabled: false,
          href: '/user'
        },
        {
          text: 'Create New User',
          disabled: true
        }
      ]
    }
  },
  computed: {
    passwordConfirmationRule () {
      return this.password === this.repassword || 'Password doesn\'t match'
    }
  },
  methods: {
    async postData (e) {
      // evt.preventDefault()
      const resp = await Vue.axios.post(this.url + '/api/auth/signup', {
        username: this.username,
        email: this.email,
        nama: this.nama,
        team: this.team,
        role: [this.role],
        password: this.password,
        repassword: this.repassword
      })
      this.$router.push('/user/', () => {
        this.$toasted.show('User has been created!', {
          type: 'success',
          position: 'bottom-center',
          iconPack: 'mdi-checkbox-marked-circle'
        }).goAway(3000)
      })
    },
    onCancel () {
      this.$router.replace('/user')
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
