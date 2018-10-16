<template>
	<div v-title data-title="我的VIP会员" v-if="GuestProfileData.guest">
		<div style="background: #FFFFFF;">
			<div class="my_vip">
				<div class="my_vip_content">
					<div class="my_vip_img">
						<img :src="GuestProfileData.guest.picture" />
					</div>
					<p class="my_vip_name">
						{{ GuestProfileData.guest.nickname }}
					</p>

					<img src="../../assets/myvip.png" class="my_vip-vip" />

					<div v-if="vipMarking == '1'">
						<p class="my_vip_time">
							开通VIP会员更多专属视频在等你！
						</p>
						<router-link to="vippay" class="my_vip_button">
							立即开通
						</router-link>
					</div>

					<div v-if="vipMarking == '2'">
						<p class="my_vip_time">
							开通VIP会员更多专属视频在等你！
						</p>
						<router-link to="vippay" class="my_vip_button">
							立即续费
						</router-link>
					</div>

					<div v-if="vipMarking == '3'">
						<p class="my_vip_time">
							你的会员将于 {{ GuestProfileData.guest.vip_end_date }} 到期
						</p>
						<router-link to="vippay" class="my_vip_button">
							立即续费
						</router-link>
					</div>

				</div>
			</div>
			<div class="vip_freedom">
				<p class="vip_freedom_p">专享权益</p>
				<el-row class="vip_freedom-row">
					<el-col :span="6" class="vip_freedom-row-left">
						<yd-icon class="vip_icon" name="icon-filmstrip" custom size="0.54rem"></yd-icon>
					</el-col>
					<el-col :span="18" class="vip_freedom-row-right">
						<p class="vip_freedom-row-right-p1">免费观看<b>VIP</b>视频教程</p>
						<p class="vip_freedom-row-right-p2">免费观看vip栏目的全部教学，数万用户的首选</p>
					</el-col>
				</el-row>
				<!--<el-row class="vip_freedom-row">
					<el-col :span="6" class="vip_freedom-row-left">
						<yd-icon class="vip_icon" name="icon-ic_school" custom size="0.54rem"></yd-icon>
					</el-col>
					<el-col :span="18" class="vip_freedom-row-right">
						<p class="vip_freedom-row-right-p1">享半价购买精品课程的资格</p>
						<p class="vip_freedom-row-right-p2">vip会员可半价购买精品课程，领域资深导师助力您的成长</p>
					</el-col>
				</el-row>-->
				<el-row class="vip_freedom-row">
					<el-col :span="6" class="vip_freedom-row-left">
						<yd-icon class="vip_icon" name="icon-thumb-up" custom size="0.54rem"></yd-icon>
					</el-col>
					<el-col :span="18" class="vip_freedom-row-right">
						<p class="vip_freedom-row-right-p1">抢先看到最新教学视频</p>
						<p class="vip_freedom-row-right-p2">最新教学抢先看，实时助你了解政策动向，掌握最新知识</p>
					</el-col>
				</el-row>
				<!--<el-row class="vip_freedom-row">
					<el-col :span="6" class="vip_freedom-row-left">
						<yd-icon class="vip_icon" name="icon-ic_local_activity" custom size="0.54rem"></yd-icon>
					</el-col>
					<el-col :span="18" class="vip_freedom-row-right">
						<p class="vip_freedom-row-right-p1">赠送5张免费观看精品课程门票</p>
						<p class="vip_freedom-row-right-p2">首次开通vip会员即可获得5张精品课程门票</p>
					</el-col>
				</el-row>-->
				<el-row class="vip_freedom-row">
					<el-col :span="6" class="vip_freedom-row-left">
						<yd-icon class="vip_icon" name="icon-vimeo" custom size="0.54rem"></yd-icon>
					</el-col>
					<el-col :span="18" class="vip_freedom-row-right">
						<p class="vip_freedom-row-right-p1">拥有专属会员标识</p>
						<p class="vip_freedom-row-right-p2">vip会员专属标识，彰显您尊贵的身份</p>
					</el-col>
				</el-row>
				<el-row class="vip_freedom-row">
					<el-col :span="6" class="vip_freedom-row-left">
						<yd-icon class="vip_icon" name="icon-ic_settings_remote" custom size="0.54rem"></yd-icon>
					</el-col>
					<el-col :span="18" class="vip_freedom-row-right">
						<p class="vip_freedom-row-right-p1">高速通道更流畅</p>
						<p class="vip_freedom-row-right-p2">专享快速通道观看视频，缓存无障碍，给您更流畅的观看体验</p>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapState({
				GuestProfileData: state => state.classes.GuestProfileData
			}),
			// 判断显示的标记     1---代表没有开通过vip    2---开通过vip，但是已经过期了    3---开通了vip还未过期 
			vipMarking() {
				if(this.GuestProfileData.guest.vip_name) {
					let myDate = new Date();
					let vipDate = new Date(this.GuestProfileData.guest.vip_end_date);
					if(myDate.getTime() > vipDate.getTime()) {
						return '2'
					} else {
						return '3';
					}
				} else {
					return '1'
				}
			}
		},
		methods: {
			...mapActions([
				'getGuestProfile'
			]),
			async getData() {
				if(this.GuestProfileData.length == 0) {
					this.loading = true
				}
				await this.getGuestProfile()
				this.loading = false
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>
<style lang="less" scoped>
	.my_vip {
		background: #fff;
		position: relative;
		padding-bottom: .4rem;
		overflow: hidden;
		&-vip {
			width: 84px;
			position: absolute;
			top: 0px;
			right: 0px;
		}
	}
	
	.my_vip_top {
		height: 55px;
		background: #2c2d33;
	}
	
	.my_vip_ban {
		height: 153px;
		background-color: #2c2d33;
		border-radius: 100%;
		width: 110%;
		position: absolute;
		top: -10px;
		left: -5%;
	}
	
	.my_vip_content {
		margin: 0 auto;
		width: 88%;
		position: relative;
		background: url(../../assets/vipbg.png) no-repeat;
		padding-bottom: .4rem;
		background-size: 100%;
		border-radius: 5px;
		margin-top: 1rem;
	}
	
	.my_vip_img {
		position: absolute;
		width: 76px;
		height: 76px;
		top: -40px;
		left: calc(50% - 38px);
	}
	
	.my_vip_img img {
		width: 77px;
		border-radius: 50%;
		border: 2px solid rgb(255, 255, 255);
	}
	
	.my_vip_name {
		font-size: 14.0px;
		color: #ffffff;
		padding-top: 1rem;
		text-align: center;
	}
	
	.my_vip_time {
		color: #ffffff;
		padding-top: .4rem;
		text-align: center;
	}
	
	.my_vip_button {
		color: #ffffff;
		width: 2rem;
		display: block;
		text-align: center;
		margin: 0 auto;
		margin-top: .4rem;
		padding: .15rem 0;
		border-radius: 100px;
		border: 1px solid #ffffff;
		font-size: 13.0px;
	}
	
	.vip_freedom {
		background: #ffffff;
		margin-top: .2rem;
		padding: .3rem .2rem .5rem .2rem;
		&-row {
			margin-top: .6rem;
			&-left {
				text-align: center;
			}
			&-right {
				&-p1 {
					font-size: .28rem;
					margin-top: .06rem;
				}
				&-p2 {
					color: rgb(176, 176, 176);
					margin-top: .1rem;
				}
			}
		}
	}
	
	.vip_freedom_p {
		font-size: 15.0px;
		color: #101010;
		margin-bottom: .35rem;
		margin-left: .4rem;
	}
	
	.vip_item_center {
		text-align: center;
	}
	
	.vip_icon {
		font-size: 0.54rem;
		display: block;
		color: #e6c087;
		width: 48px;
		height: 48px;
		margin: 0 auto;
		border-radius: 50%;
		background: #fff2e3;
	}
	
	.vip_icon:before {
		vertical-align: -webkit-baseline-middle;
	}
	
	.vip_item_center span {
		display: block;
		margin-top: .2rem;
	}
</style>