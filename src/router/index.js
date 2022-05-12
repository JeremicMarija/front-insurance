import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Insured from '../views/Insured.vue'
import AddInsured from '../views/AddInsured.vue'
import EditInsured from '../views/EditInsured.vue'
import PageNotFound from '../views/PageNotFound.vue'
import Vehicle from '../views/Vehicle.vue'
import AddVehicle from '../views/AddVehicle.vue'
import MaterialDamage from '../views/MaterialDamage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    // redirect: '/insureds',
    component: HomeView
  },
  {
    path: '/insureds',
    name: 'Insureds',
    component: Insured
  },
  {
    path: '/insureds/add',
    name: 'AddInsured',
    component: AddInsured
  },
  {
    path: '/insureds/edit/:insuredId',
    name: 'EditInsured',
    component: EditInsured
  },
  {
    path: '/vehicles',
    name: 'Vehicles',
    component: Vehicle
  },
  {
    path: '/vehicles/add',
    name: 'AddVehicles',
    component: AddVehicle
  },
  {
    path: '/materialDamages',
    name: 'MaterialDamages',
    component: MaterialDamage
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: PageNotFound
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
