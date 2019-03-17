import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Calendar from './views/Calendar.vue'
import File from './views/File.vue'
import Form from './views/Form.vue'
import Reservation from './views/Reservation.vue'
import Class from './views/Class.vue'
import Team from './views/Team.vue'
import TeamFile from './views/Team/File.vue'
import TeamHome from './views/Team/Home.vue'
import TeamMember from './views/Team/Member.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/calendar',
      component: Calendar
    },
    {
      path: '/file',
      component: File
    },
    {
      path: '/form',
      component: Form
    },
    {
      path: '/reservation',
      component: Reservation
    },
    {
      path: '/class',
      component: Class
    },
    {
      path: '/team/:id',
      component: Team,
      children: [
        {
          path: 'home',
          component: TeamHome
        },
        {
          path: 'file',
          component: TeamFile
        },
        {
          path: 'member',
          component: TeamMember
        }
      ]
    }
  ]
})
