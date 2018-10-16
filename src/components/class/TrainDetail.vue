<template>
	<div v-title data-title="预告详情" v-loading="loading">
		<div>
			<div class="class_top_class">
				<img :src="data.pic" style="width: 100%;" />
			</div>
			<div class="class_top_content">
				<div class="class_top_content_left">
					<p class="class_top_content_left_p">{{data.name}}</p>
					<p class="class_top_content_left_p2">{{data.title}}</p>
				</div>
				<div class="class_top_content_right">
					<yd-icon @click.native="collect" ref="collect" :name="countar" custom size="0.54rem" color="#ffd338"></yd-icon>
				</div>
				<div class="clear"></div>
			</div>
			<div class="TrainDetail">
				<el-row class="TrainDetail-row">
					<el-col :span="2" class="TrainDetail-row-left">
						<yd-icon name="icon-ic_watch_later" custom size="0.36rem" color="rgb(210, 210, 210)"></yd-icon>
					</el-col>
					<el-col :span="22" class="TrainDetail-row-right">
						<p class="TrainDetail-row-right-p">{{data.start_at}}<span>至</span>{{data.end_at}}</p>
					</el-col>
				</el-row>
				<el-row class="TrainDetail-row" @click.native="navigate">
					<el-col :span="2" class="TrainDetail-row-left">
						<yd-icon name="icon-ic_pin_drop" custom size="0.36rem" color="rgb(210, 210, 210)"></yd-icon>
					</el-col>
					<el-col :span="20" class="TrainDetail-row-right">
						<p class="TrainDetail-row-right-p">{{data.address}}（点击导航）</p>
					</el-col>
					<el-col :span="2" class="TrainDetail-row-left">
						<yd-icon name="icon-ic_keyboard_arrow_right" custom size="0.66rem" color="rgb(210, 210, 210)"></yd-icon>
					</el-col>
				</el-row>
				<div class="wx-actDetail-map" id="actmap">
					<span class="label">点击导航</span>
					<div class="mocked" @click="navigate"></div>
				</div>
				<div class="TrainDetail-Detail">
					<p class="TrainDetail-Detail-title">活动详情</p>
					<div v-html="data.discrible"></div>
				</div>
			</div>
			<div class="TrainDetail-bottom">
				<p>本次活动最终解释权为东华供应链</p>
				<p>如有疑问，请联系我们：0769-22898086</p>
			</div>
			<div class="TrainDetail-button-end" v-if="data.status == '已结束'">
				<p>活动已结束</p>
			</div>
			<div class="TrainDetail-button" @click="fill" v-else>
				<p>我要报名</p>
			</div>
			
		</div>
	</div>
</template>

<script>
	import api from '@/utils/api'
	import wx from 'weixin-js-sdk'
	import { mapState, mapActions } from 'vuex'
	export default {
		components: {

		},
		created() {
			this.getData()
		},
		data() {
			return {
				data: [],
				countar: 'icon-star-outline',
				loading: false
			}
		},
		methods: {
			// 基础配置
			wx_config() {
				let that = this;
				axios.post('/item/get_wechat_config', {
					'url': window.location.href.split('#')[0]
				}).then((res) => {
					if(res.data.status) {
						wx.config({
							debug: false,
							appId: res.data.config.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
							timestamp: res.data.config.timestamp, // 必填，生成签名的时间戳
							nonceStr: res.data.config.nonceStr, // 必填，生成签名的随机串
							signature: res.data.config.paySign, // 必填，签名，见附录1
							jsApiList: ['openLocation', 'chooseWXPay', 'onMenuShareAppMessage']
						});
						wx.ready(function() {
							// 分享给朋友
							wx.onMenuShareAppMessage({
								title: that.data.name, // 分享标题
								desc: that.data.title, // 分享描述
								link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								imgUrl: that.data.pic, // 分享图标    现在还没有图标，先注释掉
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
								title: that.data.name, // 分享标题
								link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								imgUrl: that.data.pic, // 分享图标
								success: function() {
									// 用户确认分享后执行的回调函数
								},
								cancel: function() {
									// 用户取消分享后执行的回调函数
								}
							});
						});
					} else {
						alert(res.data.message);
					}
				}).catch((error) => {
					console.log(error);
				});
			},
			navigate() {
				wx.ready(function() {
					wx.openLocation({
						latitude: 22.9585060000,
						longitude: 113.8874330000,
						name: '东华供应链',
						address: '广东省东莞市松山湖中科创新广场B座2楼东华供应链',
						scale: 26,
						infoUrl: ''
					})
				})
			},
			async getData() {
				this.loading = true
				const data = await api.getTrainDetail(this.$route.params.id)
				this.data = data.train
				if(this.data.is_collect) {
					this.countar = "icon-star"
				} else {
					this.countar = "icon-star-outline"
				}
				this.loading = false
				this.wx_config()
			},
			async collect() {
				if(this.countar == "icon-star-outline") {
					const data = await api.getTrainCollect(this.$route.params.id)
					this.countar = "icon-star"
					this.$dialog.toast({
						mes: data.message,
						timeout: 500
					})
				} else {
					const data = await api.getTrainUncollect(this.$route.params.id)
					this.countar = "icon-star-outline"
					this.$dialog.toast({
						mes: data.message,
						timeout: 500
					})
				}
			},
			fill() {
				this.FillInfo.index = true
				this.FillInfo.success = false
				const id = this.$route.params.id
				this.$router.push({
					name: 'FillInfo',
					params: {
						id: id
					}
				})
			}
		},
		computed: {
			...mapState({
				FillInfo: state => state.classes.FillInfo
			}),
		},
		mounted() {
			const activity = {
				loaction: '22.9585060000,113.8874330000'
			}
			const ArrayCity = activity.loaction.split(",");
			const center = new qq.maps.LatLng(ArrayCity[0], ArrayCity[1]);
			const map = new qq.maps.Map(document.getElementById('actmap'), {
				center: center,
				zoomControl: false,
				mapTypeControl: false,
				draggable: false,
				scrollwheel: false,
				disableDoubleClickZoom: true,
				zoom: 16
			});
			const anchor = new qq.maps.Point(9, 26),
				size = new qq.maps.Size(20, 28),
				origin = new qq.maps.Point(0, 0),
				icon = new qq.maps.MarkerImage('https://3gimg.qq.com/lightmap/components/locationPicker2/image/marker.png', size, origin, anchor, size);
			const marker = new qq.maps.Marker({
				icon: icon,
				map: map,
				animation: qq.maps.MarkerAnimation.BOUNCE,
				position: map.getCenter()
			});
		},
		watch: {

		}
	}
