<template>
	<div>
		<yd-navbar>
			<router-link to="#" slot="left">
				<span class="update">最近更新</span>
			</router-link>
			<div @click="more" slot="right">
				<span class="checkmore">查看更多></span>
			</div>
		</yd-navbar>
		<div class="UpdateList">
			<div class="UpdateList-list" v-for="item, key in updata" :key="key" @click="comeclass(item)">
				<div v-if="item.is_train">
					<img :src="item.pic" class="UpdateList-list-img" />
					<p class="UpdateList-list-h1 sub_name">{{item.name}}</p>
					<p class="UpdateList-list-p1 sub_name">{{item.title}}</p>
					<span class="UpdateList-list-type">
						培训预告
					</span>
					<div class="UpdateList-list-left">
						<yd-icon name="icon-ic_place" custom size="0.26rem" color="rgb(255, 255, 255)"></yd-icon>
						<span>广东 · 东莞</span>
					</div>
					<div class="UpdateList-list-right">
						<yd-icon name="icon-ic_access_time" custom size="0.26rem" color="rgb(255, 255, 255)"></yd-icon>
						<span>{{item.start_at}}</span>
					</div>
				</div>
				<div v-else>
					<img :src="item.pictrue" class="UpdateList-list-img" />
					<p class="UpdateList-list-h1 sub_name">{{item.name}}</p>
					<p class="UpdateList-list-p1 sub_name">{{item.title}}</p>
					<span class="UpdateList-list-type" v-if="item.type == 1">
						免费课程
					</span>
					<span class="UpdateList-list-type" v-if="item.type == 2">
						精品课程
					</span>
					<span class="UpdateList-list-type" v-if="item.type == 3">
						VIP课程
					</span>
					<span class="UpdateList-list-type" v-if="item.type == 4">
						企业家访谈
					</span>
					<div class="UpdateList-list-middle">
						<img src="../../assets/IndexPlay.png" />
					</div>
					<div class="UpdateList-list-left">
						<yd-icon name="icon-play" custom size="0.26rem" color="rgb(255, 255, 255)"></yd-icon>
						<span>{{item.out_play_times}}</span>
					</div>
					<div class="UpdateList-list-right">
						<yd-icon name="icon-ic_access_time" custom size="0.26rem" color="rgb(255, 255, 255)"></yd-icon>
						<span>{{item.duration}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['updata', 'navdata'],
		created() {

		},
		data() {
			return {

			}
		},
		methods: {
			comeclass(item) {
				if(item.is_train) {
					this.$router.push({
						name: 'TrainDetail',
						params: {
							id: item.id
						}
					})
				} else {
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
				}
			},
			more() {
				const id = this.navdata[0].id
				const type = this.navdata[0].type
				this.$router.push({
					name: 'class',
					params: {
						id: id,
						type: type
					}
				})
			}
		},
		computed: {

		},
		mounted() {

		},
		watch: {

		}
	}
</script>
<style lang="less" scoped>
	.update {
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