<template>
	<view class="content">
		<button type="primary" @click="_gopage('/pages/index/savePoster')">保存海报</button>
		
		<button type="primary" @click="_gopage('/pages/index/timePicker')">自定义时间选择器</button>
		
		<button type="primary" @click="_gopage('/pages/index/swiperSlide')">Swiper滑动</button>
		
		<button type="primary" @click="_gopage('/pages/index/animationTest')">小程序动画测试</button>
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
	width: 300rpx;
	height: 85rpx;
	line-height: 85rpx;
	text-align: center;
	color: #FFF;
	margin: 20rpx 0;
}
</style>
