<template>
	<div v-loading="loading">
		<div v-title data-title="个人中心" v-if="GuestProfileData.guest">
			<div :class="UserClass">
				<router-link to="edituser">
					<div class="userxin">
						<div class="userimg">
							<img :src="GuestProfileData.guest.picture" />
						</div>
						<div class="username">
							<p class="username_p1">{{ GuestProfileData.guest.nickname }}</p>
							<div v-if="GuestProfileData.guest.role == '运营商'">
								<div v-if="vipMarking =='1'">
									<p class="username_p3">
										<yd-icon name="icon-accountmultiple" color="#ffffff" custom size="0.24rem"></yd-icon>
										<span>运营商</span>
									</p>
								</div>
								<div v-if="vipMarking =='3'">
									<p class="username_p3">
										<yd-icon name="icon-accountmultiple" color="#ffffff" custom size="0.24rem"></yd-icon>
										<span>运营商/VIP会员</span>
									</p>
								</div>
							</div>
							<div v-if="GuestProfileData.guest.role == '普通游客'">
								<div v-if="vipMarking =='1'">
									<p class="username_p2">
										<yd-icon name="icon-accountbox" color="#ffffff" custom size="0.24rem"></yd-icon>
										<span>普通游客</span>
									</p>
								</div>
								<div v-if="vipMarking =='3'">
									<p class="username_p4">
										<yd-icon name="icon-vimeo" color="#ffffff" custom size="0.24rem"></yd-icon>
										<span>VIP会员</span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="user_right">
						<yd-icon name="icon-ic_keyboard_arrow_right" slot="icon" color="#ffffff" custom size="0.64rem"></yd-icon>
					</div>
					<div class="clear"></div>
				</router-link>
			</div>
			<div class="user_myvip">
				<div @click="ComeVip">
					<div class="left">
						<p>
							<yd-icon name="icon-vimeo" slot="icon" color="#f0bc59" custom size="17px" class="uservip_myicon"></yd-icon>我的VIP会员
						</p>
					</div>
					<div class="right">
						<div class="time">
							<span v-if="vipMarking =='1'">立即开通</span>
							<span v-if="vipMarking =='2'">立即续费</span>
							<span v-if="vipMarking =='3'">{{ GuestProfileData.guest.vip_end_date }} 到期</span>
							<yd-icon name="icon-ic_keyboard_arrow_right" slot="icon" color="#ccc" custom size="0.64rem" class="uservip"></yd-icon>
						</div>
					</div>
					<div class="clear"></div>
				</div>
			</div>
			<div class="user_myvip_more">
				<div class="user_ko">
					<router-link to="buyclass">
						<div class="left">
							<p>
								<yd-icon name="icon-ic_shopping_cart" slot="icon" color="#fc992c" custom size="17px" class="uservip_myicon"></yd-icon>购买记录
							</p>
						</div>
						<div class="right">
							<div class="time">
								<yd-icon name="icon-ic_keyboard_arrow_right" slot="icon" color="#ccc" custom size="0.64rem" class="uservip"></yd-icon>
							</div>
						</div>
						<div class="clear"></div>
					</router-link>
				</div>
				<div class="user_ko">
					<router-link to="collectclass">
						<div class="left">
							<p>
								<yd-icon name="icon-star" slot="icon" color="#ffd230" custom size="17px" class="uservip_myicon"></yd-icon>我的收藏
							</p>
						</div>
						<div class="right">
							<div class="time">
								<yd-icon name="icon-ic_keyboard_arrow_right" slot="icon" color="#ccc" custom size="0.64rem" class="uservip"></yd-icon>
							</div>
						</div>
						<div class="clear"></div>
					</router-link>
				</div>
				<div class="user_ko">
					<router-link to="/sysmessage">
						<div class="left">
							<p>
								<yd-icon name="icon-ic_mail" slot="icon" color="#008fe0" custom size="17px" class="uservip_myicon"></yd-icon>消息中心
							</p>
						</div>
						<div class="right">
							<div class="time">
								<yd-badge v-if="GuestProfileData.messages_count != 0" type="danger" class="white">{{ badgeted }}</yd-badge>
								<yd-icon name="icon-ic_keyboard_arrow_right" slot="icon" color="#ccc" custom size="0.64rem" class="uservip"></yd-icon>
							</div>
						</div>
						<div class="clear"></div>
					</router-link>
				</div>
			</div>
			<div class="user_myvip_more">
				<div class="user_ko">
					<router-link to="/AboutUs/1">
						<div class="left">
							<p>
								<yd-icon name="icon-favorite" slot="icon" color="rgb(255, 94, 99)" custom size="17px" class="uservip_myicon"></yd-icon>关于我们
							</p>
						</div>
						<div class="right">
							<div class="time">
								<yd-icon name="icon-ic_keyboard_arrow_right" slot="icon" color="#ccc" custom size="0.64rem" class="uservip"></yd-icon>
							</div>
						</div>
						<div class="clear"></div>
					</router-link>
				</div>
				<div class="user_ko">
					<router-link to="/writefeedback">
						<div class="left">
							<p>
								<yd-icon name="icon-comment-processing" slot="icon" color="#2BCF44" custom size="17px" class="uservip_myicon"></yd-icon>意见反馈
							</p>
						</div>
						<div class="right">
							<div class="time">
								<yd-icon name="icon-ic_keyboard_arrow_right" slot="icon" color="#ccc" custom size="0.64rem" class="uservip"></yd-icon>
							</div>
						</div>
						<div class="clear"></div>
					</router-link>
				</div>
			</div>
			<bottomnav :user="user"></bottomnav>
		</div>
	</div>
