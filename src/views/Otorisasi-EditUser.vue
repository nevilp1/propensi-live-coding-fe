<template>
  <v-card class="root" flat>
    <v-container>
      <v-row class="mb-9">
      <v-breadcrumbs
          :items="breadcrumbData"
          large
          style="padding-left: 0px; margin-top:2px;"
        ></v-breadcrumbs>
    </v-row>
        <v-container class="marginForm-otorisasi">
        <v-form v-model="isFormValid"
          @submit="onSubmit"
          @cancel="onCancel"
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
              <v-label for="username">Username <v-p style="color:red">*</v-p></v-label>
              <v-text-field
                placeholder="Username"
                id="username"
                :rules="usernameRules"
                v-model="username"
                single-line
                dense
                outlined
                clearable
                required
                filled
                disabled
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="5"
            >
              <v-label for="role">Role <v-p style="color:red">*</v-p></v-label>
              <v-autocomplete
                placeholder="Role"
                id="role"
                :items="items"
                :rules="roleRules"
                v-model="role"
                item-value="id"
                item-text="roleName"
                single-line
                dense
                outlined
                clearable
                required
                return-object
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
                id="email"
                :rules="emailRules"
                v-model="email"
                single-line
                dense
                outlined
                clearable
                required
                disabled
                filled
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="3"
            >
            <v-label for="nama">Name <v-p style="color:red">*</v-p></v-label>
              <v-text-field
                placeholder="Name"
                id="nama"
                :rules="namaRules"
                v-model="nama"
                single-line
                dense
                outlined
                clearable
                required
                disabled
                filled
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="3"
            >
              <v-label for="team">Team <v-p style="color:red">*</v-p></v-label>
              <v-text-field
                placeholder="Team"
                id="team"
                :rules="teamRules"
                v-model="team"
                single-line
                dense
                outlined
                clearable
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
              sm="3"
            >
              <v-label for="password">Password <v-p style="color:red">*</v-p></v-label>
              <v-text-field
                placeholder="Password"
                id="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[ rules.min ]"
                :type="show1 ? 'text' : 'password'"
                name="Password"
                v-model="password"
                outlined
                required
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
                placeholder="Re-Password"
                id="repassword"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[ rules.min, passwordConfirmationRule]"
                :type="show2 ? 'text' : 'password'"
                name="input"
                v-model="repassword"
                outlined
                required
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
                @click="$router.push('/user/detail-user/' + list.id)"
                min-width="152px"
                outlined
                color="error"
                class="marginButton">
                Cancel
              </v-btn>
              <v-btn
                style="background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
                color: white;"
                large
                :disabled="!isFormValid"
                min-width="152px"
                class = "marginButton"
                @click="onSubmit">
                Save
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
import Toasted from 'vue-toasted'
Vue.use(Toasted, {
  iconPack: 'material'
})
Vue.use(VueAxios, axios)
export default {
  metaInfo: { title: 'User Edit Page' },
  data () {
    return {
      url: 'http://localhost:2020',
      metaInfo: { title: 'Edit User Page' },
      isFormValid: false,
      list: undefined,
      show1: false,
      show2: false,
      // user: undefined,
      id: null,
      username: '',
      usernameRules: [
        v => !!v || 'Username is required'
      ],
      email: '',
      emailRules: [
        v => !!v || 'Email is required'
      ],
      nama: '',
      namaRules: [
        v => !!v || 'Name is required'
      ],
      team: '',
      teamRules: [
        v => !!v || 'Team is required'
      ],
      role: '',
      roleRules: [
        v => !!v || 'Role is required'
      ],
      items: ['Admin', 'Head of Product Design & Research', 'Researcher'],
      password: '',
      repassword: '',
      rules: {
        min: v => v.length >= 6 || 'Min 6 characters'
      },
      breadcrumbData: [
        {
          text: 'User List',
          disabled: false,
          href: '/user'
        },
        {
          text: 'Detail User',
          disabled: false,
          href: '/user/detail-user/' + this.$route.params.id
        },
        {
          text: 'Update User',
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
  beforeMount () {
    Vue.axios.get(this.url + '/api/user/' + this.$route.params.id)
      .then((res) => {
        this.list = res.data
        this.id = res.data.id
        this.username = res.data.username
        this.email = res.data.email
        this.nama = res.data.nama
        this.team = res.data.team
        var tempRole = res.data.role[0].name
        console.log(tempRole)
        if (tempRole === 'ROLE_HEAD_OF_RESEARCHER') {
          this.role = 'Head of Product Design & Research'
        } else if (tempRole === 'ROLE_ADMIN') {
          this.role = 'Admin'
        } else {
          this.role = 'Researcher'
        }
      })
  },
  methods: {
    async onSubmit () {
      // evt.preventDefault()
      console.log('Data user ' + this.username)
      const result = await axios.put(this.url + '/api/auth/user/' + this.$route.params.id + '/update', {
        id: this.id,
        username: this.username,
        nama: this.nama,
        email: this.email,
        role: [this.role],
        team: this.team,
        password: this.password,
        repassword: this.repassword
      }, { headers: this.authHeader() }
      )
      this.$router.push('/user/detail-user/' + this.id, () => {
        this.$toasted.show('User has been updated!', {
          type: 'success',
          position: 'bottom-center'
        }).goAway(3000)
      }, () => this.$toasted.error('Changes are not saved!', {
        type: 'error',
        position: 'bottom-center',
        icon: {
          name: 'check'
        }
      }).goAway(3000))
      console.log('Response' + result)
      console.log(result.data.status)
    },
    onCancel () {
      this.$router.push('/user/detail-user/' + this.id)
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
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
.root{
  margin-left: 124px;
  margin-right: 120px;
}
.marginForm-otorisasi{
  margin-top: 50px;
  margin-left: 0px;
}
.title-otorisasi{
  color: #4F4F4F;
  margin-top: 20px;
}
.marginButton{
  margin-top: 70px;
  margin-right: 30px;
  margin-bottom: 20px;
}
</style>
