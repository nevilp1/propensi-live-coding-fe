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
                required
                outlined
                disabled
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
              <v-combobox
                v-model="archetype"
                :items="archetypeFix"
                item-text="typeName"
                multiple
                chips
                outlined
                clearable
                small-chips
              ></v-combobox>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-label for="pic">PIC
              <v-p style="color:red">*</v-p>
            </v-label>
            <v-text-field
              v-model="pic"
              :rules="picRules"
              required
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col>
            <v-label for="team">Team
              <v-p style="color:red">*</v-p>
            </v-label>
            <v-text-field
              v-model="team"
              :rules="teamRules"
              required
              outlined
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-label for="insight">Insight
          <v-p style="color:red">*</v-p>
        </v-label>
        <v-textarea
          v-model="insight"
          :rules="insightRules"
          color="blue"
          required
          outlined
        >
        </v-textarea>

        <v-card
          flat
          class="d-flex justify-end mb-6"
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
              Submit
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
import moment from 'moment'

Vue.use(VueAxios, axios)
export default {
  metaInfo: { title: 'Insight Edit Page' },
  watch: {
    select: function (val) {
      this.archetypeFix = []
      /*eslint-disable */
      if (this.select == null) {
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
      console.log(this.archetypeFix)
      /* eslint-enable */
    },
    dataToUpdate: function (val) {
      this.team = val.insightTeamName
      this.insight = val.insightStatement
      this.pic = val.insightPicName
      this.select = this.riset.filter(o => {
        return o.id === val.riset ? o.id : null
      })[0]
      for (let i = 0; i < val.userTypeList.length; i++) {
        this.archetype.push(this.archetypeData.filter(o => {
          return o.id === val.userTypeList[i] ? o : null
        })[0])
      }
    }
  },
  mounted () {
    Vue.axios.get('http://localhost:2020/api/insightRisetList').then((res) => {
      this.riset = res.data
    })
    Vue.axios.get('http://localhost:2020/api/type').then((res) => {
      this.archetypeData = res.data
    })
    Vue.axios.get('http://localhost:2020/api/insight/update/' + this.$route.params.id).then((res) => {
      this.dataToUpdate = res.data.result
      console.log(res.data.result)
    })
    localStorage.setItem('submitted', this.submitted)
    console.log(this.dataToUpdate)
  },
  methods: {
    validate () {
      if (this.insight.length >= 255) {
        this.$toasted.show('Please fill in all fields and check for errors', {
          type: 'error',
          position: 'top-center'
        }).goAway(3000)
      } else {
        this.submit()
      }
    },
    submit () {
      this.toSubmit = {
        insightPicName: this.pic,
        insightTeamName: this.team,
        insightStatement: this.insight,
        riset: this.select === null ? null : this.select.id,
        user: parseInt(JSON.parse(localStorage.getItem('user')).id),
        status: true,
        archetype: this.archetype.map(obj => {
          return obj.id
        })
      }
      console.log(this.toSubmit)
      Vue.axios({
        method: 'post',
        url: 'http://localhost:2020/api/insight/update/' + this.$route.params.id + '/submit',
        headers: {},
        data: this.toSubmit
      }).then((res) => {
        if (res.data.status === 200) {
          this.submitted = true
          localStorage.setItem('submitted', this.submitted)
          console.log(res.data)
          this.$router.push({ name: 'InsightDetail' }, () => {
            this.$toasted.show('Insight has been updated!', {
              type: 'success',
              position: 'bottom-center',
              iconPack: 'mdi-checkbox-marked-circle'
            }).goAway(3000)
          })
        }
      })
    }
  },
  data: () => ({
    url_api: 'http://localhost:2020',
    valid: true,
    pic: null,
    picRules: [
      v => !!v || 'PIC is required'
    ],
    team: null,
    teamRules: [
      v => !!v || 'Team is required'
    ],
    insight: null,
    insightRules: [
      v => !!v || 'Insight is required',
      v => (v && v.length <= 255) || 'insight must be less than 255 characters'
    ],
    archtypeToSubmit: null,
    select: null,
    riset: undefined,
    archetype: [],
    archetypeData: undefined,
    archetypeFix: [],
    toSubmit: {},
    dataToUpdate: {},
    submitted: false,
    breadcrumbData: [
      {
        text: 'Insight',
        disabled: false,
        href: '/insight'
      },
      {
        text: 'Update Insight',
        disabled: true,
        href: 'insight/update'
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

.createInsight {
  margin-bottom: 24px;
  margin-top: 40px;
}

.title {
  color: #4F4F4F;
}

.submit {
  background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
  color: white;
}

.cancel {
  padding-right: 2rem
}

</style>