</script>

<style lang="less" scoped>
	.TrainDetail {
		margin-top: .4rem;
		background: #ffffff;
		border-top: 1px solid rgb(236, 236, 236);
		&-row {
			padding: .4rem;
			border-bottom: 1px solid rgb(236, 236, 236);
			&-right {
				&-p {
					font-size: .28rem;
					& span {
						display: inline-block;
						margin: 0 .1rem;
					}
				}
			}
		}
		&-Detail {
			padding: .4rem;
			&-title {
				margin-bottom: .3rem;
				color: rgb(122, 134, 142);
				font-size: .3rem;
			}
		}
		&-bottom {
			padding: .3rem 0 1.7rem 0;
			text-align: center;
			font-size: .24rem;
			color: rgb(176, 176, 176);
			line-height: .5rem;
		}
		&-button p {
			padding: .3rem;
			font-size: .28rem;
			color: #ffffff;
			background: rgb(18, 156, 255);
			position: fixed;
			bottom: 0;
			width: 100%;
			text-align: center;
		}
		&-button-end p{
			padding: .3rem;
			font-size: .28rem;
			color: #ffffff;
			background: rgb(151, 160, 166);
			position: fixed;
			bottom: 0;
			width: 100%;
			text-align: center;
		}
	}
	
	.clear {
		clear: both;
	}
	
	.class_top_class {
		position: relative;
		display: grid;
	}
	
	.class_top_content {
		width: 100%;
		background-color: #fff;
		padding: 0 .3rem;
		padding-bottom: .3rem;
		border-bottom: 1px solid rgba(227, 227, 227, 1);
	}
	
	.class_top_content_left {
		float: left;
		width: 80%;
	}
	
	.class_top_content_left_p {
		font-size: 18.0px;
		color: #333333;
		font-weight: bold;
		margin-top: .3rem;
		word-wrap: normal;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		text-align: justify;
	}
	
	.class_top_content_right {
		float: right;
		margin-top: .4rem;
	}
	
	.class_top_content_left_p2 {
		color: rgb(176, 176, 176);
		margin-top: .1rem;
	}
	
	.wx-actDetail-map {
		position: relative;
		height: 2.34667rem;
	}
	
	.wx-actDetail-map div[draggable="false"] {
		visibility: hidden;
	}
	
	.wx-actDetail-map div[onpositionupdate="return;"] {
		visibility: hidden;
	}
	
	.wx-actDetail-map>iframe {
		width: 100%;
		height: 3.73333rem;
		padding: 0;
		margin: 0;
		line-height: 0;
		border: 0;
	}
	
	.wx-actDetail-map>.label {
		position: absolute;
		right: 0;
		bottom: 0;
		padding: 0.06667rem 0.29333rem;
		font-weight: 500;
		color: #fff;
		background-color: rgb(255, 161, 22);
		z-index: 98;
	}
	
	.wx-actDetail-map>.mocked {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: transparent;
		z-index: 99;
	}
</style>
<style>
	.TrainDetail-Detail img {
		max-width: 100%;
	}
</style>