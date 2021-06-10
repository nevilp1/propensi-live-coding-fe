<template>
  <div v-if="items !=null">
    <v-card
      class="root"
      flat
    >
      <v-breadcrumbs
        :items="breadcrumbData"
        large
      ></v-breadcrumbs>
      <v-card
        class="content"
        flat
      >
        <h2>
          Insight
        </h2>
        <h2 class="attribute">
          {{ items.insightStatement }}
        </h2>
      </v-card>
      <v-card
        class="content"
        flat
      >
        <h4>
          Research
        </h4>
        <p>
          {{ items.riset }}
        </p>
      </v-card>

      <v-card
        class="d-flex justify-space-between mb-6"
        flat
        width="500px"
      >
        <v-card
          flat
        >
          <h4>
            PIC
          </h4>
          <p>
            {{ items.insightPicName }}
          </p>
        </v-card>

        <v-card
          flat
        >
          <h4>
            Team
          </h4>
          <p>
            {{ items.insightTeamName }}
          </p>
        </v-card>

        <v-card
          flat
        >
          <h4>
            Archetype
          </h4>
          <div v-for="item in tampung" v-bind:key="item.id">
            <p style="margin-bottom: 0">
              {{ item.typeName }}
            </p>
          </div>
        </v-card>
      </v-card>
      <v-divider/>
      <v-card
        class="comments"
        flat
      >
        <h2 class="komentarHeading">Comments ({{ this.items.listKomentar.length }})</h2>
        <v-text-field
          v-model="komentar"
          label="Type a Comment..."
          required
          outlined
          v-on:keyup.enter="submitKomentar"
        ></v-text-field>
        <v-card
          v-for="value in this.items.listKomentar.slice().reverse()"
          v-bind:key="value.id"
          flat
        >
          <v-card
            class="d-flex justify-space-between"
            style="margin-bottom: 0"
            flat
          >
            <p
              class="nameComment"
            >
              {{ value.name }} • {{ format_date(value.inputDate) }}
            </p>
            <v-dialog
              transition="dialog-top-transition"
              max-width="600"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  class="elevation-0"
                  color="error"
                  icon
                  fab
                  x-small
                  :disabled="!(currentUser === value.username || currentUserRole === 'ROLE_HEAD_OF_RESEARCHER')"
                >
                  <v-icon> mdi-delete</v-icon>
                </v-btn>
              </template>
              <template v-slot:default="dialog">
                <v-card>
                  <v-toolbar>
                    <v-spacer/>
                    <v-toolbar-title
                      style="color: #2790CC"
                      justify-center
                    > Delete comments from {{ value.username }}
                    </v-toolbar-title>
                    <v-spacer/>
                  </v-toolbar>
                  <img style="display: block; margin-left: auto; margin-right: auto;"
                       :src="require('../assets/problem.png')"/>
                  <v-card-text class="justify-center"
                               style="margin-top: 10px; color: black;
                  font-size: 18px; text-align: center; ;"
                  >
                    Are you sure want to delete the comments:
                    <p style="color: #828282;">
                      {{ value.komentar }}
                    </p>
                  </v-card-text>
                  <v-card-actions class="justify-center">
                    <v-btn
                      min-width="200px"
                      outlined
                      color="error"
                      @click="dialog.value = false"
                      style="margin-right: 20px;"
                    >No
                    </v-btn>
                    <v-btn
                      style="background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
                      color: white; margin-left: 20px;"
                      min-width="200px"
                      @click="deleteKomentar(value.id)"
                    >Yes
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>

          </v-card>
          <p
            class="komentarStyle"
          >
            {{ value.komentar }}
          </p>
        </v-card>

      </v-card>
      <v-card
        flat
        class="d-flex justify-space-between mb-6"
      >
        <v-btn
          outlined
          color="primary"
          dark
          large
          min-width="152px"
          v-bind:href="'/insight'"
        >
          Back
        </v-btn>
        <v-card
          flat
          class="d-flex justify-space-between mb-6"
        >
          <v-dialog
            transition="dialog-top-transition"
            max-width="600"
          >
            <template
              v-slot:activator="{ on, attrs }"
              v-if="currentUser === this.insightUser || currentUserRole === 'ROLE_HEAD_OF_RESEARCHER'"
            >
              <v-btn
                color="error"
                class="archiveButton"
                dark
                outlined
                large
                min-width="152px"
                v-bind="attrs"
                v-on="on"
              >
                Archive
              </v-btn>
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <v-toolbar>
                  <v-spacer/>
                  <v-toolbar-title
                    style="color: #2790CC"
                    justify-center
                  > Archive Insight
                  </v-toolbar-title>
                  <v-spacer/>
                </v-toolbar>
                <img style="display: block; margin-left: auto; margin-right: auto;"
                     :src="require('../assets/problem.png')"/>
                <v-card-text class="justify-center"
                             style="margin-top: 10px; color: black;
                  font-size: 18px; text-align: center; font-weight: bold;"
                >
                  Are you sure want to archive it?
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn
                    min-width="200px"
                    outlined
                    color="error"
                    @click="dialog.value = false"
                    style="margin-right: 20px;"
                  >No
                  </v-btn>
                  <v-btn
                    style="background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
                      color: white; margin-left: 20px;"
                    min-width="200px"
                    @click="archiveInsight($route.params.id)"
                  >Yes
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>

          <v-btn
            class="submit"
            dark
            large
            min-width="152px"
            v-bind:href="'/insight/update/' + $route.params.id"
            v-if="currentUser === this.insightUser || currentUserRole === 'ROLE_HEAD_OF_RESEARCHER'"
          >
            Edit
          </v-btn>
        </v-card>
      </v-card>
    </v-card>
  </div>
  <div v-else>
    <h1>
      Data not found
    </h1>
  </div>

