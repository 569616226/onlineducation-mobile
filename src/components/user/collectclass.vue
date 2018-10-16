<template>
	<div v-title data-title="我的收藏">
		<el-tabs v-model="CollectClass.activeName">
			<el-tab-pane label="课程" name="first">
				<collectclass></collectclass>
			</el-tab-pane>
			<el-tab-pane label="会议" name="second">
				<collecttrain></collecttrain>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import collectclass from './collect/collectclass.vue'
	import collecttrain from './collect/collecttrain.vue'
	export default {
		components: {
			collectclass,
			collecttrain
		},
		data() {
			return {
				
			}
		},
		computed: {
			...mapState({
				CollectClass: state => state.classes.CollectClass
			}),
		},
		methods: {

		},
		mounted() {
			
		}
	}
</script>
<style>
	.el-tabs__nav{
		float: none;
		display: flex;
	}
	.el-tabs__item{
		flex: 1;
		text-align: center;
	}
</style>