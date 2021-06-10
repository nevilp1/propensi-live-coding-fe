import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import DaftarRiset from '../views/DaftarRiset.vue'
import FormRiset from '../views/Riset-Create.vue'
import ListRiset from '../views/Riset-List.vue'
import DetailRiset from '../views/Riset-Detail.vue'
import UpdateRiset from '../views/Riset-Update.vue'
import Insight from '../views/Insight.vue'
import InsightAdd from '../views/InsightAdd.vue'
import InsightDetail from '../views/InsightDetail.vue'
import InsightUpdate from '../views/InsightUpdate.vue'
import Login from '../views/Login.vue'
import DaftarUser from '../views/Otorisasi-DaftarUser.vue'
import CreateUser from '../views/Otorisasi-CreateUser.vue'
import DetailUser from '../views/Otorisasi-DetailUser.vue'
import EditUser from '../views/Otorisasi-EditUser.vue'
import TrashBinRiset from '../views/TrashBin-Riset.vue'
import TrashBinDetailRiset from '../views/TrashBin-DetailRiset.vue'
import TrashBinInsight from '../views/TrashBin-Insight.vue'
import TrashBinDetailInsight from '../views/TrashBin-DetailInsight.vue'
import CreateSurvey from '../views/CreateSurvey.vue'
import DaftarSurvey from '../views/DaftarSurvey.vue'
import DetailSurvey from '../views/DetailSurvey.vue'
import EditSurvey from '../views/EditSurvey.vue'
import Navbar from '../views/NavBar/Navbar.vue'
import NavbarRiset from '../views/NavBar/NavbarRiset.vue'
import Forbidden from '../views/Forbidden.vue'
import Dashboard from '../views/Dashboard.vue'
import TrashBinUser from '../views/TrashBin-User.vue'
import TrashBinDetailUser from '../views/TrashBin-DetailUser.vue'
import DetailParticipant from '../views/DetailPartisipan.vue'
import EditParticipant from '../views/EditPartisipan.vue'
import DaftarPartisipan from '../views/DaftarPartisipan.vue'
import DetailRisetPartisipan from '../views/DetailRisetPartisipan.vue'

Vue.use(VueRouter)
const routes: Array<RouteConfig> = [
  {
    path: '/',
    beforeEnter: (to, from, next) => {
      const login = localStorage.getItem('user')
      if (login) {
        next('/dashboard')
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/dashboard',
    component: NavbarRiset,
    children: [
      {
        path: '',
        component: Dashboard
      }
    ]
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: Forbidden
  },
  {
    path: '/daftar',
    name: 'DaftarRiset',
    component: DaftarRiset
  },
  {
    path: '/daftar/:id',
    name: 'DetailRisetPartisipan',
    component: DetailRisetPartisipan
  },
  {
    path: '/user',
    component: Navbar,
    children: [
      {
        path: '',
        component: DaftarUser
      },
      {
        path: 'create-user',
        component: CreateUser
      },
      {
        path: '/user/detail-user/:id',
        name: 'DetailUser',
        component: DetailUser
      },
      {
        path: '/user/edit-user/:id',
        name: 'EditUser',
        component: EditUser
      }
    ],
    beforeEnter: (to, from, next) => {
      const login = localStorage.getItem('user')
      if (login) {
        const loggedIn = login !== null ? JSON.parse(login) : 'not logged in'
        if (loggedIn.roles.includes('ROLE_ADMIN')) {
          next()
        } else {
          next('/forbidden')
        }
      } else {
        next('/forbidden')
      }
    }
  },
  {
    path: '/survey',
    component: NavbarRiset,
    children: [
      {
        path: '',
        name: 'DaftarSurvey',
        component: DaftarSurvey
      },
      {
        path: '/survey/detail/:id',
        name: 'DetailSurvey',
        component: DetailSurvey
      },
      {
        path: '/survey/edit/:id',
        name: 'EditSurvey',
        component: EditSurvey
      },
      {
        path: '/survey/add',
        name: 'CreateSurvey',
        component: CreateSurvey
      },
      {
        path: '/survey/participant/:id',
        name: 'DaftarPartisipan',
        component: DaftarPartisipan
      },
      {
        path: '/survey/participant/detail/:id',
        name: 'DetailParticipant',
        component: DetailParticipant
      },
      {
        path: '/survey/participant/edit/:id',
        name: 'EditParticipant',
        component: EditParticipant
      },
      {
        path: '/add-riset',
        name: 'FormRiset',
        component: FormRiset
      },
      {
        path: '/list-riset',
        name: 'ListRiset',
        component: ListRiset
      },
      {
        path: '/riset/detail-riset/:id',
        name: 'DetailRiset',
        component: DetailRiset
      },
      {
        path: '/riset/update-riset/:id',
        name: 'UpdateRiset',
        component: UpdateRiset
      },
      {
        path: '/insight',
        name: 'ListInsight',
        component: Insight
      },
      {
        path: '/insight/add',
        name: 'AddInsight',
        component: InsightAdd
      },
      {
        path: '/insight/detail/:id',
        name: 'InsightDetail',
        component: InsightDetail
      },
      {
        path: '/insight/update/:id',
        name: 'InsightUpdate',
        component: InsightUpdate
      }
    ],
    beforeEnter: (to, from, next) => {
      const login = localStorage.getItem('user')
      if (login) {
        const loggedIn = login !== null ? JSON.parse(login) : 'not logged in'
        if (loggedIn.roles.includes('ROLE_RESEARCHER')) {
          next()
        } else if (loggedIn.roles.includes('ROLE_HEAD_OF_RESEARCHER')) {
          next()
        } else {
          next('/forbidden')
        }
      } else {
        next('/forbidden')
      }
    }
  },
  {
    path: '/trash-bin',
    component: NavbarRiset,
    children: [
      {
        path: '/trash-bin/riset',
        name: 'TrashBinRiset',
        component: TrashBinRiset
      },
      {
        path: '/trash-bin/detail-riset/:id',
        name: 'TrashBinDetailRiset',
        component: TrashBinDetailRiset
      },
      {
        path: '/trash-bin/insight',
        name: 'TrashBinInsight',
        component: TrashBinInsight
      },
      {
        path: '/trash-bin/detail-insight/:id',
        name: 'TrashBinDetailInsight',
        component: TrashBinDetailInsight
      },
      {
        path: '/trash-bin/user',
        name: 'TrashBinUser',
        component: TrashBinUser
      },
      {
        path: '/trash-bin/detail-user/:id',
        name: 'TrashBinDetailUser',
        component: TrashBinDetailUser
      }
    ],
    beforeEnter: (to, from, next) => {
      const login = localStorage.getItem('user')
      if (login) {
        const loggedIn = login !== null ? JSON.parse(login) : 'not logged in'
        if (loggedIn.roles.includes('ROLE_HEAD_OF_RESEARCHER')) {
          next()
        } else {
          next('/forbidden')
        }
      } else {
        next('/forbidden')
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
