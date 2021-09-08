<template>
	<view>
		<view class="item-box right-slide"></view>
		
		<!-- 弹出组件测试 -->
		<button type="primary" @tap="openPopup('bottom')">测试弹窗bottom</button>
		<button type="primary" @tap="openPopup('top')">测试弹窗top</button>
		<button type="primary" @tap="openPopup('left')">测试弹窗left</button>
		<button type="primary" @tap="openPopup('right')">测试弹窗right</button>
		<button type="primary" @tap="openPopup('center')">测试弹窗center</button>
		<test-popup ref="testPopup_bottom" type="bottom"></test-popup>
		<test-popup ref="testPopup_top" type="top" :height="200"></test-popup>
		<test-popup ref="testPopup_left" type="left" :width="100"></test-popup>
		<test-popup ref="testPopup_right" type="right" :width="80"></test-popup>
		<test-popup ref="testPopup_center" type="center" :width="80" :height="800"></test-popup>
	</view>
</template>

<script>
	import testPopup from '@/components/test-popup/test-popup.vue'
	export default {
		name: 'animationTest',
		components: {
			testPopup
		},
		data() {
			return {
			}
		},
		methods: {
			openPopup(type) {
				if(type==='bottom') {
					this.$refs.testPopup_bottom.open()
				} else if(type==='top') {
					this.$refs.testPopup_top.open()
				} else if(type==='left') {
					this.$refs.testPopup_left.open()
				} else if(type==='right') {
					this.$refs.testPopup_right.open()
				} else if(type==='center') {
					this.$refs.testPopup_center.open()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	button {
		width: 50%;
		margin-bottom: 20rpx;
	}
	
	.item-box {
		width: 100rpx;
		height: 100rpx;
		background: #007aff;
		border-radius: 50%;
		animation: rightSlide 2s linear forwards infinite alternate;
		position: absolute;
		z-index: 1;
	}

	@keyframes rightSlide {
		0% {
			transform: translate(0, 0);
		}

		50% {
			transform: translate(300rpx, 300rpx);
		}

		100% {
			transform: translate(600rpx, 0rpx);
		}
	}
</style>
