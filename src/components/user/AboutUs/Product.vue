<template>
	<div>
		<div class="Product">
			<el-row :gutter="20" class="Product-row">
				<el-col :span="12" class="Product-row-col">
					<img src="../../../assets/About/Product1.png" class="Product-row-col-img" />
					<p class="Product-row-col-title">供应链诊断系统产品</p>
					<p class="Product-row-col-content">对加贸企业的关务、采购、仓库、生管等部门，从供应链风险评估、成本管控、规范化管理等三个层面进行全面深入诊断，并分析原因、提出改善建议。</p>
				</el-col>
				<el-col :span="12" class="Product-row-col">
					<img src="../../../assets/About/Product2.png" class="Product-row-col-img" />
					<p class="Product-row-col-title">专项海关咨询辅导</p>
					<p class="Product-row-col-content">根据企业的实际情况知道企业提供海关所需的核算数据、纸质资料及报告编写，并编导企业规范海关查验要求。</p>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="Product-row Product-MarginTop">
				<el-col :span="12" class="Product-row-col">
					<img src="../../../assets/About/Product3.png" class="Product-row-col-img" />
					<p class="Product-row-col-title">一般贸易解决方案</p>
					<p class="Product-row-col-content">提供一般贸易进出口解决方案，包括：通关、物流、外汇、金融、风险评估、内控等。</p>
				</el-col>
				<el-col :span="12" class="Product-row-col">
					<img src="../../../assets/About/Product4.png" class="Product-row-col-img" />
					<p class="Product-row-col-title">物流综合解决方案</p>
					<p class="Product-row-col-content">以提高物流效率、降低物流成本为根本宗旨，为企业提供货代、仓储、运输、配送、报关等服务，量身打造网络化、系统化和柔性化物流解决方案！</p>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="Product-row Product-MarginTop">
				<el-col :span="12" class="Product-row-col">
					<img src="../../../assets/About/Product5.png" class="Product-row-col-img" />
					<p class="Product-row-col-title">供应链定制化解决方案</p>
					<p class="Product-row-col-content">根据供应链风险诊断报告及改善建议书，从企业供应链管理的风险、成本、规范化三个层面为企业量身定制顾问方案并提供后续的供应链定制化服务。</p>
				</el-col>
				<el-col :span="12" class="Product-row-col">
					<img src="../../../assets/About/Product6.png" class="Product-row-col-img" />
					<p class="Product-row-col-title">供应链人才订制服务</p>
					<p class="Product-row-col-content">整合优质资源，为企业培训及输送供应链高端人才。</p>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="Product-row Product-MarginTop">
				<el-col :span="12" class="Product-row-col">
					<img src="../../../assets/About/Product7.png" class="Product-row-col-img" />
					<p class="Product-row-col-title">AEO审核认证辅导</p>
					<p class="Product-row-col-content">根据AEO认证标准和内审要求，对企业的管理规范进行全面诊断，辅导企业顺利升级为AEO一般认证或高级认证企业。</p>
				</el-col>
				<el-col :span="12" class="Product-row-col">
					<img src="../../../assets/About/Product8.png" class="Product-row-col-img" />
					<p class="Product-row-col-title">通关定制化解决方案</p>
					<p class="Product-row-col-content">为客户提供进出口货物预先商品归类、加工贸易代理、设备进出口、进出口报检、进出口报关等通关服务。</p>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="Product-row Product-MarginTop">
				<el-col :span="12" class="Product-row-col">
					<img src="../../../assets/About/Product9.png" class="Product-row-col-img" />
					<p class="Product-row-col-title">东华商学院在线教育平台</p>
					<p class="Product-row-col-content">提供供应链行业专家大讲堂、企业家访谈录、学员学习分享社区、行业咨询等。</p>
				</el-col>
				<el-col :span="12" class="Product-row-col">
					<img src="../../../assets/About/Product10.png" class="Product-row-col-img" />
					<p class="Product-row-col-title">资本运作及上市辅导</p>
					<p class="Product-row-col-content">帮助企业家掌握资本运作逻辑，具备金融思维，实现从实业家到企投家的战略转型。同时为企业提供定制化服务和辅导，助推企业成功上市，达成资本共赢。</p>
				</el-col>
			</el-row>
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
	.Product {
		padding-bottom: 1.4rem;
		&-row {
			&-col {
				text-align: center;
				&-img {
					width: 100%;
				}
				&-title {
					font-weight: bold;
					margin: .3rem 0;
					font-size: .3rem;
				}
				&-content {
					color: rgb(136, 136, 136);
					font-size: .26rem;
				}
			}
		}
		&-MarginTop{
			margin-top: .5rem;
		}
	}
</style>