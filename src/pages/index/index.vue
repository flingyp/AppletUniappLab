<template>
	<view class="content">
		<button type="primary" @click="_gopage('/pages/index/savePoster')">保存海报</button>
		
		<button type="primary" @click="_gopage('/pages/index/timePicker')">自定义时间选择器</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			_gopage(url) {
				this.gopage(url)
			}
		}
	}
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.content > button {
	background: #007aff;
	margin: 40rpx 0;
}
</style>
