<template>
	<view>
		<u-popup v-model="show" mode="center">
			<view>出淤泥而不染，濯清涟而不妖</view>
		</u-popup>
		<u-button @click="show = true">打开</u-button>
		<u-button @click="show = false">关闭</u-button>
	</view>
</template>

<script>
	export default {
		name: 'uViewUiTest',
		components: {

		},
		data() {
			return {
				show: false
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>

</style>
