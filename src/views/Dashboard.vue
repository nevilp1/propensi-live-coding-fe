<template>
    <span>
        <v-container>
            <v-row class="mt-6">
            <v-col>
                <h2> Welcome back {{ this.username }} ! </h2>
                <h4> Summary of Research & Insight </h4>
                <v-row class="mt-8">
                    <v-col>
                    <h4 id="month"> Choose month: </h4>
                      <v-select v-on:change="changeMonth"
                      :items="items"
                      v-model="selectedMonth"
                      outlined
                      ></v-select>
                      <v-btn style="background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
                      color: white;" @click="generateReport"> Export to PDF
                      </v-btn>
                    </v-col>
                    <v-col>
                      <v-card class="px-5 py-5" outlined>
                        <h3 style="text-align:center">Research Total Amount: </h3>
                        <h1 style="text-align:center"> {{ total }} </h1>
                      </v-card>
                    </v-col>
                </v-row>
                <v-row class="mt-15">
                <v-card class="mt-15">
                  <apexchart class="pt-5" width="500" type="bar" :options="options" :series="series" ></apexchart>
                </v-card>
                </v-row>
            </v-col>
            <v-col>
              <v-row>
              <v-card class="ml-15">
                  <apexchart class="pt-5" width="500" type="line" :options="options2" :series="series2" ></apexchart>
                </v-card>
              </v-row>
              <v-row class="mt-15">
              <v-card class="ml-15">
                  <apexchart class="pt-5" width="500" type="bar" :options="options1" :series="series1" ></apexchart>
                </v-card>
              </v-row>
            </v-col>
            </v-row>
        </v-container>
        <div>
     <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="false"
        :preview-modal="true"
        :paginate-elements-by-height="1131"
        filename="Research & Insight Report"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-content-width="800px"

        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
    >
        <section slot="pdf-content">
            <div id="header " style="margin-top:3vw;margin-left:4vw;margin-right:3vw;">
            <img
          alt="Pinhome Logo"
          class="shrink ml-5"
          contain
          src="../assets/pinhome.png"
          width="180"
        />
        </div>
        <h3 style="text-align: center;font-family:Roboto;color:black">Research & Insight Report {{this.selectedMonth}} {{this.currentYear}} </h3>
        <div v-for='riset in risetBulanIni' :key='riset.id ' style="margin-top:3vw;margin-left:4vw;margin-right:3vw;">
          <h4 style="margin-top:1vw;margin-bottom:0.5vw;font-family:Roboto">Research Title: {{riset.researchTitle}}</h4>
          <v-row>
            <v-col>
          <p style="margin-top:0.3vw">Research ID <span class="tab" style="margin-left:56px"></span> : {{riset.id}}</p>
          <p style="margin-top:0.3vw">Research Date <span class="tab" style="margin-left:40px"></span> : {{format_date(riset.researchDate)}}</p>
          <p style="margin-top:0.3vw">Input Date <span class="tab" style="margin-left:66px"></span>       : {{format_date(riset.inputDate)}}</p>
            </v-col>
            <v-col>
              <p style="margin-top:0.3vw">PIC  <span class="tab" style="margin-left:103px"></span>: {{riset.pic}}</p>
              <p style="margin-top:0.3vw">Team  <span class="tab" style="margin-left:90px"></span>: {{riset.team}}</p>
              <p style="margin-top:0.3vw">Project Name  <span class="tab" style="margin-left:40px"></span>: {{riset.projectName}}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
            <h4 style="margin-bottom:1.5vw;font-family:Roboto ">Insight of {{riset.researchTitle}}</h4>
            <table>
            <tr>
              <th style="width:2vw;text-align:left">No</th>
              <th style="width:30vw;text-align:left">Insight Statement</th>
              <th style="width:15vw;text-align:left">Archetype</th>
            </tr>
            <tr v-for='(insight, index) in riset.insightModels' :key='insight.id'>
              <td>{{index}}</td>
              <td>{{insight.insightStatement}}</td>
              <td><p v-for='type in insight.insightArchetypeModels' :key='type.id'>{{type.userType.typeName }}</p></td>
            </tr>
          </table>
            </v-col>
          </v-row>
        </div>
        </section>
    </vue-html2pdf>
   </div>
    </span>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueApexCharts from 'vue-apexcharts'
// import jsPDF from 'jspdf'
import VueHtml2pdf from 'vue-html2pdf'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)
Vue.use(VueAxios, axios)

