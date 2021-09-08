<template>
	<view class="time-picker-box" v-if="isDisplayPicker">
		<!-- 遮罩层 -->
		<view :class="['mask-box', maskClass]"></view>
		<!-- 选择器内容 -->
		<view :class="['picker-box_tb', pickerClass]" :style="{height: height+'rpx'}" v-if="type==='bottom'">
			<view @click="close">关闭</view>
			<slot></slot>		
		</view>
		
		<view :class="['picker-box_tb', pickerClass]" :style="{height: height+'rpx'}" v-if="type==='top'">
			<view @click="close">关闭</view>
			<slot></slot>		
		</view>
		
		<view :class="['picker-box_lr', pickerClass]" :style="{width: width+'%'}" v-if="type==='left'">
			<view @click="close">关闭</view>
			<slot></slot>		
		</view>
		
		<view :class="['picker-box_lr', pickerClass]" :style="{width: width+'%'}" v-if="type==='right'">
			<view @click="close">关闭</view>
			<slot></slot>		
		</view>
		
		<view :class="['picker-box_center', pickerClass]" :style="{width: width+'%', height: height+'rpx'}" v-if="type==='center'">
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
			},
			width: {
				type: Number || String,
				default: 40
			},
			type: {
				type: String,
				default: 'bottom'
			}
		},
		data() {
			return {
				isDisplayPicker: false,
				maskClass: 'mask-box-disable',
				pickerClass: ''
			}
		},
		created() {
			if(this.type==='bottom') {
				this.pickerClass = 'picker-box-bottom-disable'
			} else if(this.type==='top') {
				this.pickerClass = 'picker-box-top-disable'
			} else if(this.type==='left') {
				this.pickerClass = 'picker-box-left-disable'
			} else if(this.type==='right') {
				this.pickerClass = 'picker-box-right-disable'
			} else if(this.type==='center') {
				this.pickerClass = 'picker-box-center-disable'
			} 
		},
		methods: {
			open() {
				this.isDisplayPicker = true
				if(this.type==='bottom') {
					this.$nextTick(() => {
						setTimeout(() => {
							this.maskClass = 'mask-box-display'
							this.pickerClass = 'picker-box-bottom-display'
						}, 30)
					})
				} else if(this.type==='top') {
					this.$nextTick(() => {
						setTimeout(() => {
							this.maskClass = 'mask-box-display'
							this.pickerClass = 'picker-box-top-display'
						}, 30)
					})
				} else if(this.type==='left') {
					this.$nextTick(() => {
						setTimeout(() => {
							this.maskClass = 'mask-box-display'
							this.pickerClass = 'picker-box-left-display'
						}, 30)
					})
				} else if(this.type==='right') {
					this.$nextTick(() => {
						setTimeout(() => {
							this.maskClass = 'mask-box-display'
							this.pickerClass = 'picker-box-right-display'
						}, 30)
					})
				} else if(this.type==='center') {
					this.$nextTick(() => {
						setTimeout(() => {
							this.maskClass = 'mask-box-display'
							this.pickerClass = 'picker-box-center-display'
						}, 30)
					})
				} 
				
			},
			close() {
				this.maskClass = 'mask-box-disable'
				if(this.type==='bottom') {
					this.pickerClass = 'picker-box-bottom-disable'
					this.$nextTick(() => {
						setTimeout(() => {
							this.isDisplayPicker = false
						}, 300)
					})
				} else if(this.type==='top') {
					this.pickerClass = 'picker-box-top-disable'
					this.$nextTick(() => {
						setTimeout(() => {
							this.isDisplayPicker = false
						}, 300)
					})
				} else if(this.type==='left') {
					this.pickerClass = 'picker-box-left-disable'
					this.$nextTick(() => {
						setTimeout(() => {
							this.isDisplayPicker = false
						}, 300)
					})
				} else if(this.type==='right') {
					this.pickerClass = 'picker-box-right-disable'
					this.$nextTick(() => {
						setTimeout(() => {
							this.isDisplayPicker = false
						}, 300)
					})
				} else if(this.type==='center') {
					this.pickerClass = 'picker-box-center-disable'
					this.$nextTick(() => {
						setTimeout(() => {
							this.isDisplayPicker = false
						}, 300)
					})
				}
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
		// 弹出层  top 和 bottom
		.picker-box_tb {
			box-sizing: border-box;
			width: 100%;
			background: #FFFFFF;
			position: absolute;
			padding: 40rpx 40rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
		
		// 弹出层 left 和 right
		.picker-box_lr {
			box-sizing: border-box;
			height: 100%;
			background: #FFFFFF;
			position: absolute;
			padding: 40rpx 40rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
		
		// 弹出层 center 
		.picker-box_center {
			box-sizing: border-box;
			width: 100%;
			background: #FFFFFF;
			position: absolute;
			padding: 40rpx 40rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			border-radius: 40rpx;
		}
		
		// 弹出层  bottom   start
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
			border-top-left-radius: 30rpx;
			border-top-right-radius: 30rpx;
		}
		//  end
		
		// 弹出层  top   start
		.picker-box-top-disable {
			top: 0;
			opacity: 0;
			transform: translateY(-100%);
			transition: all 0.2s linear;
		}
		
		.picker-box-top-display {
			top: 0;
			opacity: 1;
			transform: translateY(0%);
			transition: all 0.2s linear;
			// border-bottom-left-radius: 30rpx;
			// border-bottom-right-radius: 30rpx;
		}
		// end
		
		// 弹出层 left start
		.picker-box-left-disable {
			top: 0;
			opacity: 0;
			transform: translateX(-100%);
			transition: all 0.3s linear;
		}
		.picker-box-left-display {
			top: 0;
			opacity: 1;
			transform: translateX(0%);
			transition: all 0.3s linear;
		}
		// end
		
		// 弹出层 right start
		.picker-box-right-disable {
			top: 0;
			right: 0;
			opacity: 0;
			transform: translateX(100%);
			transition: all 0.3s linear;
		}
		.picker-box-right-display {
			top: 0;
			right: 0;
			opacity: 1;
			transform: translateX(0%);
			transition: all 0.3s linear;
		}
		// end
		
		// 弹出层 center start
		.picker-box-center-disable {
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			opacity: 0;
			transition: all 0.3s linear;
		}
		
		.picker-box-center-display {
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			opacity: 1;
			transition: all 0.3s linear;
		} 
		// end
	}
	
</style>