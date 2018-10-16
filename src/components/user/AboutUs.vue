<template>
	<div v-title data-title="关于我们">
		<div class="AboutUs">
			<div :class="ClassBg">
				<div class="AboutUs-top-h1">
					<img src="../../assets/DH_logo.png" />
					<p>东华供应链商学院</p>
				</div>
				<div class="AboutUs-top-flex">
					<div v-for="item,index in nav" :key="index" :class="item.id == is_active ? 'AboutUs-top-flex-us active_us' : 'AboutUs-top-flex-us'" @click="CheckActive(item.id)">
						<span>{{item.name}}</span>
					</div>
				</div>
			</div>
			<div class="AboutUs-content">
				<school v-if="is_active == 1"></school>
				<panel v-if="is_active == 2"></panel>
				<product v-if="is_active == 3"></product>
				<contact v-if="is_active == 4"></contact>
			</div>
		</div>
	</div>
</template>

<script>
	import School from './AboutUs/School'
	import Panel from './AboutUs/Panel'
	import Product from './AboutUs/Product'
	import Contact from './AboutUs/Contact'
	export default {
		data() {
			return {
				nav: [{
					id: 1,
					name: '学院介绍'
				}, {
					id: 2,
					name: '专家团介绍'
				}, {
					id: 3,
					name: '产品介绍'
				}, {
					id: 4,
					name: '联系我们'
				}],
				is_active: 1
			}
		},
		components: {
			School,
			Panel,
			Product,
			Contact
		},
		computed: {
			ClassBg() {
				if(this.is_active == 1){
					const class_bg = 'AboutUs-top AboutUs-bg1'
					return class_bg
				}
				if(this.is_active == 2){
					const class_bg = 'AboutUs-top AboutUs-bg2'
					return class_bg
				}
				if(this.is_active == 3){
					const class_bg = 'AboutUs-top AboutUs-bg3'
					return class_bg
				}
				if(this.is_active == 4){
					const class_bg = 'AboutUs-top AboutUs-bg4'
					return class_bg
				}
			}
		},
		methods: {
			CheckActive(id) {
				this.is_active = id
			}
		},
		mounted() {
			this.is_active = this.$route.params.id
		}
	}
</script>
<style lang="less" scoped>
	.AboutUs {
		background: #fff;
		&-top {
			height: 3.5rem;
			position: relative;
			&-h1 {
				position: absolute;
				top: 30%;
				color: #ffffff;
				width: 100%;
				text-align: center;
				& img {
					width: 22px;
					vertical-align: bottom;
					margin-right: .1rem;
				}
				& p {
					display: inline-block;
					font-size: .4rem;
					font-weight: bold;
				}
			}
			&-flex {
				position: absolute;
				bottom: -.5rem;
				width: 90%;
				margin: 0 5%;
				display: flex;
				z-index: 9999;
				border-radius: 5px;
				background: #ffffff;
				box-shadow: rgba(170, 170, 170, 0.2) 0px 2px 10px 0px;
				&-us {
					flex: 1;
					text-align: center;
					padding: .3rem 0;
					color: rgb(153, 153, 153);
					position: relative;
					&:after {
						content: '';
						position: absolute;
						right: 0px;
						height: 25%;
						width: 1px;
						background: rgb(221, 221, 221);
						top: 40%;
						z-index: -1;
					}
					&:last-child:after{
						display: none;
					}
				}
			}
		}
		&-content {
			margin-top: 1.3rem;
			padding: 0 .45rem;
		}
		&-bg1 {
			background: url(../../assets/About/AboutBG1.png);
			background-size: cover;
		}
		&-bg2 {
			background: url(../../assets/About/AboutBG2.png);
			background-size: cover;
		}
		&-bg3 {
			background: url(../../assets/About/AboutBG3.png);
			background-size: cover;
		}
		&-bg4 {
			background: url(../../assets/About/AboutBG4.png);
			background-size: cover;
		}
	}
	
	.active_us {
		background-color: rgb(18, 156, 255);
		border-radius: 4px;
		color: #ffffff;
		font-weight: bold;
	}
</style>