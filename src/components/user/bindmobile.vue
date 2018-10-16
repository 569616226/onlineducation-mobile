<template>
	<div v-title data-title="绑定手机" class="bind_mobile" v-loading="loading">
		<div class="BindMobile">
			<p class="BindMobile-p1">新用户手机绑定</p>
			<p class="BindMobile-p2">绑定后才可以加入课程和购买课程或会员服务</p>
		</div>
		<yd-cell-group>
			<yd-cell-item>
				<input type="text" slot="right" placeholder="请输入手机号码" v-model="mobile" maxlength="11">

				<!-- ↓↓关键代码是这里↓↓ -->
				<yd-sendcode slot="right" v-model="start1" @click.native="sendCode1" init-str="获取验证码" reset-str="重新获取" type="warning"></yd-sendcode>
				<!-- ↑↑关键代码是这里↑↑ -->

			</yd-cell-item>
		</yd-cell-group>
		<yd-cell-item>
			<yd-input slot="right" v-model="code" placeholder="请输入验证码"></yd-input>
		</yd-cell-item>
		<yd-button size="large" bgcolor="#42b0ff" color="#ffffff" @click.native="sumbit">提交</yd-button>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		data() {
			return {
				start1: false,
				code: '',
				mobile: '',
				loading: false
			}
		},
		computed: {
			...mapState({
				GuestProfileData: state => state.classes.GuestProfileData,
				VipPay: state => state.classes.VipPay
			}),
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
			sendCode1() {
				let phone = this.mobile
				if(!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(phone))) {
					this.$dialog.toast({
						mes: '手机格式错误',
						icon: 'error',
						timeout: 1500
					});
					this.mobile = ''
				} else {
					this.$dialog.loading.open('发送中...');
					// setTimeout(() => {
					axios.post('/item/guest/send_sms', {
							'phone': this.mobile
						})
						.then((res) => {
							if(res.data.status) {
								this.start1 = true;
								this.$dialog.loading.close();
								this.$dialog.toast({
									mes: res.data.message,
									icon: 'success',
									timeout: 1500
								});
							} else {
								this.$dialog.loading.close();
								this.$dialog.toast({
									mes: res.data.message,
									icon: 'error',
									timeout: 1500
								});
							}

						})
						.catch((error) => {
							this.$dialog.toast({
								mes: res.data.message,
								icon: 'error',
								timeout: 1500
							});
						})

					// }, 1000);
				}
			},
			sumbit() {
				if(this.mobile == '' || !(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.mobile))) {
					this.$dialog.toast({
						mes: '手机格式错误',
						icon: 'error',
						timeout: 1500
					});
				} else if(this.code == '') {
					this.$dialog.toast({
						mes: '请填写验证码',
						icon: 'error',
						timeout: 1500
					});
				} else {
					// 提交绑定
					let id = this.GuestProfileData.guest.id;
					axios.post('/item/guest/' + id + '/check_tel', {
							phone: this.mobile,
							sms_code: this.code
						})
						.then((res) => {
							if(res.data.status) {
								this.$dialog.toast({
									mes: res.data.message,
									timeout: 1500,
									icon: 'success'
								})
								this.getData()
								if(this.VipPay.BindMobile) {
									this.VipPay.BindMobile = false
								} else {
									this.$router.push({
										name: 'user'
									})
								}
							} else {
								this.$dialog.toast({
									mes: res.data.message,
									timeout: 1500,
									icon: 'error'
								})
							}
						})
						.catch((error) => {
							console.log(error)
						})
				}
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>
<style lang="less" scoped>
	.BindMobile {
		&-p1 {
			font-weight: 700;
			font-size: 22px;
			color: rgb(16, 16, 16);
			margin-top: .4rem;
		}
		&-p2 {
			font-size: 12px;
			color: rgba(153, 153, 153, 1);
			padding: .3rem 0 .7rem 0;
		}
	}
	
	.bind_mobile {
		padding: .4rem .2rem;
	}
	
	.yd-cell-item {
		border-bottom: 1px solid rgb(236, 236, 236);
	}
	
	.yd-btn-warning {
		background: none;
		color: rgba(18, 156, 255, 1);
	}
	
	.yd-btn-warning:not(.yd-btn-loading) {
		background-color: transparent;
	}
	
	.yd-btn-warning:not(.yd-btn-loading):active {
		background-color: transparent;
	}
</style>
<style>
	.yd-cell {
		background-color: transparent;
	}
	
	.yd-cell-item:not(:last-child):after {
		border-bottom: none;
	}
	
	.yd-cell:after {
		border-bottom: none;
	}
</style>