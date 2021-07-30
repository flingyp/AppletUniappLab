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
		animation: rightSlide 2s ease forwards;
		position: absolute;
	}
	
	@keyframes rightSlide{
		0%{
			transform: translateX(0);
		}
		100%{
			transform: translateX(300rpx);
		}
	}
</style>
