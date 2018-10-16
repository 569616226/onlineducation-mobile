<template>
	<div v-title data-title="会议签到" v-loading="loading">
		<img :src="train.pic" class="FillInfo-signbg" />
		<div class="FillInfo">
			<yd-cell-group>
				<yd-cell-item class="FillInfo-cell">
					<yd-icon slot="icon" name="icon-cellphone-iphone" custom size=".35rem" color="rgb(174, 188, 198)"></yd-icon>
					<yd-input slot="right" ref="phone" v-model="data.phone" placeholder="请输入11位手机号" class="FillInfo-input" :on-blur="getSign" @input="checkNo" max="11" :show-success-icon="false" :show-error-icon="false"></yd-input>
				</yd-cell-item>

				<div v-if="oldUser">
					<div class="FillInfo-oldUser">
						<p class="FillInfo-oldUser-h1">欢迎光临，{{data.name}}</p>
						<p class="FillInfo-oldUser-p1">由于您是商学院的老朋友，只需输入手机号即可完成签到！</p>
					</div>
				</div>
				<div v-else>
					<yd-cell-item class="FillInfo-cell">
						<yd-icon slot="icon" name="icon-yonghu" custom size=".35rem" color="rgb(174, 188, 198)"></yd-icon>
						<yd-input slot="right" ref="name" v-model="data.name" placeholder="请输入您的姓名" class="FillInfo-input"></yd-input>
					</yd-cell-item>

					<yd-cell-item class="FillInfo-cell">
						<yd-icon slot="icon" name="icon-city" custom size=".35rem" color="rgb(174, 188, 198)"></yd-icon>
						<yd-input slot="right" ref="company" v-model="data.company" placeholder="请输入您的公司名称" class="FillInfo-input"></yd-input>
					</yd-cell-item>

					<yd-cell-item class="FillInfo-cell">
						<yd-icon slot="icon" name="icon-contact-mail" custom size=".35rem" color="rgb(174, 188, 198)"></yd-icon>
						<yd-input slot="right" ref="offer" v-model="data.offer" placeholder="请输入您的职位" class="FillInfo-input"></yd-input>
					</yd-cell-item>

					<yd-cell-item class="FillInfo-cell">
						<yd-icon slot="icon" name="icon-account-plus" custom size=".35rem" color="rgb(174, 188, 198)"></yd-icon>
						<yd-input slot="right" ref="referee" v-model="data.referee" placeholder="请输入推荐人姓名" class="FillInfo-input"></yd-input>
					</yd-cell-item>
				</div>
			</yd-cell-group>
			<div class="FillInfo-button" @click="FromInfo">
				<p>签到</p>
			</div>
			<div style="height: 1rem;"></div>
		</div>
	</div>
</template>

<script>
	import wx from 'weixin-js-sdk'
	import api from '@/utils/api'
	import { mapState, mapActions } from 'vuex'
	export default {
		components: {

		},
		created() {

		},
		data() {
			return {
				data: {
					name: '',
					phone: '',
					company: '',
					offer: '',
					referee: ''
				},
				train: [],
				loading: false,
				oldUser: false
			}
		},
		methods: {
			...mapActions([
				'getGuestProfile'
			]),
			checkNo(value) {
				console.log(value)
				if(value) {
					this.$nextTick(() => {
						this.data.phone = value.replace(/\D/g,'')
					});
				}
			},
			async getData() {
				const train = await api.getTrainDetail(this.$route.params.id)
				this.train = train.train
				if(this.GuestProfileData.length == 0) {
					await this.getGuestProfile()
					this.data.name = this.GuestProfileData.guest.name
					this.data.phone = this.GuestProfileData.guest.phone
					this.data.company = this.GuestProfileData.guest.company
					this.data.offer = this.GuestProfileData.guest.offer
					this.data.referee = this.GuestProfileData.guest.referee
				} else {
					this.data.name = this.GuestProfileData.guest.name
					this.data.phone = this.GuestProfileData.guest.phone
					this.data.company = this.GuestProfileData.guest.company
					this.data.offer = this.GuestProfileData.guest.offer
					this.data.referee = this.GuestProfileData.guest.referee
				}
				this.wx_config()
			},
			async FromInfo() {
				if(this.oldUser) {
					this.loading = true
					const data = await api.postGuestSigned(this.$route.params.id, this.data)
					this.loading = false
					if(data.status) {
						this.$router.push({
							name: 'SignSuccess'
						})
					}else{
						this.$message.error(data.message)
					}
				} else {
					if(!this.data.phone) {
						this.$message.error('请输入手机号')
						return false
					}
					if(!this.data.name) {
						this.$message.error('请输入姓名')
						return false
					}
					if(!this.data.company) {
						this.$message.error('请输入公司')
						return false
					}
					if(!this.data.offer) {
						this.$message.error('请输入职位')
						return false
					}
					this.loading = true
					const data = await api.postGuestSigned(this.$route.params.id, this.data)
					this.loading = false
					if(data.status) {
						this.$router.push({
							name: 'SignSuccess'
						})
					}else{
						this.$message.error(data.message)
					}
				}
			},
			async getSign() {
				const data = await api.postTrainGetSign(this.data.phone)
				if(data.data) {
					this.data.name = data.data.name
					this.data.phone = data.data.tel
					this.data.company = data.data.company
					this.data.offer = data.data.offer
					this.data.referee = data.data.referee
					this.oldUser = true
				} else {
					this.oldUser = false
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
								title: that.train.name, // 分享标题
								desc: that.train.title, // 分享描述
								link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								imgUrl: that.train.pic, // 分享图标    现在还没有图标，先注释掉
								success: function() {
									//alert('分享成功')
									// 用户确认分享后执行的回调函数
								},
								cancel: function() {
									// 用户取消分享后执行的回调函数
									//alert('取消分享')
								}
							});
							// 分享到朋友圈
							wx.onMenuShareTimeline({
								title: that.train.name, // 分享标题
								link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								imgUrl: that.train.pic, // 分享图标
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
			},
		},
		computed: {
			...mapState({
				GuestProfileData: state => state.classes.GuestProfileData
			})
		},
		mounted() {
			this.getData()
		},
		watch: {

		}
	}
</script>

<style lang="less" scoped>
	.FillInfo {
		padding: .1rem .4rem 0 .4rem;
		&-signbg {
			width: 100%;
		}
		&-button {
			margin-top: .6rem;
			text-align: center;
			background-color: rgb(8, 154, 255);
			color: rgb(255, 255, 255);
			border-radius: 4px;
			padding: .3rem 0;
			border: 1px solid rgb(8, 154, 255);
			font-size: .28rem;
		}
		&-cell {
			margin-top: .4rem;
			border: 1px solid #ececec;
			padding: 0 .2rem;
			border-radius: 4px;
		}
		&-oldUser {
			padding: 1rem 0;
			text-align: center;
			&-h1 {
				color: rgb(16, 16, 16);
				font-weight: 400;
				font-size: .4rem;
			}
			&-p1 {
				color: rgb(153, 153, 153);
				margin-top: .6rem;
				font-weight: 400;
			}
		}
	}
</style>
<style>
	.yd-cell {
		background-color: transparent;
	}
</style>