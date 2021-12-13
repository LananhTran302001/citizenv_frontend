import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from "./store"
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faEye, faEyeSlash, faUserLock, 
  faTasks, faListAlt, faChartBar, 
  faSearch, faTable, faFileAlt,
  faTrash, faEdit, faPlus
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEye, faEyeSlash, faUserLock, 
  faTasks, faListAlt, faChartBar, faSearch, 
  faTable, faFileAlt, faTrash, faEdit, faPlus)

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
