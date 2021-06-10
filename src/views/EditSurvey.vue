<template>
  <div style="margin-top: 20px;">
      <!-- <a class="title"
        @click="$router.push('/survey/')"
        >
        Screening Survey
      </a>
        / Edit Survey -->
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
      ref="form"
      v-model="valid"
      lazy-validation
    >
    <v-row>
        <v-col
          cols="12"
          sm="6"
        >
        <v-label for="researchTitle">Research Title <v-p style="color:red">*</v-p></v-label>
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
          <v-text-field
            placeholder="PIC"
            id="picName"
            :rules="picNameRules"
            v-model="picName"
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
            disabled
          ></v-text-field>
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
          @click="$router.push('/survey/detail/' + list.id)"
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
            Save
            </v-btn>
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
  name: 'EditSurvey',
  metaInfo: { title: 'Survey Edit Page' },
  data () {
    return {
      url: 'http://localhost:2020',
      list: undefined,
      survey: undefined,
      id: null,
      breadcrumbData: [
        {
          text: 'Screening Survey List',
          disabled: false,
          href: '/survey'
        },
        {
          text: 'Screening Survey Update',
          disabled: false
        }
      ],
      researchTitle: '',
      researchTitleRules: [
        v => !!v || 'Research Title is required'
      ],
      researchType: '',
      researchTypeRules: [
        v => !!v || 'Research Type is required'
      ],
      picName: '',
      picNameRules: [
        v => !!v || 'PIC is required'
      ],
      team: '',
      teamRules: [
        v => !!v || 'Team is required'
      ],
      content: '',
      contentRules: [
        v => !!v || 'Content is required'
      ],
      criteria: '',
      criteriaRules: [
        v => !!v || 'Criteria is required'
      ]
    }
  },
  created () {
    this.renderData()
  },
  beforeMount () {
    Vue.axios.get(this.url + '/api/survey/' + this.$route.params.id)
      .then((res) => {
        this.list = res.data
        this.id = res.data.id
        this.researchTitle = res.data.researchTitle
        this.researchType = res.data.researchType
        this.picName = res.data.picName
        this.team = res.data.team
        // this.linkToForm = res.data.linkToForm
        // this.linkToParticipant = res.data.linkToParticipant
        this.content = res.data.content
        this.criteria = res.data.criteria
      })
  },
  methods: {
    async onSubmit () {
      // evt.preventDefault()
      console.log('Data survey ' + this.researchTitle)
      const result = await axios.put(this.url + '/api/survey/update/' + this.$route.params.id, {
        id: this.id,
        researchTitle: this.researchTitle,
        researchType: this.researchType,
        // linkToForm: this.linkToForm,
        // linkToParticipant: this.linkToParticipant,
        picName: this.picName,
        team: this.team,
        content: this.content,
        criteria: this.criteria,
        status: true,
        inputDate: '2020-01-01'
      }, { headers: this.authHeader() }
      )
      console.log('Response' + result)
      this.$router.replace('/survey/detail/' + this.id, () => {
        this.$toasted.show('Screening Survey has been updated!', {
          type: 'success',
          position: 'bottom-center',
          iconPack: 'mdi-checkbox-marked-circle'
        }).goAway(3000)
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
    onCancel () {
      this.$router.replace('/survey/detail/' + this.id)
    },
    validate () {
      this.$refs.form.validate()
      this.onSubmit()
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
