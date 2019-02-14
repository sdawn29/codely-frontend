import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueSession from 'vue-session'
import 'vue-calendar-heatmap/dist/vue-calendar-heatmap.css'
import VueCalendarHeatmap from 'vue-calendar-heatmap/dist/vue-calendar-heatmap.common'
import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';

Vue.use(VueCalendarHeatmap);
 
Vue.use(Donut);

Vue.use(VueSession);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