</template>

<script>
	import bottomnav from '../common/Bottom_nav.vue'
	import { mapState, mapActions } from 'vuex'
	export default {
		name: 'app',
		data() {
			return {
				user: true,
				loading: false
			}
		},
		components: {
			bottomnav
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
			},
			UserClass() {
				if(this.GuestProfileData.guest) {
					if(this.GuestProfileData.guest.role == '运营商') {
						return 'user user_bg2'
					}
					if(this.GuestProfileData.guest.role == '普通游客') {
						if(this.vipMarking == '1' || this.vipMarking == '2') {
							return 'user user_bg1'
						}
						if(this.vipMarking == '3') {
							return 'user user_bg3'
						}
					}
				}
			},
			badgeted() {
				if(this.GuestProfileData.messages_count > 99) {
					return '99+'
				} else {
					return this.GuestProfileData.messages_count
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
			},
			ComeVip() {
				if(this.vipMarking == '1') {
					this.$router.push({
						name: 'vippay'
					})
				} else {
					this.$router.push({
						name: 'myvip'
					})
				}
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>
<style scoped>
	.clear {
		clear: both;
	}
	
	.user {
		padding: .4rem .2rem .4rem .4rem;
	}
	
	.user_bg1 {
		background-image: url(../../assets/pu_user.png);
		background-size: 100%;
	}
	
	.user_bg2 {
		background-image: url(../../assets/yun_user.png);
		background-size: 100%;
	}
	
	.user_bg3 {
		background-image: url(../../assets/vip_user.png);
		background-size: 100%;
	}
	
	.userimg {
		float: left;
	}
	
	.userimg img {
		border-radius: 40px;
		width: 68px;
	}
	
	.username {
		float: left;
		color: #fff;
		margin-left: 20px;
		margin-top: 5px;
	}
	
	.white {
		color: #FFFFFF !important;
	}
	
	.username_p1 {
		font-size: 16.0px;
	}
	
	.username_p2 {
		margin-top: 5px;
		padding: 2px 8px;
		background: rgb(9, 150, 253);
		border-radius: 30px;
	}
	
	.username_p3 {
		margin-top: 5px;
		padding: 2px 8px;
		background: rgb(233, 86, 88);
		border-radius: 30px;
	}
	
	.username_p4 {
		margin-top: 5px;
		padding: 2px 8px;
		background: rgb(198, 160, 78);
		border-radius: 30px;
	}
	
	.user_right {
		float: right;
		margin-top: 20px;
	}
	
	.uservip {
		vertical-align: middle;
	}
	
	.user_myvip {
		padding: .1rem .2rem .1rem .4rem;
		background: #ffffff;
		margin-top: .2rem;
		border-top: 1px solid #e3e3e3;
		border-bottom: 1px solid #e3e3e3;
	}
	
	.left {
		float: left;
	}
	
	.left p {
		font-size: 16.0px;
		line-height: 36px;
	}
	
	.uservip_myicon {
		vertical-align: middle;
		margin-right: .2rem;
	}
	
	.right {
		float: right;
	}
	
	.time span {
		color: #e2c07d;
	}
	
	.user_myvip_more {
		background: #ffffff;
		margin-top: .2rem;
		border-top: 1px solid #e3e3e3;
		border-bottom: 1px solid #e3e3e3;
	}
	
	.user_ko {
		margin-left: .4rem;
		padding: .1rem .2rem .1rem 0;
		border-bottom: 1px solid #e3e3e3;
	}
	
	.user_ko:last-child {
		border-bottom: none;
	}
</style>