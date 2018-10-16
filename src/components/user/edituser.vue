<template>
	<div v-title data-title="个人资料" v-loading="loading">
		<div class="user_myvip_more">
			<div class="user_ko">
				<div class="left">
					<p class="line_height64">
						头像
					</p>
				</div>
				<div class="right">
					<div class="time">
						<img :src="data.picture" />
					</div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="user_ko">
				<div class="left">
					<p>
						昵称
					</p>
				</div>
				<div class="right">
					<div class="time">
						{{ data.nickname }}
					</div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
		<div class="EditUser">
			<span>完善个人信息</span>
		</div>
		<div class="user_myvip_more">
			<div class="user_ko">
				<div class="left">
					<p>
						姓名
					</p>
				</div>
				<div class="right" @click="ShowUser(data.name, '姓名')">
					<div v-if="data.name" class="time">
						{{ data.name }}
						<yd-icon class="EditUser-right" name="icon-ic_keyboard_arrow_right" custom size="0.54rem" color="#CCCCCC"></yd-icon>
					</div>
					<div v-else="data.name">
						<div class="time">
							请完善
							<yd-icon class="EditUser-right" name="icon-ic_keyboard_arrow_right" custom size="0.54rem" color="#CCCCCC"></yd-icon>
						</div>
					</div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="user_ko">
				<div class="left">
					<p>
						手机
					</p>
				</div>
				<div class="right">
					<div v-if="data.phone" class="time">
						{{ data.phone }}
						<yd-icon class="EditUser-right" name="icon-ic_keyboard_arrow_right" custom size="0.54rem" color="#CCCCCC"></yd-icon>
					</div>
					<div v-else="data.phone">
						<router-link to="bindmobile">
							<div class="time red">
								未绑定
								<yd-icon class="EditUser-right" name="icon-ic_keyboard_arrow_right" custom size="0.54rem" color="#CCCCCC"></yd-icon>
							</div>
						</router-link>
					</div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="user_ko">
				<div class="left">
					<p>
						公司
					</p>
				</div>
				<div class="right" @click="ShowUser(data.company, '公司')">
					<div v-if="data.company" class="time">
						{{ data.company }}
						<yd-icon class="EditUser-right" name="icon-ic_keyboard_arrow_right" custom size="0.54rem" color="#CCCCCC"></yd-icon>
					</div>
					<div v-else="data.company">
						<div class="time">
							请完善
							<yd-icon class="EditUser-right" name="icon-ic_keyboard_arrow_right" custom size="0.54rem" color="#CCCCCC"></yd-icon>
						</div>
					</div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="user_ko">
				<div class="left">
					<p>
						职位
					</p>
				</div>
				<div class="right" @click="ShowUser(data.offer, '职位')">
					<div v-if="data.offer" class="time">
						{{ data.offer }}
						<yd-icon class="EditUser-right" name="icon-ic_keyboard_arrow_right" custom size="0.54rem" color="#CCCCCC"></yd-icon>
					</div>
					<div v-else="data.offer">
						<div class="time">
							请完善
							<yd-icon class="EditUser-right" name="icon-ic_keyboard_arrow_right" custom size="0.54rem" color="#CCCCCC"></yd-icon>
						</div>
					</div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="user_ko">
				<div class="left">
					<p>
						推荐人
					</p>
				</div>
				<div class="right" @click="ShowUser(data.referee, '推荐人')">
					<div v-if="data.referee" class="time">
						{{ data.referee }}
						<yd-icon class="EditUser-right" name="icon-ic_keyboard_arrow_right" custom size="0.54rem" color="#CCCCCC"></yd-icon>
					</div>
					<div v-else="data.referee">
						<div class="time">
							请完善
							<yd-icon class="EditUser-right" name="icon-ic_keyboard_arrow_right" custom size="0.54rem" color="#CCCCCC"></yd-icon>
						</div>
					</div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
		<el-dialog :title="title" :visible.sync="centerDialogVisible" width="90%" center v-loading="loading">
			<el-input v-model="input" :placeholder="placeholder"></el-input>
			<span slot="footer" class="dialog-footer">
		    	<el-button @click="centerDialogVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="EditUser">确 定</el-button>
	    	</span>
		</el-dialog>
	</div>
</template>

<script>
	import api from '@/utils/api'
	import { mapState, mapActions } from 'vuex'
	export default {
		data() {
			return {
				data: {},
				centerDialogVisible: false,
				title: '',
				input: '',
				placeholder: '',
				loading: false
			}
		},
		computed: {
			...mapState({
				GuestProfileData: state => state.classes.GuestProfileData
			}),
		},
		methods: {
			...mapActions([
				'getGuestProfile'
			]),
			ShowUser(item, name) {
				this.title = name
				this.input = item
				if(name == '姓名') {
					this.placeholder = '请输入姓名,最多可输入6个字'
				}
				if(name == '公司') {
					this.placeholder = '请输入所属公司名称,字数不限'
				}
				if(name == '职位') {
					this.placeholder = '请输入您的职位名称,字数不限'
				}
				if(name == '推荐人') {
					this.placeholder = '请输入您的推荐人姓名(选填)'
				}
				this.centerDialogVisible = true
			},
			async EditUser() {
				this.loading = true
				const item = {}
				if(this.title == '姓名') {
					item.name = this.input
				}
				if(this.title == '公司') {
					item.company = this.input
				}
				if(this.title == '职位') {
					item.offer = this.input
				}
				if(this.title == '推荐人') {
					item.referee = this.input
				}
				const data = await api.postGuestUpdate(this.data.id, item)
				const UserData = await api.getGuestProfile()
				this.data = UserData.guest
				this.centerDialogVisible = false
				this.loading = false
			},
			async getData() {
				if(this.GuestProfileData.length == 0) {
					this.loading = true
					await this.getGuestProfile()
					this.data = this.GuestProfileData.guest
				} else {
					this.data = this.GuestProfileData.guest
				}
				this.loading = false
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>
<style lang="less" scoped>
	.EditUser {
		padding: .3rem .4rem;
		font-size: 16px;
		&-right {
			vertical-align: sub;
		}
	}
	
	.clear {
		clear: both;
	}
	
	.uservip {
		vertical-align: middle;
	}
	
	.user_myvip {
		padding: .2rem .4rem;
		background: #ffffff;
		margin-top: .2rem;
		border-top: 1px solid #e3e3e3;
		border-bottom: 1px solid #e3e3e3;
	}
	
	.left {
		float: left;
	}
	
	.left p,
	.time {
		font-size: 16.0px;
		line-height: 36px;
	}
	
	.line_height64 {
		line-height: 64px !important;
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
	
	.time img {
		width: 60px;
		border-radius: 30px;
	}
	
	.user_myvip_more {
		background: #ffffff;
		border-top: 1px solid #e3e3e3;
		border-bottom: 1px solid #e3e3e3;
	}
	
	.user_ko {
		margin-left: .4rem;
		padding: .2rem .4rem .2rem 0;
		border-bottom: 1px solid #e3e3e3;
	}
	
	.user_ko:last-child {
		border-bottom: none;
	}
</style>