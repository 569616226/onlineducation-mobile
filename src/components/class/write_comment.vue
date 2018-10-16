<template>
	<div v-title data-title="写点评">
		<div class="write_classname">
			<span>{{ $store.state.classes.classes_edit.name }}</span>
		</div>
		<textarea v-model="text" maxlength="200" class="comment_text" placeholder="请写下您对本课程的点评；点评将由系统筛选后显示，对所有人可见。"></textarea>
		<div class="comment_submit" @click="comment_submit">
			<p>提交</p>
		</div>
		<div class="my_comment">
			<p class="my_comment_p1">我的点评</p>
			<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
				<div class="class_comment" v-for="item,key in data" :key="key" slot="list">
					<div class="class_comment_name">
						<img class="class_comment_img" :src="item.avatar" />
						<span class="class_comment_wxname">{{item.guest}}</span>
						<span class="class_comment_vip" v-if="item.is_vip == true"><yd-icon class="class_icon" name="icon-vimeo" custom size="0.3rem" color="#ff9800"></yd-icon></span>
						<span class="class_comment_choice" v-if="item.is_better == 1">精选</span>
					</div>
					<div class="class_comment_content margin_left_7">
						<p>{{item.content}}</p>
						<div class="class_tide">
							<span class="class_time">{{item.created_at}}</span>
							<span class="class_delete" @click="delete_com(item.id,key)" v-if="!item.teacher_msg">删除</span>
						</div>
					</div>
					<div class="teacher_replied" v-if="item.teacher_msg">
						<div class="teacher_replied_title">
							<span>老师回复</span>
						</div>
						<p class="teacher_replied_p">{{item.teacher_msg.content}}</p>
					</div>
				</div>
				<!-- 数据全部加载完毕显示 -->
				<span slot="doneTip">没有更多内容</span>
				<!-- 加载中提示，不指定，将显示默认加载中图标 -->
				<div slot="loadingTip">
					<loading></loading>
				</div>
			</yd-infinitescroll>
			<div class="load_infinite">
				<loading v-if="loading_v"></loading>
			</div>
		</div>
	</div>
</template>

<script>
	import loading from '../common/loading'
	export default {
		components: {
			loading
		},
		created() {

		},
		data() {
			return {
				text: '',
				data: [],
				next: '',
				loading_v: false
			}
		},
		methods: {
			comment_submit() {
				if(this.text == '') {
					this.$dialog.toast({
						mes: '请先填写评论',
						timeout: 500
					})
				} else {
					axios.post('/item/discusse/' + this.$route.params.id, {
							'content': this.text
						})
						.then((res) => {
							if(res.data.status == true) {
								this.$dialog.toast({
									mes: '提交成功',
									timeout: 500
								})
								this.text = ""
								this.getData()
							} else {
								console.log(res)
								let word = '检测到您输入的内容中，存在敏感词：' + res.data.word
								this.$dialog.toast({
									mes: word,
									timeout: 2000
								})
							}
						})
				}
			},
			delete_com(id,key){
				this.$dialog.confirm({
                    mes: '真的要删除点评吗?删除后无法恢复',
                    opts: [
                        {
                            txt: '取消',
                            color: false,
                            callback: () => {
                                
                            }
                        },
                        {
                            txt: '确定',
                            color: "rgb(28, 116, 217)",
                            callback: () => {
                                axios.post('/item/discusse/' + id + '/destroy')
                                	.then((res) => {
                                		this.data.splice(key,1)
                                		this.$dialog.toast({mes: res.data.msg, timeout: 1000});
                                	})
                                	.catch((error) => {
                                		console.log(error);
                                	});
                            }
                        }
                    ]
                });
			},
			loadList() {
				axios.get(this.next)
					.then((res) => {
						console.log(res)
						const _list = res.data.data;
						this.data = [...this.data, ..._list];
						if(res.data.links.next == null) {
							this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
							return;
						}
						this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
						this.next = res.data.links.next
					})
					.catch((error) => {
						console.log(error);
					});
			},
			getData() {
				this.loading_v = true
				axios.get('/item/discusse/' + this.$route.params.id + '/my_lesson_discusses')
					.then((res) => {
						console.log(res)
						this.loading_v = false
						this.data = res.data.data
						this.comment_length = res.data.meta.total
						if(res.data.links.next == null) {
							this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
							return;
						}
						this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
						this.next = res.data.links.next
						if(this.data.length > 0) {
							this.nomessageshow = false
						} else {
							this.nomessageshow = true
						}
					})
					.catch((error) => {

					})
			}
		},
		computed: {

		},
		mounted() {
			this.getData()
		},
		watch: {

		}
	}
