<template>
  <v-card
    class="root"
    flat
  >
    <v-breadcrumbs
      :items="breadcrumbData"
      large
    ></v-breadcrumbs>
    <v-form
      ref="form"
      v-model="valid"
      v-on:submit.prevent="validate"
      lazy-validation
    >
      <v-container>
        <v-row>
          <v-col>
            <v-card
              flat
            >
              <v-label for="riset">Riset
                <v-p style="color:red">*</v-p>
              </v-label>
              <v-select
                v-model="select"
                :items="riset"
                outlined
                dense
              >
                <template slot="selection" slot-scope="data">
                  <!-- HTML that describe how select should render selected items -->
                  {{ data.item.researchTitle }}
                </template>
                <template slot="item" slot-scope="data">
                  <!-- HTML that describe how select should render items when the select is open -->
                  {{ data.item.researchTitle }}
                </template>
              </v-select>
            </v-card>
          </v-col>
          <v-col>
            <v-card
              flat
            >
              <v-label for="archetype">Archetype
                <v-p style="color:red">*</v-p>
              </v-label>
              <v-autocomplete
                v-model="archetype"
                :items="archetypeFix"
                label="Archetype"
                item-value="id"
                item-text="typeName"
                required
                single-line
                outlined
                dense
                chips
                clearable
                small-chips
                multiple
              ></v-autocomplete>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-label for="pic">PIC
              <v-p style="color:red">*</v-p>
            </v-label>
            <v-autocomplete
              v-model="pic"
              :items="listPIC"
              label="PIC"
              item-value="pic"
              item-text="pic"
              single-line
              outlined
              dense
              clearable
            ></v-autocomplete>
          </v-col>
          <v-col>
            <v-label for="team">Team
              <v-p style="color:red">*</v-p>
            </v-label>
            <v-autocomplete
              v-model="team"
              :items="listTeam"
              label="Team"
              item-value="team"
              item-text="team"
              single-line
              outlined
              dense
              clearable
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div v-for="ins in insight" :key="ins">
              <v-label for="insight" :key="ins.id">Insight {{ ins.id + 1 }}
                <v-p style="color:red">*</v-p>
              </v-label>
              <v-textarea
                type="text"
                :key="ins.id"
                v-model="ins.value"
                :rules="insightRules"
                color="blue"
                required
                outlined
                dense
              >
              </v-textarea>
            </div>
          </v-col>
        </v-row>
        <v-btn
          color="success"
          fab
          x-small
          elevation="0"
          v-on:click="addInsight"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
        <v-card
          flat
          class="d-flex flex-wrap justify-end  mb-6"
        >
          <v-card flat class="cancel">
            <v-btn
              outlined
              color="error"
              dark
              large
              min-width="152px"
              v-bind:href="'/insight'"
            >
              Cancel
            </v-btn>
          </v-card>

          <v-card flat>
            <v-btn
              text
              type="submit"
              :disabled="!insight"
              class="submit"
              dark
              large
              min-width="152px"
            >
              Create
            </v-btn>
          </v-card>
        </v-card>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
export default {
  metaInfo: { title: 'Create Insight Page' },
  watch: {
    select: function (val) {
      console.log(val.id)
      this.archetypeFix = []
      if (val.id == null) {
        this.archetypeFix = this.archetypeData
      } else {
        /*eslint-disable */
        for (let i = 0; i < val.archetype.length; i++) {
          for (let j = 0; j < this.archetypeData.length; j++) {
            if (val.archetype[i] === this.archetypeData[j].id) {
              this.archetypeFix.push(this.archetypeData[j])
            }
          }
        }
        /* eslint-enable */
      }
    }
  },
  mounted () {
    Vue.axios.get('http://localhost:2020/api/insightRisetList').then((res) => {
      this.riset = res.data
      this.riset.unshift({ id: null, researchTitle: '-' })
      console.log(res.data)
    })
    Vue.axios.get('http://localhost:2020/api/type').then((res) => {
      this.archetypeData = res.data
      this.archetypeFix = this.archetypeData
    })
    Vue.axios.get('http://localhost:2020/api/user/team')
      .then((response) => {
        this.listTeam = response.data
        console.log(this.listTeam)
      })
    Vue.axios.get('http://localhost:2020/api/user/pic')
      .then((response) => {
        this.listPIC = response.data
        console.log(this.listPIC)
      })
    localStorage.setItem('submitted', this.submitted)
  },
  methods: {
    addInsight () {
      this.insight.push({ id: this.insight.length, value: '' })
    },
    validate () {
      if (this.archetype.length === 0) {
        this.errors.push('Archetype')
      }
      console.log(this.pic)
      if (this.pic === '') {
        this.errors.push('PIC')
      }
      if (!this.pic.trim()) {
        this.errors.push('PIC')
      }
      console.log(this.team)
      if (this.team === '') {
        this.errors.push('Team')
      }
      if (!this.team.trim()) {
        this.errors.push('Team')
      }
      for (const i in this.insight) {
        if (this.insight[i].value === '') {
          this.errors.push('Insight ' + i)
        }
        if (!this.insight[i].value.trim()) {
          this.errors.push('Insight ' + i)
        }
        if (this.insight[i].value.length >= 255) {
          this.errors.push('insight ' + i)
        }
      }
      if (this.errors.length === 0) {
        this.submit()
      } else {
        this.$toasted.show('Please fill in all fields and check for errors', {
          type: 'error',
          position: 'top-center'
        }).goAway(3000)
      }
      this.errors = []
    },
    submit () {
      this.toSubmit = {
        insightPicName: this.pic,
        insightTeamName: this.team,
        insightList: this.insight.map(v => v.value),
        riset: this.select.id,
        user: parseInt(JSON.parse(localStorage.getItem('user')).id),
        status: true,
        archetype: this.archetype
      }
      Vue.axios({
        method: 'post',
        url: 'http://localhost:2020/api/insight/create',
        headers: {},
        data: this.toSubmit
      }).then((res) => {
        if (res.data.status === 200) {
          this.submitted = true
          localStorage.setItem('submitted', this.submitted)
          this.$router.push('/insight/', () => {
            this.$toasted.show('Insight has been created!', {
              type: 'success',
              position: 'bottom-center',
              iconPack: 'mdi-checkbox-marked-circle'
            }).goAway(3000)
          })
        }
      }).catch((e) => {
        console.log(e)
        return e
      })
    }
  },
  data: () => ({
    url_api: 'http://localhost:2020',
    valid: true,
    listPIC: [],
    listTeam: [],
    errors: [],
    showErrors: [],
    dialog: false,
    pic: '',
    picRules: [
      v => !!v || 'PIC is required'
    ],
    team: '',
    teamRules: [
      v => !!v || 'Team is required'
    ],
    insight: [{ id: 0, value: '' }],
    insightRules: [
      v => !!v || 'Insight is required',
      (v) => (v && v.length <= 255) || 'Insight must be less than 255 characters'
    ],
    select: null,
    riset: [],
    archetype: [],
    archetypeData: [],
    archetypeFix: [],
    toSubmit: {},
    submitted: false,
    breadcrumbData: [
      {
        text: 'Insight',
        disabled: false,
        href: '/insight'
      },
      {
        text: 'Create New Insight',
        disabled: true,
        href: 'insight/create'
      }
    ]
  })
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');

.root {
  margin-left: 124px;
  margin-top: 10px;
  margin-right: 120px;
}

.title {
  color: #4F4F4F;
  margin-left: 0%;
}

.submit {
  background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
  color: white;
}

.cancel {
  padding-right: 2rem
}

</style>
