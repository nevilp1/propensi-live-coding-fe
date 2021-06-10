<template>
  <div>
    <div style="margin-top: 20px;">
      <!-- <v-card class="root"> -->
      <!-- <a class="title"
        @click="$router.push('/survey/')"
        >
        Screening Survey
      </a>
        / Create Survey -->
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
        ref="form"
        v-model="valid"
        lazy-validation
        >
        <v-row>
            <v-col
              cols="12"
              sm="6"
            >
            <v-label for="researchTitle" class="required">Research Title <v-p style="color:red">*</v-p></v-label>
              <v-text-field
                placeholder="Research Title"
                id="researchTitle"
                :rules="researchTitleRules"
                v-model="researchTitle"
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
              sm="3"
            >
            <v-label for="researchType">Research Type <v-p style="color:red">*</v-p></v-label>
              <v-text-field
                placeholder="Research Type"
                id="researchType"
                :rules="researchTypeRules"
                v-model="researchType"
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
            <v-label for="pic">PIC <v-p style="color:red">*</v-p></v-label>
              <v-autocomplete
                placeholder="PIC"
                id="picName"
                :rules="picNameRules"
                v-model="picName"
                :items="listPIC"
                item-value="pic"
                item-text="pic"
                single-line
                dense
                outlined
                clearable
                required
              ></v-autocomplete>
            </v-col>
            <v-col
              cols="12"
              sm="3"
            >
            <v-label for="team">Team <v-p style="color:red">*</v-p></v-label>
              <v-autocomplete
                placeholder="Team"
                id="team"
                :rules="teamRules"
                v-model="team"
                :items="listTeam"
                item-value="team"
                item-text="team"
                single-line
                dense
                outlined
                clearable
                required
              ></v-autocomplete>
            </v-col>
        </v-row>
        <v-row>
            <v-col
              cols="12"
              sm="9"
            >
            <v-label for="content">Content <v-p style="color:red">*</v-p></v-label>
              <v-textarea
                placeholder="Content"
                id="content"
                :rules="contentRules"
                v-model="content"
                single-line
                dense
                outlined
                clearable
                required
              ></v-textarea>
            </v-col>
        </v-row>
        <v-row>
            <v-col
              cols="12"
              sm="9"
            >
            <v-label for="criteria">Criteria <v-p style="color:red">*</v-p></v-label>
              <v-textarea
                placeholder="Criteria"
                id="criteria"
                :rules="criteriaRules"
                v-model="criteria"
                single-line
                dense
                outlined
                clearable
                required
              ></v-textarea>
            </v-col>
        </v-row>
        <v-row>
          <v-col
              cols="12"
            >
            <div class="tombol">
              <v-btn
                @click="$router.replace('/survey')"
                large
                min-width="152px"
                outlined
                color="error"
                class="marginButton">
                Cancel
              </v-btn>
              <v-btn style="background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
                    color: white;"
                    large
                    min-width="152px"
                    class="marginButton"
                    :disabled="!valid"
                    @click="validate"
                    >
                    Create
              </v-btn>
            </div>
          </v-col>
        </v-row>
        </v-form>
        </v-container>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

export default {
  name: 'CreateSurvey',
  metaInfo: { title: 'Create Survey Page' },
  data () {
    return {
      url: 'http://localhost:2020',
      errors: [],
      showErrors: [],
      breadcrumbData: [
        {
          text: 'Screening Survey List',
          disabled: false,
          href: '/survey'
        },
        {
          text: 'Screening Survey Create',
          disabled: false
        }
      ],
      valid: true,
      researchTitle: null,
      researchTitleRules: [
        v => !!v || 'Research Title is required'
      ],
      researchType: null,
      researchTypeRules: [
        v => !!v || 'Research Type is required'
      ],
      picName: null,
      picNameRules: [
        v => !!v || 'PIC is required'
      ],
      team: null,
      teamRules: [
        v => !!v || 'Team is required'
      ],
      content: null,
      contentRules: [
        v => !!v || 'Content is required'
      ],
      criteria: null,
      criteriaRules: [
        v => !!v || 'Criteria is required'
      ]
    }
  },
  created () {
    this.renderData()
  },
  methods: {
    onSubmit () {
      axios.post(this.url + '/api/survey/add', {
        researchTitle: this.researchTitle,
        researchType: this.researchType,
        picName: this.picName,
        team: this.team,
        content: this.content,
        criteria: this.criteria,
        status: true,
        inputDate: new Date()
      })
        .then((result) => {
          console.warn(result)
          this.$router.push('/survey', () => {
            this.$toasted.show('Research has been created', {
              type: 'success',
              position: 'bottom-center',
              iconPack: 'mdi-checkbox-marked-circle'
            }).goAway(3000)
          })
        })
    },
    renderData () {
      axios.get(this.url + '/api/user/team')
        .then((response) => {
          this.listTeam = response.data
          console.log(this.listTeam)
        })
      axios.get(this.url + '/api/user/pic')
        .then((response) => {
          this.listPIC = response.data
          console.log(this.listPIC)
        })
    },
    validate () {
      this.$refs.form.validate()
      this.onSubmit()
    },
    // validate () {
    //   if (this.picName === '') {
    //     this.errors.push('PIC')
    //   }
    //   if (!this.picName.trim()) {
    //     this.errors.push('PIC')
    //   }
    //   console.log(this.team)
    //   if (this.team === '') {
    //     this.errors.push('Team')
    //   }
    //   if (!this.team.trim()) {
    //     this.errors.push('Team')
    //   }
    //   if (this.errors.length === 0) {
    //     this.submit()
    //   } else {
    //     this.$toasted.show('Please fill in all fields', {
    //       type: 'error',
    //       position: 'top-center'
    //     }).goAway(3000)
    //   }
    //   this.errors = []
    // },
    onCancel () {
      this.$router.replace('/survey')
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
  margin-left: 124px;
}
/* .root{
  margin-left: 124px;
  margin-top: 10px;
  margin-right: 120px;
} */
</style>
