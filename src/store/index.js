import Vue from 'vue'
import Vuex from 'vuex'
import class_store from './modules/class'
Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
        classes: class_store
    }
})
