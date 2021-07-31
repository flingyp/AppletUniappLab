<template>
	<view>
		<view class="item-box right-slide"></view>
	</view>
</template>

<script>
</script>

<style>
	.item-box {
		width: 100rpx;
		height: 100rpx;
		background: #007aff;
		border-radius: 50%;
		animation: rightSlide 2s linear forwards infinite alternate;
		position: absolute;
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
</style>
