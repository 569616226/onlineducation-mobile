import request from './request'
import apiUrl from './apiUrl'
const api_url = apiUrl
const api = {
	//获取token
	getToken: (wx) => request.post(`${api_url}/item/login`, {
		openid: wx.openid
	}),
	//课程详情
	getLessonEdit: (id) => request.get(`${api_url}/item/lesson/${id}/edit`),
	//分类
	getGenrelist: () => request.get(`${api_url}/item/genre/lists`),
	//栏目
	getNavlist: () => request.get(`${api_url}/item/nav/lists`),
	//栏目课程列表
	getNavLessons: (id) => request.get(`${api_url}/item/lesson/${id}/nav_lessons`),
	//标签课程列表
	getGenreLessons: (id, GenId) => request.get(`${api_url}/item/lesson/${id}/nav/${GenId}/genre_lessons`),
	//培训栏目课程列表
	getNavTrains: (id) => request.get(`${api_url}/item/train/${id}/nav_trains`),
	//培训标签课程列表
	getGenreTrains: (id, GenId) => request.get(`${api_url}/item/train/${id}/nav/${GenId}/genre_trains`),
	//培训详情
	getTrainDetail: (id) => request.get(`${api_url}/item/train/${id}`),
	//培训收藏
	getTrainCollect: (id) => request.get(`${api_url}/item/train/${id}/collect`),
	//培训取消收藏
	getTrainUncollect: (id) => request.get(`${api_url}/item/train/${id}/uncollect`),
	//个人信息
	getGuestProfile: () => request.get(`${api_url}/item/guest/profile`),
	//根据手机查找以前报名表数据
	postTrainGetSign: (phone) => request.post(`${api_url}/item/train/get_sign`, {
		tel: phone
	}),
	//活动报名
	postTrainSign: (id, data) => request.post(`${api_url}/item/train/${id}/sign`, {
		name: data.name,
		referee: data.referee,
		tel: data.phone,
		company: data.company,
		offer: data.offer,
	}),
	//签到
	postGuestSigned: (id, data) => request.post(`${api_url}/item/train/${id}/guest_signed`, {
		name: data.name,
		referee: data.referee,
		tel: data.phone,
		company: data.company,
		offer: data.offer,
	}),
	//编辑个人资料
	postGuestUpdate: (id, data) => request.post(`${api_url}/item/guest/${id}/update`, data),
	//消息列表
	getMessageList: () => request.get(`${api_url}/item/message/lists`),
	//消息列表无限加载
	getMessageLists: (url) => request.get(`${url}`),
}

export default api