require('./bootstrap');
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueScrollTo from 'vue-scrollto'
import Scrollspy from 'vue2-scrollspy';
import './index.css'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.rem.css';
import Scrollactive from 'vue-scrollactive'
import Storage from 'vue-web-storage'
import { getCookie, setCookie } from '@/utils'
import api from '@/utils/api'
import VueLocalStorage from 'vue-localstorage'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false;
Vue.use(YDUI);
Vue.use(Scrollactive);
Vue.use(VueScrollTo);
Vue.use(Scrollspy);
Vue.use(Storage);
Vue.use(VueLocalStorage);

async function mobileNext(wx, next) {
	const data = await api.getToken(wx)
	setCookie('token', data.token, null)
	next()
}

axios.interceptors.request.use(
	config => {
		config.headers.Accept = 'application/json';
		config.headers.Authorization = 'Bearer ' + getCookie('token');
		return config;
	}, err => {
		return Promise.reject(err);
	});

axios.interceptors.response.use(
	response => {
		if(response.status == 204) {
			// 返回 204 退出登陆成功返回登陆页面
			// window.location.reload();
		}
		return response;
	},
	error => {
		return Promise.reject(error); // 返回接口返回的错误信息
	});

//动态设置title
Vue.directive('title', {
	inserted: function(el, binding) {
		document.title = el.dataset.title
	}
});

// 接受地址栏参数
function GetQuery(key) {
	var search = window.location.href.split('#')[1];
	var arr = search.split("?");
	for(var i = 0; i < arr.length; i++) {
		var ar = arr[i].split("=");
		if(ar[0] == key) {
			if(unescape(ar[1]) == 'undefined') {
				return "";
			} else {
				return unescape(ar[1]);
			}
		}
	}
	return "";
}
// 获取个人信息
function getUserMessage() {
	if(Vue.$storage.get('userM')) {
		console.log(Vue.$storage.get('userM'))
	} else {
		axios.get('/item/guest/profile')
			.then((res) => {
				Vue.$storage.set('userM', res.data.guest);
				Vue.$storage.set('messages_count', res.data.messages_count);
			}).catch((error) => {
				console.log(error)
			})
	}
}

router.beforeEach((to, from, next) => {
	if(to.name == 'no_wechat') {
		return false;
	}
	if(to.name == 'TrainDetail' || to.name == 'FillInfo' || to.name == "ConferenceSign" || to.name == 'SignSuccess') {
		next()
	} else {
		//setCookie('openid', 'oDMF40XKBaEC5aBZJ0Nb-RQjis0Y', null)
		if(getCookie('openid')) {
			let wx = {
				openid: getCookie('openid')
			}
			if(getCookie('token')) {
				next()
			} else {
				mobileNext(wx, next)
			}

		} else {
			if(to.name == 'auth') {
				next()
			} else {
				next("/auth")
			}
		}
	}
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	template: '<App/>',
	components: {
		App
	},
	localStorage: {
		searchclassdata: {
			type: Array,
			default: []
		},
		localhistory: {
			type: Array,
			default: []
		},
		currentTime: {
			type: Array,
			default: ['5']
		},
		indexData: {
			type: Object,
			default: '1'
		},
		advertData: {
			type: Array,
			default: []
		}
	}
});