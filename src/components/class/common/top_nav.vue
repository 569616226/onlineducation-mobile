<template>
	<div>
		<div class="top_nav sortMenu">
			<div class="top_nav-search" @click="col_search">
				<div class="top_nav-search-middle">
					<yd-icon name="icon-ic_search" slot="icon" custom size="0.3rem" color="rgb(204, 204, 204)" class="top_nav-search-middle-i"></yd-icon>
					<span>搜索</span>
				</div>
			</div>
			<div class="TopNav_Scroll">
				<yd-flexbox class="sortMenu-ul" ref="sortment">
					<yd-flexbox-item v-for="item,key in top_nav" :key="key" class="top_nav_one cell">
						<router-link :to="{ name: 'class', params: { id: item.id, type: item.type }}">
							{{item.name}}
						</router-link>
					</yd-flexbox-item>
				</yd-flexbox>
			</div>
		</div>
		<div class="allSort">
			<div class="sortMenu clearfix">
				<ul class="sortMenu-ul" ref="sortment">
					<li class="cell cell_bottom_on" v-for="item in set_genre_nav" @click="selectStyle (item) " :class="{'active':item.active}">
						{{item.name}}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		created() {

		},
		data() {
			return {
				index_col: '0',
				active: false,
			}
		},
		methods: {
			col_search() {
				this.$router.push({
					name: 'search'
				})
			},
			selectStyle(item, index) {　
				let that = this　　　　　
				this.$nextTick(function() {　　　　　　　　
					this.genre_nav.forEach(function(item) {　　　　　　　　　　
						that.$set(item, 'active', false);
					});　　　　　　　　
					this.$set(item, 'active', true);　　
					//console.log(item.id)
					this.$emit('ievent', item.id);　　　　
				});　　　　
			}
		},
		props: ['top_nav', 'genre_nav'],
		computed: {
			set_genre_nav() {
				return this.genre_nav
			}
		},
		mounted() {

		},
		watch: {
			$route() {
				let that = this
				this.set_genre_nav.forEach(function(value, key) {
					that.$set(value, 'active', false);
					if(key == 0) {
						that.$set(value, 'active', true);
					}
				})
			},
			set_genre_nav(val) {
				let that = this
				val.forEach(function(value, key) {
					that.$set(value, 'active', false);
					if(key == 0) {
						that.$set(value, 'active', true);
					}
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.top_nav {
		border-bottom: 1px solid #cccccc;
		background: #ffffff;
		&-search {
			padding: .25rem;
			background-color: rgba(240, 240, 240, 0.8);
			&-middle {
				padding: .1rem;
				text-align: center;
				color: rgb(204, 204, 204);
				background: #ffffff;
				border-radius: 5px;
				font-size: .3rem;
			}
		}
	}
	
	.top_nav_one {
		padding: .3rem .23rem;
		text-align: center;
		font-size: .3rem;
	}
	
	.col_search {
		margin-right: .2rem;
		margin-top: .1rem;
	}
	
	.router-link-active {
		color: #42b0ff;
		position: relative;
	}
	
	.router-link-active:after {
		content: '';
		width: 100%;
		height: 3px;
		background-color: #42b0ff;
		position: absolute;
		bottom: -16px;
		left: 0;
	}
	/* 分类菜单*/
	
	.sortMenu {
		width: 100%;
		overflow-x: scroll;
		-webkit-overflow-x: scroll;
	}
	
	.sortMenu::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: #fff;
	}
	
	.sortMenu-ul {
		display: flex;
		justify-content: flex-start;
		overflow-y: scroll;
		/*解决ios上滑动不流畅*/
		-webkit-overflow-scrolling: touch;
	}
	
	.sortMenu-ul::-webkit-scrollbar {
		display: none;
	}
	
	.sortMenu .cell {
		display: inline-block;
		text-align: center;
		position: relative;
		text-overflow: ellipsis;
		word-break: keep-all;
	}
	
	.sortMenu-ul .active {
		color: rgb(18, 156, 255);
		background-color: rgb(255, 255, 255);
		border: 1px solid rgb(18, 156, 255);
	}
	
	.cell_bottom_on {
		margin: 15px 5px;
		padding: 7px 20px;
		background-color: #ebebeb;
		border-radius: 30px;
		font-size: 13.0px;
	}
	
	.TopNav_Scroll {
		overflow: hidden;
	}
</style>