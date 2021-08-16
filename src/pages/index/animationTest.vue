<template>
	<view>
		<view class="item-box right-slide"></view>
		
		<button type="primary" class="primary-btn" @tap="switchMaskPopup">切换</button>
		
		<view class="mask-popup-box">
			<view class="mask-box" v-show="isMakPopup"></view>
			<view class="popup-box" v-show="isMakPopup"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'animationTest',
		data() {
			return {
				isMakPopup: false
			}
		},
		methods: {
			switchMaskPopup() {
				this.isMakPopup = !this.isMakPopup
			}
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
	
	@keyframes rightSlide{
		0%{
			transform: translate(0,0);
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
		.mask-box {
			position: fixed;
			top: 0%;
			left: 0%;
			right: 0%;
			bottom: 0%;
			z-index: 10;
			background: rgb(0,0,0);
			opacity: .5;
			transition:opacity .5s;
		}
		
		.popup-box {
			position: absolute;
			width: 100%;
			height: 500rpx;
			background:#FFF;
			z-index: 100;
			bottom: 0%;
			transition:all .5s;
		}
	}
</style>
