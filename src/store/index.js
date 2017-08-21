import Vue from 'vue'
import Vuex from 'vuex'

import mainRoute from './mainRoute'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		mainRoute
	}
})

export default store