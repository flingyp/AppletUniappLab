<template>
	<view>
		<view class="item-box right-slide"></view>

		<button type="primary" class="primary-btn" @tap="switchMaskPopup">切换</button>

		<button @tap="show">你敢点我吗</button>

		<test-popup ref="fuck" :title="popuptitle" @confirm="onConfirm">
			<block v-for="(v,index) in 10" :key="index">
				<view>item {{index}}</view>
			</block>
			<view>
				备注：备注,备注,备注,备注,备注
			</view>
		</test-popup>

		<!-- <view class="mask-popup-box">
			<view class="mask-box" :style="isMakPopup?'opacity: 0.5; z-index:10;':'opacity: 0; z-index: -1;'"></view>
			<view class="popup-box" :style="isMakPopup?'transform:translateY(0%);':'display:none;'">
				<button type="primary" @click="isMakPopup=false">关闭</button>
			</view>
		</view> -->
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
				isMakPopup: false,
				popuptitle: '',
			}
		},
		methods: {
			switchMaskPopup() {
				this.isMakPopup = !this.isMakPopup
			},
			show() {
				this.popuptitle = "hangj.cnblogs.com"
				this.$refs.fuck.show(true)
			},
			onConfirm(e) {
				console.log('confirmed!')
				this.$refs.fuck.show(false)
			},
		}
	}
</script>

<style lang="scss">
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

	.primary-btn {
		width: 50%;
	}

	.mask-popup-box {
		transition: all 0.5s;

		.mask-box {
			position: fixed;
			top: 0%;
			left: 0%;
			right: 0%;
			bottom: 0%;
			z-index: -1;
			background: rgb(0, 0, 0);
			transition: all 0.6s;
		}

		.popup-box {
			position: absolute;
			width: 100%;
			height: 600rpx;
			background: #FFF;
			z-index: 100;
			transition: all 0.5s;
		}
	}
</style>
