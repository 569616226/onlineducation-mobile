<template>
	<div>
		<div class="Contact">
			<div class="wx-actDetail-map" id="actmap1">
				<div class="mocked" @click="navigate"></div>
			</div>
			<div class="Contact-content">
				<p class="Contact-content-name">广东东华供应链科技有限公司</p>
				<p class="Contact-content-title">Guangdong Donghua Supply Chain Techology Co.LTO</p>
				<div class="Contact-content-pan">
					<yd-icon name="icon-ic_place" custom size="16px" color="rgb(71, 157, 255)"></yd-icon>
					<span>公司地址</span>
				</div>
				<p class="Contact-content-add" @click="navigate">广东省东莞市松山湖中科创新广场B栋2楼</p>
				<el-row>
					<el-col :span="12">
						<div class="Contact-content-pan">
							<yd-icon name="icon-ic_headset_mic" custom size="16px" color="rgb(71, 157, 255)"></yd-icon>
							<span>咨询热线</span>
						</div>
						<p class="Contact-content-add">0769-22898086</p>
					</el-col>
					<el-col :span="12">
						<div class="Contact-content-pan">
							<yd-icon name="icon-ic_headset_mic" custom size="16px" color="rgb(71, 157, 255)"></yd-icon>
							<span>咨询热线</span>
						</div>
						<p class="Contact-content-add">13926560618</p>
					</el-col>
				</el-row>
				<div class="Contact-content-pan">
					<yd-icon name="icon-0023" custom size="16px" color="rgb(71, 157, 255)"></yd-icon>
					<span>关注我们</span>
				</div>
				<el-row :gutter="20" class="Contact-content-row">
					<el-col :span="12" class="Contact-content-row-col">
						<img src="../../../assets/About/Contact1.jpeg" class="Contact-content-row-col-img" />
						<p class="Contact-content-row-col-p">东华商学公众号</p>
					</el-col>
					<el-col :span="12" class="Contact-content-row-col">
						<img src="../../../assets/About/Contact2.png" class="Contact-content-row-col-img" />
						<p class="Contact-content-row-col-p">东华供应链公众号</p>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import wx from 'weixin-js-sdk'
	export default {
		data() {
			return {

			}
		},
		components: {

		},
		computed: {

		},
		methods: {
			// 基础配置
			wx_config() {
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
							jsApiList: ['openLocation']
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
		},
		mounted() {
			this.wx_config()
			const activity = {
				loaction: '22.9585060000,113.8874330000'
			}
			const ArrayCity = activity.loaction.split(",");
			const center = new qq.maps.LatLng(ArrayCity[0], ArrayCity[1]);
			const map = new qq.maps.Map(document.getElementById('actmap1'), {
				center: center,
				zoomControl: false,
				mapTypeControl: false,
				draggable: true,
				scrollwheel: true,
				disableDoubleClickZoom: true,
				zoom: 16
			});
		}
	}
</script>
<style lang="less" scoped>
	.Contact {
		padding-bottom: 1.4rem;
		&-content {
			margin-top: .6rem;
			&-name {
				font-weight: 700;
				font-size: 18px;
				color: #101010;
			}
			&-title {
				font-weight: 400;
				font-size: 11px;
				color: rgba(176, 176, 176, 1);
				margin-top: .2rem;
			}
			&-pan {
				margin-top: .4rem;
				& span {
					font-weight: 700;
					font-size: 15px;
					color: rgba(102, 102, 102, 1);
				}
			}
			&-add {
				color: rgb(136, 136, 136);
				margin-top: .2rem;
				margin-left: .4rem;
			}
			&-row {
				margin-top: .3rem;
				text-align: center;
				&-col {
					&-img {
						width: 100%;
					}
					&-p {
						color: rgba(136, 136, 136, 1);
					}
				}
			}
		}
	}
	
	.wx-actDetail-map {
		position: relative;
		height: 5.34667rem;
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