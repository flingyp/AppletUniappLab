<template>
	<view class="time-picker-box" v-if="isDisplayPicker">
		<!-- 遮罩层 -->
		<view :class="['mask-box', maskClass]"></view>
		<!-- 选择器内容 -->
		<view :class="['picker-box', pickerClass]" :style="{height: height+'rpx'}">
			<view class="picker-header-box">
				<!-- 左侧关闭按钮 -->
				<view class="left-close-btn" v-if="isDisplayCloseBtn==='left'" @tap="close">
					<u-icon name="close" size="38"></u-icon>
				</view>
				<view class="picker-title">{{title}}</view>
				<!-- 右侧关闭按钮 -->
				<view class="right-close-btn" v-if="isDisplayCloseBtn==='right'" @tap="close">
					<u-icon name="close" size="38"></u-icon>
				</view>
			</view>
			<picker-view class="picker-select-box" :value="currentColumnIndex" :indicator-style="indicatorStyle" @change="oneColumnChange">
				<picker-view-column>
					<view v-for="(item, index) in province" :key="index" class="one-column-item">{{item}}</view>
				</picker-view-column>
				<picker-view-column>
					<view v-for="(item, index) in city" :key="index" class="one-column-item">{{item}}</view>
				</picker-view-column>
				<picker-view-column>
					<view v-for="(item, index) in area" :key="index" class="one-column-item">{{item}}</view>
				</picker-view-column>
			</picker-view>
			<view class="picker-bottom-box">
				<view class="confirm-btn" @click="confirm">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	import addressData from '@/utils/area.js';
	export default {
		name: 'TimePickerCom',
		props: {
			title: {
				type: String,
				default: ''
			},
			isDisplayCloseBtn: { // left 默认显示头部左侧关闭按钮  right显示右侧
				type: String,
				default: 'left'
			},
			columnArr: {
				type: Array,
				default: () => {
					return []
				}
			},
			height: {
				type: Number || String,
				default: 600
			},
			defaultAddress: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				isDisplayPicker: false,
				maskClass: 'mask-box-disable',
				pickerClass: 'picker-box-bottom-disable',
				currentColumnIndex: [0,0,0],
				indicatorStyle: `height: 60px`,
				province: addressData.map(it => it.label),  // 省 
				city: addressData[0].children.map(it => it.label),  // 市
				area: addressData[0].children[0].children.map(it => it.label), // 区
			}
		},
		created() {
			// console.log('地区数据:',addressData)
			this.onAttached()
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
			},
			confirm() {				
				const value = this.getAddress(...this.currentColumnIndex)
				const code = this.getCode(...this.currentColumnIndex)	
				const currentOneColumnItem = {
					value,
					code,
					data:{
						[code[0]]:value[0],
						[code[1]]:value[1],
						[code[2]]:value[2],
					}
				}
				this.$emit('currentChange', currentOneColumnItem)
				this.close()
			},
			oneColumnChange(e) {
				const currentColumnIndex = e.detail.value
				if (this.currentColumnIndex[0] != currentColumnIndex[0]) {
					// 省份变了
					const index = currentColumnIndex[0]
					this.city = addressData[index].children.map(it => it.label);
					this.area = addressData[index].children[0].children.map(it => it.label);
					this.currentColumnIndex = [index, 0, 0];
				} else if (this.currentColumnIndex[1] != currentColumnIndex[1]) {
					// 城市变了
					const index = currentColumnIndex[1]
					const currentProvince = this.currentColumnIndex[0];
					this.area = addressData[currentProvince].children[index].children.map(it => it.label);
					this.currentColumnIndex = [currentProvince, index, 0];
				} else {
					// 地区变了
					const index = currentColumnIndex[2]
					this.currentColumnIndex[2] = index;
				}
			},
			onAttached() {
				const address = this.defaultAddress;
				if (address[0]) {
					// 如果有初始值，则需要初始地址
					const filter = (index) => (index > -1 ? index : 0);
					const currentProvince = filter(addressData.findIndex(it => it.label === address[0]));
					const currentCity = filter(addressData[currentProvince].children.findIndex(it => it.label === address[
						1]));
					const currentArea = filter(addressData[currentProvince].children[currentCity].children.findIndex(it =>
						it.label === address[2]));
					const city = addressData[currentProvince].children;
					const area = addressData[currentProvince].children[currentCity].children;
					this.currentColumnIndex = [currentProvince, currentCity, currentArea];
					this.city = city.map(it => it.label);
					this.area = area.map(it => it.label);
				}
			},
			getAddress(p, c, a) {
				const {
					province,
					city = [],
					area = []
				} = this;
				return [province[p], city[c] || '', area[a] || ''];
			},
			getCode(p, c, a) {
				let province=addressData.map(it => it.value),city=addressData[p].children.map(it => it.value),area=addressData[p].children[c].children.map(it => it.value)
				return [province[p], city[c] || 0, area[a] || 0];
			},
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
	
	.picker-header-box {
		position: relative;
		width: 100%;
		min-height: 50rpx;
		line-height: 50rpx;
		
		.left-close-btn {
			position: absolute;
			min-width: 40rpx;
			left: 0;
		}
		.right-close-btn {
			position: absolute;
			min-width: 40rpx;
			right: 0;
		}
		.picker-title {
			position: absolute;
			font-size: 34rpx;
			font-weight: bold;
			left:50%;
			transform: translateX(-50%);
		}
	}
	
	.picker-bottom-box {
		display: flex;
		align-items: center;
		justify-content: center;
			
		.confirm-btn {
			width: 260rpx;
			min-height: 80rpx;
			background: linear-gradient(to right, #54FF9F,#4EEE94);
			border-radius: 10rpx;
			border: 0;
			color: #FFF;
			letter-spacing: 2rpx;
			font-size: 30rpx;
			font-weight: bold;
			text-align: center;
			line-height: 80rpx;
		}
	}

	.picker-select-box {
		flex: 1;
		
		.one-column-item {
			text-align: center;
			line-height: 60px;
		}
	}
</style>