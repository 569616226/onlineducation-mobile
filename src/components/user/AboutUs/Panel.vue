<template>
	<div>
		<div class="Panel">
			<div class="Panel-user">
				<img src="../../../assets/About/Panel1.png" class="Panel-user-img" />
				<p class="Panel-name">韩彬</p>
				<p class="Panel-sou">首席专家 · 企业供应链战略管理</p>
				<p class="Panel-line"></p>
				<p class="Panel-content">东华供应链科技有限公司　董事长/总裁</p>
				<p class="Panel-content">广东瑞东华教育科技有限公司　总经理</p>
				<p class="Panel-content">东莞市东华报关服务有限公司　总经理</p>
				<p class="Panel-content">国家注册高级管理顾问师 </p>
				<p class="Panel-content">企业供应链管理专家 </p>
			</div>
			<div class="Panel-user Panel-MarginTop">
				<img src="../../../assets/About/Panel2.png" class="Panel-user-img" />
				<p class="Panel-name">金鹏远</p>
				<p class="Panel-sou">首席专家 · 企业供应链成本及风险管控</p>
				<p class="Panel-line"></p>
				<p class="Panel-content">东华供应链科技有限公司　副总裁</p>
				<p class="Panel-content">东华供应链管理中心首席顾问专家</p>
				<p class="Panel-content">国家注册物流通关师</p>
				<p class="Panel-content">TWI/JI培训师</p>
			</div>
			<div class="Panel-user Panel-MarginTop">
				<img src="../../../assets/About/Panel3.png" class="Panel-user-img" />
				<p class="Panel-name">金洋</p>
				<p class="Panel-sou">首席专家 · 企业管理运营</p>
				<p class="Panel-line"></p>
				<p class="Panel-content">东华供应链科技有限公司　副总裁</p>
				<p class="Panel-content">东华供应链商学院  院长</p>
				<p class="Panel-content">企业运营管理专家</p>
				<p class="Panel-content">管理心理学导师</p>
			</div>
			<div class="Panel-user Panel-MarginTop">
				<img src="../../../assets/About/Panel4.png" class="Panel-user-img" />
				<p class="Panel-name">沈兴鹏</p>
				<p class="Panel-sou">首席专家 · 资本运作与顶层设计</p>
				<p class="Panel-line"></p>
				<p class="Panel-content">北京鲲鹏咨询 总裁</p>
				<p class="Panel-content">企业商业模式创新与资本运作模式   孵化导师</p>
			</div>
			<div class="Panel-user Panel-MarginTop">
				<img src="../../../assets/About/Panel5.png" class="Panel-user-img" />
				<p class="Panel-name">杨龙</p>
				<p class="Panel-sou">关务咨询专家</p>
				<p class="Panel-line"></p>
				<p class="Panel-content">10年报关行业关务咨询实操经验</p>
			</div>
			<div class="Panel-user Panel-MarginTop">
				<img src="../../../assets/About/Panel6.png" class="Panel-user-img" />
				<p class="Panel-name">卢明</p>
				<p class="Panel-sou">关务咨询专家</p>
				<p class="Panel-line"></p>
				<p class="Panel-content">15年报关行业关务咨询实操经验</p>
			</div>
			<div class="Panel-user Panel-MarginTop">
				<img src="../../../assets/About/Panel7.png" class="Panel-user-img" />
				<p class="Panel-name">余元祥</p>
				<p class="Panel-sou">品牌策划专家</p>
				<p class="Panel-line"></p>
				<p class="Panel-content">10年品牌策划运营管理经验</p>
			</div>
			<div class="Panel-user Panel-MarginTop">
				<img src="../../../assets/About/Panel8.png" class="Panel-user-img" />
				<p class="Panel-name">刘伟</p>
				<p class="Panel-sou">AEO咨询专家</p>
				<p class="Panel-line"></p>
				<p class="Panel-content">4年AEO咨询实操经验</p>
			</div>
			<div class="Panel-user Panel-MarginTop">
				<img src="../../../assets/About/Panel9.png" class="Panel-user-img" />
				<p class="Panel-name">尉方圆</p>
				<p class="Panel-sou">贸易物流专家</p>
				<p class="Panel-line"></p>
				<p class="Panel-content">15年贸易物流咨询实操经验</p>
			</div>
			<div class="Panel-user Panel-MarginTop">
				<img src="../../../assets/About/Panel10.png" class="Panel-user-img" />
				<p class="Panel-name">汪红军</p>
				<p class="Panel-sou">软件研发专家</p>
				<p class="Panel-line"></p>
				<p class="Panel-content">16年IT软件研发经验</p>
			</div>
			<div class="Panel-user Panel-MarginTop">
				<img src="../../../assets/About/Panel11.png" class="Panel-user-img" />
				<p class="Panel-name">钟荣坤</p>
				<p class="Panel-sou">AEO咨询专家</p>
				<p class="Panel-line"></p>
				<p class="Panel-content">4年AEO咨询实操经验</p>
			</div>
			<div class="Panel-user Panel-MarginTop">
				<img src="../../../assets/About/Panel12.png" class="Panel-user-img" />
				<p class="Panel-name">李磊</p>
				<p class="Panel-sou">项目管理专家</p>
				<p class="Panel-line"></p>
				<p class="Panel-content">15年项目管理咨询实操经验</p>
			</div>
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
	.Panel {
		padding-bottom: 1.5rem;
		&-user {
			text-align: center;
			&-img {
				width: 90px;
			}
		}
		&-name {
			font-weight: bold;
			font-size: 16px;
			margin-top: .4rem;
		}
		&-sou {
			color: rgb(144, 158, 168);
			margin-top: .25rem;
		}
		&-line {
			background-color: rgb(172, 172, 172);
			height: 2px;
			width: 20px;
			margin: .35rem auto;
		}
		&-content {
			color: rgb(102, 102, 102);
			margin-top: .2rem;
		}
		&-MarginTop{
			margin-top: 1.4rem;
		}
	}
</style>