export default {
  metaInfo: { title: 'Dashboard Page' },
  components: {
    VueHtml2pdf
  },
  data: () => ({
    url: 'http://localhost:2020',
    items: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    username: '',
    total: 0,
    selectedMonth: null,
    options: null,
    series: null,
    options1: null,
    series1: null,
    options2: null,
    series2: null,
    currentYear: null,
    risetBulanIni: null
  }),
  beforeMount () {
    console.log(localStorage.getItem('user'))
    const user = localStorage.getItem('user')
    this.username = JSON.parse(user).username
    var d = new Date()
    this.currentYear = d.getFullYear()
    switch (d.getMonth()) {
      case 0:
        this.selectedMonth = 'January'
        break
      case 1:
        this.selectedMonth = 'February'
        break
      case 2:
        this.selectedMonth = 'March'
        break
      case 3:
        this.selectedMonth = 'April'
        break
      case 4:
        this.selectedMonth = 'May'
        break
      case 5:
        this.selectedMonth = 'June'
        break
      case 6:
        this.selectedMonth = 'July'
        break
      case 7:
        this.selectedMonth = 'August'
        break
      case 8 :
        this.selectedMonth = 'September'
        break
      case 9:
        this.selectedMonth = 'October'
        break
      case 10:
        this.selectedMonth = 'November'
        break
      case 11:
        this.selectedMonth = 'December'
        break
    }
    this.prepareChart1(d.getMonth() + 1)
    this.prepareChart2(d.getMonth() + 1)
    this.prepareChart3()
    this.getRiset(d.getMonth() + 1)
    Vue.axios.get(this.url + '/api/totalRiset')
      .then((resp) => {
        this.total = resp.data
      })
  },

  methods: {
    changeMonth () {
      this.prepareChart2(this.convertStringToMonth(this.selectedMonth))
      this.prepareChart1(this.convertStringToMonth(this.selectedMonth))
      this.getRiset(this.convertStringToMonth(this.selectedMonth))
    },
    async prepareChart1 (month) {
      const resp = await axios.get(this.url + '/api/insight-dashboard/' + month)
      var newResp = resp.data
      this.options = {
        chart: {
          id: 'insight-by-userType'
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        title: {
          text: 'Insight Amount Related to User Type',
          align: 'center'
        },
        xaxis: {
          categories: newResp.userType
        }
      }
      this.series = [{
        name: 'jumlahInsight',
        data: newResp.jumlahInsight
      }]
    },
    async prepareChart2 (month) {
      const resp = await axios.get(this.url + '/api/risetTeam/' + month)
      var newResp = resp.data
      this.options1 = {
        chart: {
          id: 'insight-by-userType'
        },
        title: {
          text: 'Research Amount Related to Research Team',
          align: 'center'
        },
        xaxis: {
          categories: newResp.namaTim
        }
      }
      this.series1 = [{
        name: 'jumlahInsight',
        data: newResp.jumlahRiset
      }]
    },
    async prepareChart3 (month) {
      const resp = await axios.get(this.url + '/api/insight-dashboard/')
      var newResp = resp.data
      this.options2 = {
        chart: {
          id: 'insight-per-month'
        },
        title: {
          text: 'Insight Amount per Month',
          align: 'center'
        },
        xaxis: {
          categories: newResp.userType
        }
      }
      this.series2 = [{
        name: 'jumlahInsight',
        data: newResp.jumlahInsight
      }]
    },
    async getRiset (month) {
      const resp = await axios.get(this.url + '/api/riset-dashboard/' + month)
      this.risetBulanIni = resp.data
    },
    convertStringToMonth (month) {
      var temp = null
      switch (month) {
        case 'January':
          temp = 1
          break
        case 'February':
          temp = 2
          break
        case 'March':
          temp = 3
          break
        case 'April':
          temp = 4
          break
        case 'May':
          temp = 5
          break
        case 'June':
          temp = 6
          break
        case 'July':
          temp = 7
          break
        case 'August':
          temp = 8
          break
        case 'September':
          temp = 9
          break
        case 'October':
          temp = 10
          break
        case 'November':
          temp = 11
          break
        case 'December':
          temp = 12
          break
      }
      return temp
    },
    generateReport () {
      this.$refs.html2Pdf.generatePdf()
    },
    format_date (value) {
      if (value) {
        return moment(String(value)).format('ddd, DD MMM YYYY')
      }
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap');
h2 {
  font-family: 'Open Sans';
  color:#1261A0
}
h4, h1, h5 {
  font-family: 'Open Sans'
}
h3 {
  font-family: 'Open Sans';
  color:#1261A0
}
p, th, td {
  font-family:'Roboto';
  font-size:14px;
}
#month {
  color: gray
}
.tab {
  display: inline-block;
}
table, td, th {
  border: 1px solid black;
}
td, th {
  padding:10px;
  padding-left:10px;
}
table {
  border-collapse: collapse;
}
div {
    page-break-inside:auto
}
</style>
