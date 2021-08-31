<template>
	<view class="time-picker-box" v-if="isDisplayPicker">
		<!-- 遮罩层 -->
		<view :class="['mask-box', maskClass]"></view>
		<!-- 选择器内容 -->
		<view :class="['picker-box', pickerClass]" :style="{height: height+'rpx'}">
			<view @click="close">关闭</view>
			<slot></slot>		
		</view>
	</view>
</template>

<script>
	export default {
		name: 'TimePickerCom',
		props: {
			height: {
				type: Number || String,
				default: 600
			}
		},
		data() {
			return {
				isDisplayPicker: false,
				maskClass: 'mask-box-disable',
				pickerClass: 'picker-box-bottom-disable'
			}
		},
		methods: {
			open() {
				this.isDisplayPicker = true
				this.$nextTick(() => {
					setTimeout(() => {
						this.maskClass = 'mask-box-display'
						this.pickerClass = 'picker-box-bottom-display'
					}, 30)
				})
			},
			close() {
				this.pickerClass = 'picker-box-bottom-disable'
				this.maskClass = 'mask-box-disable'
				this.$nextTick(() => {
					setTimeout(() => {
						this.isDisplayPicker = false
					}, 300)
				})
			}
		}
	}
</script>


<style lang="scss" scoped>
	.time-picker-box {
		// 遮罩层
		.mask-box {
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background: rgba(0, 0, 0, .5);
		}
		.mask-box-disable {
			opacity: 0;
			transition: all 0.2s linear;
		}	
		.mask-box-display {
			opacity: 1;
			transition: all 0.2s linear;
		}
		// 弹出层
		.picker-box {
			box-sizing: border-box;
			width: 100%;
			min-height: 600rpx;
			background: #FFFFFF;
			position: absolute;
			border-top-left-radius: 30rpx;
			border-top-right-radius: 30rpx;
			padding: 60rpx 40rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
		.picker-box-bottom-disable {
			bottom: 0;
			opacity: 0;
			transform: translateY(100%);
			transition: all 0.2s linear;
		}

		.picker-box-bottom-display {
			bottom: 0;
			opacity: 1;
			transform: translateY(0%);
			transition: all 0.2s linear;
		}
	}
	
</style>