<template>
	<div v-title data-title="报名信息" v-loading="loading">
		<div class="FillInfo" v-if="FillInfo.index">
			<yd-cell-group>
				<yd-cell-item>
					<yd-input slot="right" ref="phone" v-model="data.phone" placeholder="请输入11位手机号" class="FillInfo-input" :on-blur="getSign"></yd-input>
				</yd-cell-item>

				<yd-cell-item>
					<yd-input slot="right" ref="name" v-model="data.name" placeholder="请输入您的姓名" class="FillInfo-input"></yd-input>
				</yd-cell-item>

				<yd-cell-item>
					<yd-input slot="right" ref="company" v-model="data.company" placeholder="请输入您的公司名称" class="FillInfo-input"></yd-input>
				</yd-cell-item>

				<yd-cell-item>
					<yd-input slot="right" ref="offer" v-model="data.offer" placeholder="请输入您的职位" class="FillInfo-input"></yd-input>
				</yd-cell-item>

				<yd-cell-item>
					<yd-input slot="right" ref="referee" v-model="data.referee" placeholder="请输入推荐人姓名" class="FillInfo-input"></yd-input>
				</yd-cell-item>
			</yd-cell-group>
			<div class="FillInfo-button" @click="FromInfo">
				<p>提交</p>
			</div>
		</div>
		<success v-if="FillInfo.success"></success>
	</div>
</template>

<script>
	import api from '@/utils/api'
	import { mapState, mapActions } from 'vuex'
	import Success from './FillInfo/Success'
	export default {
		components: {
			Success
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
				loading: false
			}
		},
		methods: {
			...mapActions([
				'getGuestProfile'
			]),
			async getData() {
				if(this.GuestProfileData.length == 0) {
					this.loading = true
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
				this.loading = false
			},
			async FromInfo() {
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
				const data = await api.postTrainSign(this.$route.params.id, this.data)
				this.loading = false
				if(data.status) {
					this.FillInfo.index = false
					this.FillInfo.success = true
				}else{
					this.$message.error(data.message)
				}
			},
			async getSign() {
				this.loading = true
				const data = await api.postTrainGetSign(this.data.phone)
				this.loading = false
			}
		},
		computed: {
			...mapState({
				FillInfo: state => state.classes.FillInfo,
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
		height: 100vh;
		background: #ffffff;
		padding: 1rem .4rem 0 .4rem;
		&-input {
			border-bottom: 1px solid rgb(236, 236, 236);
		}
		&-button {
			margin-top: .6rem;
			text-align: center;
			background-color: rgb(66, 176, 255);
			color: rgb(255, 255, 255);
			border-radius: 4px;
			padding: .3rem 0;
			opacity: 0.6;
			border: 1px solid rgb(66, 176, 255);
			font-size: .28rem;
		}
	}
</style>