</script>

<style scoped>
	.comment_text {
		display: block;
		width: 100%;
		height: 180px;
		padding: 15px;
		border: none;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		border-bottom: 1px solid #e3e3e3;
		color: #000000;
		font-size: 14.0px;
	}
	
	::-webkit-input-placeholder {
		color: #b0b0b0;
		font-size: 14.0px;
		font-weight: normal;
	}
	
	.comment_submit {
		margin: .4rem .3rem;
		text-align: center;
		color: #fff;
		background-color: #42b0ff;
		font-size: 14.0px;
		border-radius: 4px;
		border: 1px solid #008fe0;
		padding: .23rem 0;
	}
	
	textarea::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #999;
	}
	
	textarea:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #999;
	}
	
	textarea::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #999;
	}
	
	textarea:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #999;
	}
	
	.my_comment {
		margin: .4rem .3rem;
	}
	
	.write_classname {
		color: #333333;
		font-size: 16.0px;
		padding: .3rem .2rem;
		border-bottom: 1px solid #E3E3E3;
	}
	
	.my_comment_p1 {
		color: #888888;
		font-size: 14.0px;
		text-align: center;
		position: relative;
	}
	
	.my_comment_p1:after {
		content: '';
		position: absolute;
		width: 35%;
		height: 1px;
		background: #e0e0e0;
		left: 0;
		top: 10px;
	}
	
	.my_comment_p1:before {
		content: '';
		position: absolute;
		width: 35%;
		height: 1px;
		background: #e0e0e0;
		right: 0;
		top: 10px;
	}
	
	.class_comment {
		margin-top: .2rem;
		padding: .2rem 0 0 0;
	}
	
	.class_comment_img {
		width: 24px;
		border-radius: 50%;
		vertical-align: middle;
	}
	
	.class_comment_wxname {
		color: #999999;
		font-size: 15.0px;
		margin-left: .15rem;
		vertical-align: middle;
	}
	
	.class_comment_content {
		margin-top: .2rem;
		color: #333333;
		font-size: 13.0px;
		padding-bottom: .4rem;
		word-wrap: break-word;
		word-break: break-all;
	}
	
	.margin_left_7 {
		margin-left: .7rem;
	}
	
	.teacher_replied {
		margin-left: .7rem;
		padding: .23rem 0;
		border-top: 1px solid #e3e3e3;
	}
	
	.teacher_replied_title {
		padding-left: .2rem;
		color: #999999;
		font-size: 14.0px;
		position: relative;
	}
	
	.teacher_replied_title:after {
		content: '';
		width: 4px;
		height: 100%;
		background: #42B0FF;
		position: absolute;
		left: 0;
	}
	
	.teacher_replied_p {
		font-size: 15.0px;
		color: #333333;
		margin: .3rem 0;
	}
	
	.class_comment_choice {
		color: #ffffff;
		background-color: #ff6972;
		margin-left: .1rem;
		padding: 2px 5px;
		border-radius: 2px;
	}
	
	.class_tide {
		margin-top: .25rem;
	}
	
	.class_time {
		color: #b0b0b0;
		font-size: 12.0px;
	}
	
	.class_delete {
		color: #63819d;
		font-size: 12.0px;
		margin-left: .4rem;
	}
	
	.load_infinite{
		text-align: center;
	}
	.load_infinite svg{
		height: 50px;
	}
</style>