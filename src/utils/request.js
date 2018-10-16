import { getCookie, setCookie, delCookie } from '@/utils'
import Vue from 'vue'
import router from '@/router'
const Fly = require("flyio/dist/npm/fly")
const request = new Fly

request.interceptors.request.use((request) => {
	request.headers.Accept = 'application/json'
	request.headers.Authorization = 'Bearer ' + getCookie('token')
	return request
})

request.interceptors.response.use(
	(response, promise) => {
		return promise.resolve(response.data)
	},
	(err, promise) => {
//		if(err.status == 401 ||　err.status || 500) {
//			delCookie('token')
//			window.location.reload()
//		}
		return promise.resolve()
	}
)

export default request