</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'

Vue.use(VueAxios, axios)
export default {
  name: 'InsightDetail.vue',
  metaInfo: { title: 'Insight Details Page' },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted () {
    Vue.axios.get(this.url + '/api/insight/detail/' + this.$route.params.id).then((res) => {
      this.items = res.data.result
      this.tampung = this.items.archetype
      this.insightUser = this.items.username
    })
    this.submitted = localStorage.getItem('submitted')
    if (this.submitted === 'true') {
      this.alert = true
      window.setInterval(() => {
        this.submitted = false
        this.alert = false
        localStorage.setItem('submitted', this.submitted)
        console.log('hide alert after 3 seconds')
      }, 3000)
    }
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    archiveInsight (id) {
      Vue.axios.post(this.url + '/api/insight/delete/' + id).then((res) => {
        this.$router.push('/insight', () => {
          this.$toasted.show('Insight has been archived!', {
            type: 'success',
            position: 'bottom-center',
            iconPack: 'mdi-checkbox-marked-circle'
          }).goAway(3000)
        })
        console.log()
        location.reload()
      })
    },
    format_date (value) {
      if (value) {
        return moment(String(value)).format('DD MMMM YYYY')
      }
    },
    deleteKomentar (id) {
      Vue.axios.post(this.url + '/api/komentar/delete/' + id).then((res) => {
        if (res.data.status === 200) {
          this.$toasted.show('Comment has been deleted!', {
            type: 'success',
            position: 'bottom-center',
            iconPack: 'mdi-checkbox-marked-circle'
          }).goAway(3000)
          window.location.reload()
        }
      })
    },
    submitKomentar () {
      Vue.axios({
        method: 'post',
        url: this.url + '/api/komentar/create',
        headers: {},
        data: {
          komentar: this.komentar,
          userId: parseInt(JSON.parse(localStorage.getItem('user')).id),
          insightId: this.$route.params.id
        }
      }).then((res) => {
        console.log(this.$route.params.id)
        window.location.reload()
      }).catch((e) => {
        console.log(e)
        return e
      })
    },
    trigger () {
      this.$refs.sendReply.click()
    }
  },
  data: () => ({
    url: 'http://localhost:2020',
    currentUser: JSON.parse(localStorage.getItem('user')).username,
    currentUserRole: JSON.parse(localStorage.getItem('user')).roles[0],
    items: null,
    tampung: [],
    alert: false,
    alertDelete: true,
    komentar: '',
    insightUser: '',
    breadcrumbData: [
      {
        text: 'Insight',
        disabled: false,
        href: '/insight'
      },
      {
        text: 'Insight Detail',
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

.attribute {
  color: #4F4F4F;
  font-weight: normal;
}

.content {
  padding-bottom: 24px;
}

.komentarHeading {
  padding-bottom: 16px;
}

.nameComment {
  font-weight: 400;
  margin-bottom: 0;
  font-size: 1.17em;
  color: #4F4F4F;
}

.komentarStyle {
  color: #828282;
}

h3 {
  padding-bottom: 3px;
}

.title {
  color: #4F4F4F;
  margin-left: 0px;
}

.archiveButton {
  margin-right: 16px;
}

.submit {
  background: linear-gradient(180deg, #0088BB 0%, #1261A0 100%);
  color: white;
}

.myAlert {
  position: absolute;
  z-index: 100000;
  left: 50%;
  top: 90%;
}

.comments {
  padding-top: 24px;
}

</style>
