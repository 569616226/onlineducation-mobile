<template>
	<div v-title data-title="商学">
		<div>
			<bottomnav :index="index"></bottomnav>
			<indextop :advertdata="advertdata" :navdata="navdata"></indextop>
			<div class="index_background_gray"></div>
			<update :updata="updata" :navdata="navdata"></update>
			<div class="index_background_gray"></div>
			<div v-for="item,key in navdata" :key="key" class="nav_key">
				<yd-navbar>
					<router-link to="#" slot="left">
						<span class="update_nav">{{item.name}}栏目</span>
					</router-link>
					<div @click="more(item.id, item.type)" slot="right">
						<span class="checkmore">查看更多></span>
					</div>
				</yd-navbar>
				<div v-if="item.type == 1">
					<div class="UpdateList">
						<div class="UpdateList-list" v-for="bitem, bkey in item.trains" :key="bkey" @click="cometrains(bitem)">
							<div>
								<img :src="bitem.pic" class="UpdateList-list-img" />
								<p class="UpdateList-list-h1 sub_name">{{bitem.name}}</p>
								<p class="UpdateList-list-p1 sub_name">{{bitem.title}}</p>
								<span class="UpdateList-list-type">
									培训预告
								</span>
								<div class="UpdateList-list-left">
									<yd-icon name="icon-ic_place" custom size="0.26rem" color="rgb(255, 255, 255)"></yd-icon>
									<span>广东 · 东莞</span>
								</div>
								<div class="UpdateList-list-right">
									<yd-icon name="icon-ic_access_time" custom size="0.26rem" color="rgb(255, 255, 255)"></yd-icon>
									<span>{{bitem.start_at}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="item.type == 0">
					<div class="UpdateList">
						<div class="UpdateList-list" v-for="bitem, bkey in item.lessons" :key="bkey" @click="comeclass(bitem)">
							<div>
								<img :src="bitem.pictrue" class="UpdateList-list-img" />
								<p class="UpdateList-list-h1 sub_name">{{bitem.name}}</p>
								<p class="UpdateList-list-p1 sub_name">{{bitem.title}}</p>
								<span class="UpdateList-list-type" v-if="bitem.type == 1">
									免费课程
								</span>
								<span class="UpdateList-list-type" v-if="bitem.type == 2">
									精品课程
								</span>
								<span class="UpdateList-list-type" v-if="bitem.type == 3">
									VIP课程
								</span>
								<span class="UpdateList-list-type" v-if="bitem.type == 4">
									企业家访谈
								</span>
								<div class="UpdateList-list-middle">
									<img src="../../assets/IndexPlay.png" />
								</div>
								<div class="UpdateList-list-left">
									<yd-icon name="icon-play" custom size="0.26rem" color="rgb(255, 255, 255)"></yd-icon>
									<span>{{bitem.out_play_times}}</span>
								</div>
								<div class="UpdateList-list-right">
									<yd-icon name="icon-ic_access_time" custom size="0.26rem" color="rgb(255, 255, 255)"></yd-icon>
									<span>{{bitem.duration}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="index_background_gray"></div>
			</div>
			<div class="bottom_height"></div>
		</div>
	</div>
</template>

<script>
	import bottomnav from '../common/Bottom_nav.vue'
	import indextop from './index_top.vue'
	import update from './update.vue'
	import vloading from '../loading/loading'
	export default {
		name: 'app',
		created() {
			
		},
		data() {
			return {
				index: true,
				advertdata: this.$localStorage.get('advertData'),
				navdata: this.$localStorage.get('indexData').nav,
				updata: this.$localStorage.get('indexData').last_lesson_trains,
				searchclass: this.$localStorage.get('indexData').lesson_train_names,
				loading_v: false
			}
		},
		components: {
			bottomnav,
			indextop,
			update,
			'v-loading': vloading,
		},
		methods: {
			//获取广告列表
			getAdvertlist() {
				return axios.get('/item/advert/lists')
			},
			//获取首页数据
			getIndexlist() {
				return axios.get('/item/lesson/index')
			},
			getAll() {
				this.loading_v = true
				axios.all([this.getIndexlist(), this.getAdvertlist()])
					.then(axios.spread((indexdata, advertdata) => {
						// 多个请求现在都执行完成
						// 编辑页面的时候赋值
						console.log(indexdata)
						let indexData_get = this.$localStorage.get('indexData')
						if(indexData_get == '1') {
							this.$localStorage.set('indexData', indexdata.data)
							this.$localStorage.set('advertData', advertdata.data)
							window.location.reload()
							return
						} else {
							this.$localStorage.set('indexData', indexdata.data)
							this.$localStorage.set('advertData', advertdata.data)
						}
						this.$localStorage.set('searchclassdata', this.searchclass)
						this.loading_v = false
						this.$dialog.loading.close()
					}))
			},
			cometrains(item) {
				this.$router.push({
					name: 'TrainDetail',
					params: {
						id: item.id
					}
				})
			},
			comeclass(item) {
				if(item.type == 4) {
					this.$router.push({
						name: 'InterviewDetail',
						params: {
							id: item.id
						}
					})
				} else {
					this.$router.push({
						name: 'details',
						params: {
							id: item.id
						}
					})
				}
			},
			more(id, type) {
				this.$router.push({
					name: 'class',
					params: {
						id: id,
						type: type
					}
				})
			}
		},
		mounted() {
			this.getAll()
			if(this.$localStorage.get('indexData') == '1') {
				this.$dialog.loading.open('很快加载好了')
			}
		}
	}
</script>
<style lang="less" scoped>
	.index_background_gray {
		height: .2rem;
		background: whitesmoke;
	}
	
	.update_nav {
		font-size: 15.0px;
		padding-left: .1rem;
		position: relative;
		color: #101010;
		font-weight: 700;
	}
	
	.checkmore {
		color: #999999;
		font-size: 12px;
	}
	
	.sub_name {
		word-wrap: normal;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		text-align: justify;
	}
	
	.UpdateList {
		&-list:first-child {
			margin-top: auto;
		}
		&-list {
			padding: .3rem;
			margin-top: .15rem;
			background: #ffffff;
			position: relative;
			&-img {
				width: 100%;
				border-radius: 4px;
			}
			&-h1 {
				font-family: PingFangSC, sans-serif;
				font-weight: 400;
				font-size: 16px;
				color: #101010;
				margin-top: .1rem;
			}
			&-p1 {
				font-family: PingFangSC, sans-serif;
				font-weight: 400;
				font-size: 11px;
				color: rgba(176, 176, 176, 1);
				margin-top: .1rem;
			}
			&-type {
				position: absolute;
				top: .5rem;
				right: .5rem;
				color: rgb(255, 255, 255);
				border-radius: 30px;
				border: 1px solid rgba(255, 255, 255, 0.4);
				padding: 0.05rem .2rem;
				font-size: 0.24rem;
			}
			&-left {
				position: absolute;
				bottom: 1.5rem;
				left: .5rem;
				color: rgb(255, 255, 255);
				font-weight: 600;
			}
			&-right {
				position: absolute;
				bottom: 1.5rem;
				right: .5rem;
				color: #ffffff;
				font-weight: 600;
			}
			&-middle {
				position: absolute;
				left: 0;
				right: 0;
				top: -40px;
				bottom: 0;
				margin: auto;
				width: 40px;
				height: 40px;
				& img {
					width: 40px;
				}
			}
		}
	}
</style>