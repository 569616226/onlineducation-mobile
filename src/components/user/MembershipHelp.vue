<template>
	<div v-title data-title="会员帮助中心">
		<div class="MembershipHelp">
			<div class="MembershipHelp-list">
				<div class="MembershipHelp-list-wen">
					<el-row>
						<el-col :span="2">
							<span class="MembershipHelp-list-wen-span">问</span>
						</el-col>
						<el-col :span="22">
							<p class="MembershipHelp-list-wen-p">怎么购买教程？</p>
						</el-col>
					</el-row>
				</div>
				<div class="MembershipHelp-list-da">
					<el-row>
						<el-col :span="2">
							<span class="MembershipHelp-list-da-span">答</span>
						</el-col>
						<el-col :span="22">
							<p>如果您是单独购买一个教程，那么在每个教程的介绍页面就会有其单独购买链接，按照提示一步一步购买即可。</p>
							<p style="margin-top: .15rem;">如果您是购买年会员，那么在东华商学首页、每个教程的介绍页面都有年会员的购买链接，按照提示一步一步购买即可。</p>
						</el-col>
					</el-row>
				</div>
			</div>
			<div class="MembershipHelp-list">
				<div class="MembershipHelp-list-wen">
					<el-row>
						<el-col :span="2">
							<span class="MembershipHelp-list-wen-span">问</span>
						</el-col>
						<el-col :span="22">
							<p class="MembershipHelp-list-wen-p">我是VIP会员了，为什么还要购买精品课程，才能观看？</p>
						</el-col>
					</el-row>
				</div>
				<div class="MembershipHelp-list-da">
					<el-row>
						<el-col :span="2">
							<span class="MembershipHelp-list-da-span">答</span>
						</el-col>
						<el-col :span="22">
							<p>是的，精品课程是我们邀请国内著名学家授课，专业程度非常高。精品课程对所有用户均采用统一的收费标准。</p>
						</el-col>
					</el-row>
				</div>
			</div>
			<div class="MembershipHelp-list">
				<div class="MembershipHelp-list-wen">
					<el-row>
						<el-col :span="2">
							<span class="MembershipHelp-list-wen-span">问</span>
						</el-col>
						<el-col :span="22">
							<p class="MembershipHelp-list-wen-p">视频课程可以下载吗？</p>
						</el-col>
					</el-row>
				</div>
				<div class="MembershipHelp-list-da">
					<el-row>
						<el-col :span="2">
							<span class="MembershipHelp-list-da-span">答</span>
						</el-col>
						<el-col :span="22">
							<p>不可以，目前只支持在微信上在线观看课程。</p>
						</el-col>
					</el-row>
				</div>
			</div>
			<div class="MembershipHelp-list">
				<div class="MembershipHelp-list-wen">
					<el-row>
						<el-col :span="2">
							<span class="MembershipHelp-list-wen-span">问</span>
						</el-col>
						<el-col :span="22">
							<p class="MembershipHelp-list-wen-p">学习中遇到不懂的地方，可以提问吗？</p>
						</el-col>
					</el-row>
				</div>
				<div class="MembershipHelp-list-da">
					<el-row>
						<el-col :span="2">
							<span class="MembershipHelp-list-da-span">答</span>
						</el-col>
						<el-col :span="22">
							<p>当然可以，有任何不懂的问题，您可以随时在学员论坛或者视频留言板提问，会有老师、助教和同学们及时解答，帮您跨过一个又一个障碍。</p>
						</el-col>
					</el-row>
				</div>
			</div>
			<div class="MembershipHelp-list">
				<div class="MembershipHelp-list-wen">
					<el-row>
						<el-col :span="2">
							<span class="MembershipHelp-list-wen-span">问</span>
						</el-col>
						<el-col :span="22">
							<p class="MembershipHelp-list-wen-p">课程内容实用性怎样？对工作有帮助吗？</p>
						</el-col>
					</el-row>
				</div>
				<div class="MembershipHelp-list-da">
					<el-row>
						<el-col :span="2">
							<span class="MembershipHelp-list-da-span">答</span>
						</el-col>
						<el-col :span="22">
							<p>我们的课程都是邀请一些设计经验丰富的设计师精心录制的，课程都是老师们工作过程中的经验总结，所以都是非常实用的内容。</p>
						</el-col>
					</el-row>
				</div>
			</div>
			<div class="MembershipHelp-list">
				<div class="MembershipHelp-list-wen">
					<el-row>
						<el-col :span="2">
							<span class="MembershipHelp-list-wen-span">问</span>
						</el-col>
						<el-col :span="22">
							<p class="MembershipHelp-list-wen-p">单独购买和购买会员有什么区别？</p>
						</el-col>
					</el-row>
				</div>
				<div class="MembershipHelp-list-da">
					<el-row>
						<el-col :span="2">
							<span class="MembershipHelp-list-da-span">答</span>
						</el-col>
						<el-col :span="22">
							<p>单独购买 是指只购买当前这一个教程，付款后就可以观看这一个教程。教程单独购买后，有效观看期为永久有效。</p>
							<p style="margin-top: .15rem;">开通年会员 是指以超优惠价格购买东华商学VIP用户下的全部教程观看权，学员可以自由学习该学院下的所有教程，并且在有效期内可以免费观看本学院所有新增的课程。年会员形式购买教程，性价比非常高，绝大部分学员都是以这种形式来参与学习。年会员有效观看期为一年。</p>
						</el-col>
					</el-row>
				</div>
			</div>
			<div class="MembershipHelp-list">
				<div class="MembershipHelp-list-wen">
					<el-row>
						<el-col :span="2">
							<span class="MembershipHelp-list-wen-span">问</span>
						</el-col>
						<el-col :span="22">
							<p class="MembershipHelp-list-wen-p">加入会员之后，还需要交其他费用吗?</p>
						</el-col>
					</el-row>
				</div>
				<div class="MembershipHelp-list-da">
					<el-row>
						<el-col :span="2">
							<span class="MembershipHelp-list-da-span">答</span>
						</el-col>
						<el-col :span="22">
							<p>加入会员的一年有效期内，如果不再购买其他的精品课程，就不需要再交其他费用。</p>
						</el-col>
					</el-row>
				</div>
			</div>
			<div class="MembershipHelp-list">
				<div class="MembershipHelp-list-wen">
					<el-row>
						<el-col :span="2">
							<span class="MembershipHelp-list-wen-span">问</span>
						</el-col>
						<el-col :span="22">
							<p class="MembershipHelp-list-wen-p">学习账号可以多用公用吗？</p>
						</el-col>
					</el-row>
				</div>
				<div class="MembershipHelp-list-da">
					<el-row>
						<el-col :span="2">
							<span class="MembershipHelp-list-da-span">答</span>
						</el-col>
						<el-col :span="22">
							<p>这是不允许的，如果您的账号在一天内有超过3个终端登录（PC，手机等），那么账号就会被系统自动冻结。您需要联系客服进行解冻。</p>
							<p style="margin-top: .15rem;">如果因为共享而被冻结的次数累计超过3次，账号可能会被永久关闭。请珍惜您的账号，拒绝违规共享和兜售账号。谢谢您的支持！</p>
						</el-col>
					</el-row>
				</div>
			</div>
			<div class="MembershipHelp-list">
				<div class="MembershipHelp-list-wen">
					<el-row>
						<el-col :span="2">
							<span class="MembershipHelp-list-wen-span">问</span>
						</el-col>
						<el-col :span="22">
							<p class="MembershipHelp-list-wen-p">对手机有要求吗？视频会卡吗？</p>
						</el-col>
					</el-row>
				</div>
				<div class="MembershipHelp-list-da">
					<el-row>
						<el-col :span="2">
							<span class="MembershipHelp-list-da-span">答</span>
						</el-col>
						<el-col :span="22">
							<p>对手机无特别要求，一般情况下，视频是不会卡顿的，如若卡顿，请检查您的网速是否正常。</p>
						</el-col>
					</el-row>
				</div>
			</div>
			<div class="MembershipHelp-list">
				<div class="MembershipHelp-list-wen">
					<el-row>
						<el-col :span="2">
							<span class="MembershipHelp-list-wen-span">问</span>
						</el-col>
						<el-col :span="22">
							<p class="MembershipHelp-list-wen-p">会员可以转让吗？ </p>
						</el-col>
					</el-row>
				</div>
				<div class="MembershipHelp-list-da">
					<el-row>
						<el-col :span="2">
							<span class="MembershipHelp-list-da-span">答</span>
						</el-col>
						<el-col :span="22">
							<p>不可以，一旦成为会员，只会对该账号开放我们的vip会员课程，不能将会员身份转移到其他账号上。</p>
						</el-col>
					</el-row>
				</div>
			</div>
			<div class="MembershipHelp-list">
				<div class="MembershipHelp-list-wen">
					<el-row>
						<el-col :span="2">
							<span class="MembershipHelp-list-wen-span">问</span>
						</el-col>
						<el-col :span="22">
							<p class="MembershipHelp-list-wen-p">视频能否分享和用于其他商业用途？ </p>
						</el-col>
					</el-row>
				</div>
				<div class="MembershipHelp-list-da">
					<el-row>
						<el-col :span="2">
							<span class="MembershipHelp-list-da-span">答</span>
						</el-col>
						<el-col :span="22">
							<p>视频均属原创，版权归东华商学所有，学员可以转发分享，但不能用于其他商业用途。一旦发现学员将教学视频用于其他商业用途，我们将会通过法律途径进行起诉与维权。</p>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<div class="MembershipHelp-link">
			<a href="tel:0769-22898086">
				<yd-icon class="vip_icon" name="icon-ic_phone_in_talk" color="rgb(159, 159, 159)" custom size="0.24rem"></yd-icon>
				<span>联系客服</span>
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		components: {

		},
		computed: {

		},
		methods: {

		},
		mounted() {

		}
	}
</script>
<style lang="less" scoped>
	.MembershipHelp {
		background: #FFFFFF;
		&-link {
			margin: 1rem auto;
			width: 80px;
			padding: .1rem 0;
			text-align: center;
			border-radius: 4px;
			border: 1px solid #bbb;
		}
		&-list {
			padding: .4rem .2rem .5rem .2rem;
			font-size: .28rem;
			border-bottom: 1px solid rgb(236, 236, 236);
			&-wen {
				&-span {
					display: inline-block;
					color: rgb(255, 255, 255);
					background-color: rgb(255, 152, 0);
					padding: 0 .04rem;
				}
			}
			&-da {
				margin-top: .2rem;
				&-span {
					display: inline-block;
					color: #ffffff;
					background-color: rgb(51, 174, 50);
					padding: 0 0.04rem;
				}
			}
		}
	}
</style>