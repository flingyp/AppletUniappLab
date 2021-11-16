<template>
	<view class="content">
		<button type="primary" @click="_gopage('/pages/index/savePosterTest')">保存海报</button>
		
		<button type="primary" @click="_gopage('/pages/index/timePicker')">自定义选择器</button>
		
		<button type="primary" @click="_gopage('/pages/index/swiperSlide')">Swiper滑动</button>
		
		<button type="primary" @click="_gopage('/pages/index/animationTest')">小程序测试页面</button>
		
		<button type="primary" @click="_gopage('/pages/index/echarts/echarts')">ECharts图表</button>
		
		<button type="primary" @click="_gopage('/pages/index/headerNavbar')">uView和uni-ui</button>
		
		<button type="primary" @click="_gopage('/pages/index/user/index')">相关API基本测试</button>
		
		<button type="primary" @click="_gopage('/pages/index/uViewUiTest')">uViewUI源码测试</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		async onLoad() {
			this.getUserData()
		},
		async mounted() {
		},
		methods: {
			_gopage(url) {
				this.gopage(url)
			},
			async getUserData() {
				// https://api.github.com/users/flingyp
				const res = await this.$request({
					url: '/users/flingyp',
					// url: 'https://api.github.com/users/flingyp',
					isLoading: true,		
				})
				console.log('getUserData->',res)
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
