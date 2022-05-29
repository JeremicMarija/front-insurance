import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Insured from '../views/Insured.vue'
import AddInsured from '../views/AddInsured.vue'
import EditInsured from '../views/EditInsured.vue'
import PageNotFound from '../views/PageNotFound.vue'
import Vehicle from '../views/Vehicle.vue'
import AddVehicle from '../views/AddVehicle.vue'
import EditVehicle from '../views/EditVehicle.vue'
import MaterialDamage from '../views/MaterialDamage.vue'
import AddMaterialDamage from '../views/AddMaterialDamage.vue'
import EditMaterialDamage from '../views/EditMaterialDamage.vue'
import DamageItem from '../views/DamageItem.vue'
import ShowVehiclesOfInsured from '../views/ShowVehiclesOfInsured.vue'
import ShowMaterialDamagesOfVehicle from '../views/ShowMaterialDamagesOfVehicle.vue'

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
    path: '/vehicles/add/:insuredId',
    name: 'AddVehiclesByInsuredId',
    component: AddVehicle
  },
  {
    path: '/vehicles/edit/:vehicleId',
    name: 'EditVehicles',
    component: EditVehicle
  },
  {
    path: '/materialDamages',
    name: 'MaterialDamages',
    component: MaterialDamage
  },
  {
    path: '/materialDamages/add',
    name: 'AddMaterialDamage',
    component: AddMaterialDamage
  },
  {
    path: '/materialDamages/add/:vehicleId',
    name: 'AddMaterialDamageByVehicleId',
    component: AddMaterialDamage
  },
  {
    path: '/materialDamages/edit/:materialDamageId',
    name: 'EditMaterialDamage',
    component: EditMaterialDamage
  },
  {
    path: '/materialDamages/:materialDamageId/createItem',
    name: 'DamageItem',
    component: DamageItem
  },
  {
    path: '/vehicles/insured/:insuredId',
    name: 'ShowVehiclesOfInsured',
    component: ShowVehiclesOfInsured
  },
  {
    path: '/materialDamages/vehicle/:vehicleId',
    name: 'ShowMaterialDamagesOfVehicle',
    component: ShowMaterialDamagesOfVehicle
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
