<template>
	<div>
		<ul v-selectable >
			<li class="square">
				item1
			</li>
			<li class="oval">
				item2
			</li>
			<li class="triangle">
				item3
			</li>
			<li class="triangle-topleft">
				item4
			</li>
			<li class="curvedarrow">
				item5
			</li>
			<li class="triangle-topleft">
				item6
			</li>
		</ul>

	</div>
</template>
<script>
import Vue from 'vue'
import Selectable from '@/components/vue-selectable/vue-selectable.js'
Vue.use(Selectable);
export default{
	data(){
		return {

		}
	}
}
</script>
<style scoped>
	ul{
		margin: 40px 40px 40px 40px;
		border: 1px solid red;
		width: 300px;
		padding-bottom: 20px;
	}
	ul li {
		width: 200px;
		height: 30px;
		list-style: none;
		border: 1px solid black;
		margin-left: 10px;
		margin-top: 30px;
		text-align: center;
		line-height: 30px;
		user-select:none;
	}
	ul li.active{
		background-color: red;
	}
</style>