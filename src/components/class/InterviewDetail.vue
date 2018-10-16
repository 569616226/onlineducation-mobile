<template>
	<div v-title data-title="课程详情" v-loading="loading">
		<div class="InterviewDetail">
			<div class="InterviewDetail-video">
				<showclass ref="showclass"></showclass>
			</div>
			<div class="InterviewDetail-title">
				<el-row>
					<el-col :span="24">
						<p class="InterviewDetail-title-h1">{{ data.name }}</p>
						<p class="InterviewDetail-title-p1">{{ data.title }}</p>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import wx from 'weixin-js-sdk'
	import api from '@/utils/api'
	import showclass from './showclass.vue'
	export default {
		components: {
			showclass
		},
		created() {
			this.getData()
		},
		data() {
			return {
				loading: false,
				data: []
			}
		},
		methods: {
			async getData() {
				this.loading = true
				const data = await api.getLessonEdit(this.$route.params.id)
				this.loading = false
				if(data.msg) {
					this.$dialog.confirm({
						mes: data.msg,
						opts: [{
							txt: '确定',
							color: "rgb(28, 116, 217)",
							callback: () => {
								window.history.go(-1)
							}
						}]
					});
				} else {
					this.$refs.showclass.getData(data.sections[0].id)
					this.data = data
					this.$nextTick(function() {
						window.scrollTo(0, 1)
						window.scrollTo(0, 0)
					})
					this.wx_config()
				}
			},
			// 基础配置
			wx_config() {
				let that = this;
				axios.post('/item/get_wechat_config', {
					'url': window.location.href.split('#')[0]
				}).then((res) => {
					if(res.data.status == true) {
						wx.config({
							debug: false,
							appId: res.data.config.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
							timestamp: res.data.config.timestamp, // 必填，生成签名的时间戳
							nonceStr: res.data.config.nonceStr, // 必填，生成签名的随机串
							signature: res.data.config.paySign, // 必填，签名，见附录1
							jsApiList: ['chooseWXPay', 'onMenuShareAppMessage']
						});
						wx.ready(function() {
							// 分享给朋友
							wx.onMenuShareAppMessage({
								title: '给你推荐一节好课', // 分享标题
								desc: that.nowClass, // 分享描述
								link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								imgUrl: that.data.pictrue, // 分享图标    现在还没有图标，先注释掉
								success: function() {
									alert('分享成功')
									// 用户确认分享后执行的回调函数
								},
								cancel: function() {
									// 用户取消分享后执行的回调函数
									alert('取消分享')
								}
							});
							// 分享到朋友圈
							wx.onMenuShareTimeline({
								title: '给你推荐一节好课', // 分享标题
								link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								imgUrl: that.data.pictrue, // 分享图标
								success: function() {
									// 用户确认分享后执行的回调函数
								},
								cancel: function() {
									// 用户取消分享后执行的回调函数
								}
							});
						});
					}
				}).catch((error) => {
					console.log(error);
				});
			}
		},
		computed: {

		},
		mounted() {

		},
		watch: {

		}
	}
</script>

<style lang="less" scoped>
	.InterviewDetail {
		background-color: rgb(23, 23, 23);
		height: 100vh;
		display: table-cell;
		vertical-align: middle;
		&-video {
			position: relative;
		}
		&-title {
			position: absolute;
			bottom: 0;
			width: 100%;
			border-top: 1px solid rgba(255, 255, 255, 0.3);
			padding: .4rem .3rem;
			&-h1 {
				color: rgba(255, 255, 255, 1);
				font-size: .33rem;
				font-weight: 700;
				font-family: PingFangSC, sans-serif;
			}
			&-p1 {
				color: rgba(255, 255, 255, 1);
				margin-top: .15rem;
			}
			&-TextRight {
				text-align: right;
			}
			&-img {
				width: 38px;
				border-radius: 50%;
			}
		}
	}
</style>